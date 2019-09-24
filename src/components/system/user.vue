<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>用户管理</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
             <Row class="header">
                <Col  span="2"><Button @click="showUserModal">新增</Button></Col>
                <Col  span="7">
                    <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
                </Col>
            </Row>
            <Table border ref="selection" :columns="usersCloumns" :data="usersDatas" :min-height="200">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="resetPwd(index)">重置密码</Button>
                    <Button  size="small" style="margin-right: 5px" @click="updateUser(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deleteUser(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal v-model="userModal" title="新增\修改用户" :footer-hide="true" :mask-closable="false" class="userFrom">
                <Form ref="userForm" :model="userForm" :rules="userRuleValidate" :label-width="80"  >
                    <Row>
                        <Col span="12">
                            <FormItem label="用户名" prop="username">
                                <Input :disabled="isUpdate" v-model="userForm.username" placeholder="请输入用户名" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="真实姓名" prop="name">
                                <Input v-model="userForm.name" placeholder="请输入姓名" />
                            </FormItem>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span="12">
                            <FormItem label="所属组织" prop="deptName">
                                <treeselect 
                                        v-model="userForm.deptId"
                                        :options="departments"
                                        :max-height="200"
                                        @select="orgSelect"
                                        noResultsText="没有找到匹配结果"
                                        placeholder="请选择所属组织..." />
                            </FormItem>
                        </Col>
                    <Col span="12">
                         <FormItem label="账号角色" prop="roleId">
                            <Select  v-model="userForm.roleId">
                                <Option v-for="item in roleDatas" :key="item.rid" :value="item.rid">{{item.roleName}}</option>
                            </Select >
                        </FormItem>
                    </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="电话" prop="phone">
                                <Input v-model="userForm.phone" placeholder="请输入电话" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="邮箱" prop="email">
                                <Input v-model="userForm.email" placeholder="请输入邮箱" />
                            </FormItem>
                        </Col>
                    </Row>
                <Row>
                    <Col span="12">
                            <FormItem label="用户类型" prop="userType">
                                <Select v-model="userForm.userType">
                                    <Option value="0">党委用户</Option>
                                    <Option value="1">支部用户</Option>
                                    <Option value="2">普通用户</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="是否锁定">
                                <i-switch v-model="userForm.disabled" size="large">
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </FormItem>
                        </Col>
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
        margin-bottom: 15px;
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
                 title: '所属部门',
                key: 'deptName'
            },{
                 title: '电话',
                key: 'phone'
            },{
                 title: '邮箱',
                key: 'email'
            },{
                title: '操作',
                slot: 'action',
                width: 210,
                align: 'center'
            }],
            usersDatas:[],
            departments:[],
            userForm:{
                username:'',
                name:'',
                userType:0,
                deptId:null,
                deptName:null,
                phone:'',
                email:'',
                disabled:false,
                tenantId:'',
                roleId:0
            },
            roleDatas:[],
            userRuleValidate:{
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true,  message: '用户姓名不能为空', trigger: 'blur' }
                ],
                userType: [
                    { required: true,message: '用户类型不能为空', trigger: 'change' }
                ],
                email: [
                    { required: true,  message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '错误的邮箱格式', trigger: 'blur' }
                ],
                phone : [
                    { required: true,  message: '电话不能为空', trigger: 'blur' }
                ],
                roleId:[
                    { required: true,type:'number', message: '账号角色不能为空', trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadUser();
        },
        changepage:function(value){
            this.current = value;
            this.loadUser();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadUser();
        },
        loadUser:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/user/list',
                method:'GET',
                dataType:'json',
                params:{
                    current:self.current,
                    size:self.pageSize,
                    querys:self.queryStr,
                    deptId:self.$constants.userInfo.deptId,  
                    tenantId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data);
                    self.usersDatas = data.data.records;
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
        showUserModal:function(){
            this.userModal = true;
            this.isUpdate = false;
            this.loadRoles();
            this.loadDepartment();
        },
        orgSelect:function(node){
            this.userForm.deptId = node.did;
            this.userForm.deptName = node.title;
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
                    if(self.isUpdate){
                        console.log('加载部门信息.....');
                        self.userForm.deptId =  self.userForm.deptId;
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
        /**添加用户 */
        addUser:function(name){
            var self = this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    console.log(this.userForm.deptName);
                    if(self.userForm.deptName == '' || self.userForm.deptName ==null) {
                         this.$Message.error('请选择所属组织!');
                         return;
                    }
                    self.userForm.tenantId = self.$constants.userInfo.tenantId;
                    var url = self.$constants.BIURL+'/user';
                    var method = 'POST';
                    if(self.isUpdate){
                        url = self.$constants.BIURL+'/user';
                        method='PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.userForm
                    })
                    .then(function (response) {
                        if(response.status ==200){
                            var data = response.data;
                            self.userForm.deptId = -1;
                            self.userForm.deptName ='';
                            if(data.code == 1){
                                self.$Message.error({
                                    content: data.data,
                                    duration: 2
                                }); 
                            }else{
                                self.current = 1;
                                self.userModal = false;
                                self.$refs['userForm'].resetFields();
                                self.loadUser();
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
                }else{
                    this.$Message.error('表单校验失败，请输入必填项!');
                }
                
            });
        },
        /**修改用户 */
        updateUser:function(index){
            this.isUpdate = true;
            this.loadRoles();
            this.loadDepartment();
            this.userForm = Object.assign({}, this.usersDatas[index]);
            this.userForm.userType = this.userForm.userType+'';
            console.log(this.userForm);
            this.userModal = true;
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
                url:self.$constants.BIURL+'/user/'+data.userId,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadUser();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        /**重置密码 */
        resetPwd:function(index){
            var self = this;
            const data = this.usersDatas[index];

            this.$Modal.confirm({
                title:'系统提示',
                content:'确定要重置改用户的密码吗?',
                okText:'确定',
                cancelText:'取消',
                onOk:function(){
                    self.handleResetPwd(data);
                }
            });
        },
        handleResetPwd:function(data) {
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/user/resetPwd/'+data.userId,
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
        loadRoles:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/role/list',
                method:'GET',
                dataType:'json',
                params:{
                    current:1,
                    size:999,
                    tenantId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.roleDatas = data.data.records;
                    if(self.isUpdate){
                        self.userForm.roleId = self.userForm.roleId;
                    }
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        hideUserModel:function(name){
            this.$refs[name].resetFields();
            this.userModal = false;
            this.userForm.deptId = -1;
            this.userForm.deptName ='';
        }
    },
    mounted:function(){
        this.loadUser();
    }
}
</script>
