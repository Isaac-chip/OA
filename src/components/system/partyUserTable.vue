<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
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
                        <Button @click="addPartyUser"  icon="ios-cloud-download">新增</Button>
                        <Divider type="vertical"/>
                        <Button @click="importPartyUser"  icon="ios-cloud-upload">导入</Button>
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

export default {
    components: { Treeselect },
    data () {
        return {
            dataCount:0,
            // 每页显示多少条
            pageSize:15,
            deptId:null,
            params:{
                size:15,
                current:1,
                deptCode:'',
                query:''
            },
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
                    key: 'deptName',
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
        exportPartyUser:function(){

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
            var uId = this.partyUserDatas[index].uId;
            this.$router.push({
                'name': 'partyUser',
                'path': '/system/partyUser',
                query:{
                    uId:uId
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
