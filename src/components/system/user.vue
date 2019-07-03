<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
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
                    <Button  size="small" style="margin-right: 5px" @click="amObject(index)">重置密码</Button>
                    <Button  size="small" style="margin-right: 5px" @click="amObject(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="amObject(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal v-model="userModal" title="新增用户" :footer-hide="true" :mask-closable="false" style="width:600px">
            <Form ref="userForm" :model="userForm" :rules="userRuleValidate" :label-width="80" >
                <Row>
                    <Col span="12">
                        <FormItem label="用户名" prop="username">
                            <Input v-model="userForm.username" placeholder="请输入用户名" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="真实姓名" prop="name">
                            <Input v-model="userForm.name" placeholder="请输入姓名" />
                        </FormItem>
                    </Col>
                </Row>
                
                <Row>
                    <FormItem label="所属组织" prop="deptName">
                            <treeselect 
                                    :options="departments"
                                    :max-height="200"
                                    @select="orgSelect"
                                    noResultsText="没有找到匹配结果"
                                    placeholder="请选择所属组织..." />
                        </FormItem>
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
                                <Option value='0'>党委用户</Option>
                                <Option value='1'>支部用户</Option>
                                <Option value='2'>普通用户</Option>
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
                width: 60,
                align: 'center'
            },{
                title: '用户名',
                key: 'username'
            },{
                title: '姓名',
                key: 'name'
            },{
                 title: '所属部门',
                key: 'name'
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
                userType:'',
                deptId:-1,
                deptName:null,
                phone:'',
                email:'',
                disabled:false,
                tenantId:''

            },
            userRuleValidate:{
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true,  message: '用户姓名不能为空', trigger: 'blur' }
                ],
                userType: [
                    { required: true,type: 'string', message: '用户类型不能为空', trigger: 'change' }
                ],
                email: [
                    { required: true,  message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '错误的邮箱格式', trigger: 'blur' }
                ],
                phone : [
                    { required: true,  message: '电话不能为空', trigger: 'blur' }
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
                    self.$http({
                        url:self.$constants.BIURL+'/user',
                        method:'POST',
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
