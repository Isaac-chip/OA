<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>村社区管理</BreadcrumbItem>
            <BreadcrumbItem>驻村队员</BreadcrumbItem>
            <BreadcrumbItem>基本信息</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
             <Row class="header">
               <Form :label-width="100">
                   <Col span="8">
                        <FormItem label="所属村社区:">
                            <treeselect
                                    :options="villageDatas"
                                    :max-height="200"
                                    @select="orgSearchSelect"
                                    noResultsText="没有找到匹配结果"
                                    placeholder="请选择村(社区)..." />
                        </FormItem>
                   </Col>
                   <Col span="8">
                        <FormItem label="用户名:">
                        <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
                    </FormItem>
                   </Col>
               </Form>
               <Col  span="24" style="text-align:right">
                <Button @click="showUserModal" icon="md-add">新增</Button>
                <Divider type="vertical"/>
                <Button @click="showUserModal" icon="ios-cloud-download">导入</Button>
                <Divider type="vertical"/>
                <Button @click="showUserModal" icon="ios-cloud-upload">导出</Button>
                </Col>
            </Row>
            <Table ref="selection" :columns="usersCloumns" :data="usersDatas" :min-height="200">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="deleteUser(index)">移除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal v-model="userModal" title="新增" :footer-hide="true" :mask-closable="false" class="userFrom">
                <Form ref="userForm" :model="userForm"  :label-width="80"  >
                    <Row>
                        <Col span="16">
                            <FormItem label="所属组织" prop="deptName">
                                <treeselect 
                                        v-model="userForm.villageId"
                                        :options="villageDatas"
                                        :max-height="200"
                                        @select="orgSelect"
                                        noResultsText="没有找到匹配结果"
                                        placeholder="请选择所属组织..." />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="margin:0px 28px 10px">
                        <div style="margin:10px 0px">添加工作队员</div>
                        <Select
                            v-model="joinPeoples"
                            filterable
                            remote
                            multiple 
                            :remote-method="loadUser"
                             placeholder="请输入用户姓名搜索"
                            :loading="false"
                            style="width:300px">
                            <Option v-for="item in peoples" :value="item.userId" :key="item.userId">{{ item.name }}</Option>
                        </Select>
                    </Row>
                    <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="addUser('userForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideUserModel('userForm')">关闭</Button>
                        </div>
                    </Row>
                </Form>
        </Modal>
    </div>
</template>
<style  scoped>
    .header{
        margin-bottom: 5px;
    }

    .pageView{
        text-align: right;
        margin-top: 10px;
    }

    .userFrom .ivu-modal{
    width: 620px !important;
}
</style>
<script>

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    components: { Treeselect },
    data() {
        return {
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            current:1,
            size:15,
            villageId:null,
            type:1,
            userModal:false,
            isUpdate:false,
            queryStr:'',
            usersCloumns:[{
                type: 'index',
                width: 70,
                title:'序号',
                align: 'center'
            },{
                title: '用户名',
                key: 'username'
            },{
                title: '姓名',
                key: 'name'
            },{
                 title: '所属村社区',
                key: 'villageName'
            },{
                 title: '电话',
                key: 'phone'
            },{
                title: '操作',
                slot: 'action',
                width: 210,
                align: 'center'
            }],
            usersDatas:[],
            villageDatas:[],
            userForm:{
                villageId:null,
                userIds:'',
                type:1
            },
            peoples:[],
            joinPeoples:[]
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadVillagePeople();
        },
        changepage:function(value){
            this.current = value;
            this.loadVillagePeople();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadVillagePeople();
        },
        showUserModal:function(){
            this.userModal = true;
            this.isUpdate = false;
        },
        orgSearchSelect:function(node){
            this.villageId = node.id;
            this.loadVillagePeople();
        },
        orgSelect:function(node){
            this.userFrom.villageId = node.id;
        },
        loadVillage:function(){
            var self = this;
            self.$http({
            url:self.$constants.BIURL+'/political/village/list',
            method:'GET',
            params:{
                queryStr:self.queryStr
            }
            }) .then(function (response) {
                if(response.status ==200){
                var data = response.data;
                console.log(data);
                const arrChange = function(datas){
                        for(var i =0; i<datas.length;i++){
                            var item = datas[i];
                            if(item.children && item.children.length == 0){
                                delete item.children ;
                            }else{
                                if(item.children !=null){
                                    arrChange(item.children);
                                }
                            }
                        }
                    };
                arrChange(data.data);
                self.villageDatas = data.data;
                if(self.isUpdate){
                    self.villageForm.parentId = self.villageForm.parentId;
                }
                }
            }).catch(function (error) {
            self.$Message.error({
                content: error.message,
                duration: 2
            });
            console.log(error);
            });
        },
        loadVillagePeople:function(){
            var self = this;
            self.$http({
            url:self.$constants.BIURL+'/political/village/people/list',
            method:'GET',
            params:{
                current:self.current,
                size:self.pageSize,
                villageId:self.villageId,
                type:self.type,
                query:self.queryStr
            }
            }) .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.usersDatas = data.data.records;
                    self.dataCount = data.data.total;
                }
            }).catch(function (error) {
            self.$Message.error({
                content: error.message,
                duration: 2
            });
            console.log(error);
            });
        },
        loadUser:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/user/list',
                method:'GET',
                dataType:'json',
                params:{
                    current:1,
                    size:20,
                    querys:self.queryStr,
                    tenantId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.peoples = data.data.records
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        /**添加用户 */
        addUser:function(name){
            var self = this;
            if(self.userForm.villageId == '' || self.userForm.villageId ==null) {
                this.$Message.error('请选择所属组织!');
                return;
            }
            if(self.joinPeoples && self.joinPeoples.length >0){
                self.userForm.userIds = self.joinPeoples.join(',');
            }
            var url = self.$constants.BIURL+'/political/village/people/add';
            var method = 'POST';
            self.$http({
                url:url,
                method:method,
                dataType:'json',
                data:self.userForm
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.userForm.villageId = null;
                    self.userForm.userIds = '';
                    if(data.code == 1){
                        self.$Message.error({
                            content: data.data,
                            duration: 2
                        }); 
                    }else{
                        self.current = 1;
                        self.userModal = false;
                        self.$refs['userForm'].resetFields();
                        self.loadVillagePeople();
                        if(self.isUpdate){
                            self.$Message.success({
                                content: '数据修改成功!',
                                duration: 2
                            });
                        }else{
                            self.$Message.success({
                                content: '数据添加成功!',
                                duration: 2
                            });
                        }
                    }
                
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
               
        },
        deleteUser:function(index){
            var self = this;
            const data = this.usersDatas[index];
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
                url:self.$constants.BIURL+'/political/village/people/delete',
                method:'GET',
                params:{
                    villageId:data.villageId,
                    userId:data.userId,
                    type:self.type
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadVillagePeople();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        hideUserModel:function(name){
            this.$refs[name].resetFields();
            this.userModal = false;
            this.userForm.villageId = null;
            this.userForm.userIds ='';
        }
    },
    mounted:function(){
        this.loadVillage();
        this.loadVillagePeople();
    }
}
</script>
