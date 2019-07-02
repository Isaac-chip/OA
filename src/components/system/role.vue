<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>角色管理</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
            <Row class="split-view">
                <Col span="8" class="split-pane-left">
                    <Button size="small" @click="showRoleModal">新增角色</Button>
                    <Table border ref="selection" :columns="roleCloumns" :data="roleDatas" :min-height="200" style="margin-top:10px;">
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">修改</Button>
                            <Button type="error" size="small" @click="remove(index)">删除</Button>
                        </template>
                    </Table>
                    <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" class="pageView"></Page>
                </Col>
                <Col span="14" class="split-pane-right"> 
                    <Tabs value="name1">
                        <TabPane label="关联用户" icon="ios-people" name="name1">
                            <AutoComplete
                                icon="ios-search"
                                placeholder="输入用户名称查找"
                                style="width:300px">
                            </AutoComplete>
                             <Button >添加用户</Button>
                             <Table border ref="selection" :columns="userCloumns" :data="userDatas" :min-height="200" style="margin-top:10px;">
                                <template slot-scope="{ row, index }" slot="action">
                                    <Button type="error" size="small" @click="remove(index)">移除</Button>
                                </template>
                            </Table>
                        </TabPane>
                        <TabPane label="关联资源" icon="ios-menu" name="name2">关联资源</TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>

        <Modal v-model="roleModal" title="新增角色" :footer-hide="true" :mask-closable="false" style="width:500px">
            <Form ref="roleForm" :model="roleForm" :rules="roleRuleValidate" :label-width="80" >
                <Row>
                     <FormItem label="角色名称" prop="roleName">
                        <Input v-model="roleForm.roleName" placeholder="请输入姓名" />
                    </FormItem>
                </Row>
                <Row>
                     <FormItem label="角色描述">
                        <Input v-model="roleForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入描述..." />
                    </FormItem>
                </Row>
                 <Row>
                    <div style="text-align:center">
                        <Button type="primary" @click="addRole('roleForm')">提交</Button>
                        <Button style="margin-left: 8px" @click="hideRoleModel('roleForm')">关闭</Button>
                    </div>
                </Row>
            </Form>
        </Modal>
    </div>
</template>

<script>

export default{
    name: 'roleView',
    data (){
        return {
             // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            current:1,
            size:15,
             roleModal:false,
             roleForm:{
                roleName:'',
                description:''
             },
             roleRuleValidate:{
                 roleName:[
                     { required: true, message: '角色名称不能为空', trigger: 'blur' }
                 ]
             },
             addUsers:[],
             roleCloumns:[{
                   type: 'index',
                    width: 60,
                    align: 'center'
             },{
                   title: '角色名称',
                    key: 'roleName'
             },{
                title: '操作',
                slot: 'action',
                width: 150,
                align: 'center'
            }],
             roleDatas:[{
                roleName:"系统管理员"
             },{
                roleName:"支部管理员"
             }],
            userCloumns:[{
                title: '用户名称',
                key: 'nickName'
            },{
                title: '所属组织',
                key: 'orgName'
            },{
                title: '操作',
                slot: 'action',
                width: 100,
                align: 'center'
            }],
            userDatas:[{
                nickName:"张三",
                orgName:'xxx/xxx/xxx/xxx'
            }]

        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadRoles();
        },
        changepage:function(value){
            this.current = value;
            this.loadRoles();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadRoles();
        },
        loadRoles:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/role/list',
                method:'GET',
                dataType:'json',
                params:{
                    current:self.current,
                    size:self.pageSize,
                    tenantId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data);
                    self.roleDatas = data.data.records;
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
        addRole:function(name){
            var self = this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    self.$http({
                        url:self.$constants.BIURL+'/role',
                        method:'POST',
                        dataType:'json',
                        data:self.roleForm
                    })
                    .then(function (response) {
                        if(response.status ==200){
                            var data = response.data;
                            if(data.code == 1){
                                self.$Message.error({
                                    content: data.data,
                                    duration: 2
                                }); 
                            }else{
                                self.current = 1;
                                self.roleModal = false;
                                self.$refs['roleForm'].resetFields();
                                self.loadRoles();
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
        showRoleModal:function(){
            this.roleModal = true;
        },
        hideRoleModel:function(name){
            this.roleModal = false;
            this.$refs[name].resetFields();
        }
    },
    mounted:function(){
        this.loadRoles();
    }
}
</script>

<style>
.split-view{
    height: 100%;
    position: relative;
}
.split-pane-left{
    width: 380px;
    height: 100%;
    margin: 0 auto;
    padding-right: 20px;
    border-right: 1px solid #f2f2f2;
}
.split-pane-right{
    height: 100%;
    padding-left: 40px;
}
.pageView{
    margin-top: 10px;
}
</style>
