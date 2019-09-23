<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem >党务信息</BreadcrumbItem>
            <BreadcrumbItem to="/system/dept">党员管理</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
            <Row >
                 <Form :label-width="90">
                     <Row>
                          <Col span="8">
                                <FormItem label="所属组织:">
                                    <treeselect
                                            v-model="deptId"
                                            :options="departments"
                                            :max-height="200"
                                            @select="orgSelect"
                                            noResultsText="没有找到匹配结果"
                                            placeholder="请选择组织..." />
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="用户名:">
                                    <Input v-model="params.query" placeholder="输入姓名或者手机号码查找" />
                                </FormItem>
                            </Col>
                            <Col span="8">
                                 <Button style="margin-left:15px" @click="partyUserSearch"  icon="ios-search">搜索</Button>
                            </Col>
                     </Row>
                     <Row style="text-align:right;margin-bottom:10px;">
                        <a href="javascrpit:;;" @click="downLoadTemplate">下载用户导入模板</a>
                        <Divider type="vertical"/>
                        <Button @click="addPartyUser"  icon="ios-cloud-download">新增</Button>
                        <Divider type="vertical"/>
                        <Upload 
                            :action="fileServer"
                            :on-success="handleSuccess"
                            :format="['xlsx','xls','XLSX','XLS']"
                            :on-format-error="formatError"
                            :headers="uploadHeaders"
                            :show-upload-list="false"
                            style="display: inline"
                            >
                            <Button icon="ios-cloud-upload">导入</Button>
                        </Upload>
                        <Divider type="vertical"/>
                        <Button @click="exportPartyUser"  icon="ios-cloud-download">导出</Button>
                     </Row>
                 </Form>
            </Row>
             <Table border ref="selection" :columns="partyUserCloumns" :data="partyUserDatas">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="updatePartyUser(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="resetPwd(index)">重置密码</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deletePartyUser(index)">删除</Button>
                </template>

                <template slot-scope="{row}" slot="politicsTpl">
                    <span v-if="row.politics >=0">{{politicsDatas[row.politics-1]}}</span>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="params.size" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>
    </div>
</template>
<style>
.pageView{
    text-align: right;
    margin-top: 10px;
}
</style>

<script>

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import exportUtils from '@/vendor/export.js'

export default {
    components: { Treeselect },
    data () {
        return {
            dataCount:0,
            // 每页显示多少条
            pageSize:15,
            deptId:null,
            politicsDatas:['中共党员','中共预备党员','入党积极分子'
                            ,'共青团员','民革党员','民盟盟员','民建会员',
                            '民进会员','农工党党员','致公党党员','九三学社社员',
                            '台盟盟员','无党派人士','群众','其他'],
            params:{
                size:15,
                current:1,
                deptCode:'',
                query:''
            },
            uploadHeaders:{},
            fileServer:'',
            partyUserCloumns:[
                {
                    type: 'index',
                    width: 70,
                    title:'序号',
                    align: 'center'
                },{
                    title: '姓名',
                    key: 'userName',
                    width:'120'
                },{
                    title: '手机号码',
                    key: 'mobilePhone',
                    width:'120'
                },{
                    title: '所属组织',
                    key: 'deptName'
                },{
                    title: '政治面貌',
                    key: 'politics',
                    slot: "politicsTpl",
                    width:'220'
                },{
                    title: '性别',
                    key: 'sex',
                    width:'80',
                    render:(h,params) =>{
                        let value = params.row.sex;
                        switch(value){
                            case 0:
                                return h('span','男');
                                break;
                            case 1:
                                return h('span','女');
                                break;
                        }
                    }
                },{
                    title: '操作',
                    slot: 'action',
                    width: 220,
                    align: 'center'
                }
            ],
            partyUserDatas:[],
            departments:[]
        }
    },
    created:function(){
        var access_token = this.$constants.access_token;
        if(access_token == null || access_token ==''){
            var userInfo =window.localStorage.getItem('userInfo');
            if(userInfo !=null && userInfo!=''){
                access_token = JSON.parse(userInfo).access_token;
            }
            this.uploadHeaders = {
                'Authorization': "bearer " + access_token
            };
            console.log(this.uploadHeaders);
        }
        this.fileServer = this.$constants.BIURL +'/political/user/excel/import';
    },
    methods:{
        changepage:function(value){
            this.params.current = value;
            this.loadPartyUsers();
        },
        onChangePageSize:function(value){
            this.params.size = value;
            this.loadPartyUsers();
        },
        orgSelect:function(node){
            this.params.deptCode = node.deptCode;
        },
        addPartyUser:function(){
            this.$router.push({
                'name': 'partyUser',
                'path': '/system/partyUser'
            })
        },
        partyUserSearch:function(){
            if(this.deptId == null || this.deptId ==''){
                this.params.deptCode = '';
            }
            this.loadPartyUsers();
        },
        importPartyUser:function(){

        },
        downLoadTemplate:function(){
            exportUtils.exportExcel(this.$constants.BIURL+'/political/user/excel/template');
        },
        exportPartyUser:function(){
            var params = {
                deptId:this.$constants.userInfo.deptId,
                query:''
            }
            //按部门导出
            exportUtils.exportExcel(this.$constants.BIURL+'/political/user/excel/export',params);
        },
        formatError:function(file, fileList){
            this.$Message.error('上传文件格式错误，请选择Excel文件上传!');
        },
        handleSuccess:function(response, file, fileList){
            var self = this;
            var data = response.data;
            if(data){
                this.loadPartyUsers();
                this.$Message.success('数据导入成功!');
            }
        },
        loadPartyUsers:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/user/list',
                method:'GET',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.partyUserDatas = data.data.records;
                    self.dataCount = data.data.total;
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        updatePartyUser:function(index){
            var uId = this.partyUserDatas[index].uid;
            this.$router.push({
                'name': 'partyUser',
                'path': '/system/partyUser',
                query:{
                    id:uId
                }
            })
        },
        deletePartyUser:function(index){
            var self = this;
            const data = this.partyUserDatas[index];

            this.$Modal.confirm({
                title:'系统提示',
                content:'确定要删除该记录吗?',
                okText:'确定',
                cancelText:'取消',
                onOk:function(){
                    self.handleDelete(data);
                }
            });
        },
        handleDelete:function(data){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/user/'+data.uId,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadPartyUsers();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        resetPwd:function(index){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/user/resetPwd/'+data.userId,
                method:'GET'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '密码重置成功!',
                        duration: 2
                    });
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        loadDepartment:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/department/list',
                method:'GET',
                params:{
                    query:self.deptQueryStr
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    const arrChange = arr => arr.map(item => {
                        const res = {};
                        if(item.children && item.children.length == 0){
                           delete item.children ;
                        }else{
                            arrChange(item.children);
                        }
                    });
                    arrChange(data);
                    self.departments = data;
                }
            }).catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        }
    },
    mounted:function(){
        this.loadDepartment();
        this.loadPartyUsers();
    }
}
</script>
