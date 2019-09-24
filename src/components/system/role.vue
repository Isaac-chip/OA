<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>角色管理</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
            <Row class="split-view">
                <Col span="8" class="split-pane-left">
                    <Button size="small" @click="showRoleModal">新增角色</Button>
                    <Table border ref="selection" :columns="roleCloumns" :data="roleDatas" :min-height="200" @on-row-click="roleRowClick" style="margin-top:10px;">
                        <template slot-scope="{ row, index }" slot="action">
                            <Button  size="small" style="margin-right: 5px" @click="update(index)">修改</Button>
                            <Button  size="small" @click="deleteDept(index)">删除</Button>
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
                             <Page :total="userDataCount" :page-size="pageSize" show-total @on-change="changeUserpage" class="pageView"></Page>
                        </TabPane>
                        <TabPane label="关联资源" icon="ios-menu" name="name2">
                            <zk-table
                            ref="table"
                            sum-text="sum"
                            index-text="序号"
                            :data="meunDatas"
                            :columns="columns"
                            :stripe="props.stripe"
                            :border="props.border"
                            :show-header="props.showHeader"
                            :show-summary="props.showSummary"
                            :show-row-hover="props.showRowHover"
                            :show-index="props.showIndex"
                            :tree-type="props.treeType"
                            :is-fold="props.isFold"
                            :expand-type="props.expandType"
                             @checkbox-click="resourceMenuClick"
                            :selection-type="props.selectionType">
                            <template slot="menuType" slot-scope="scope">
                                <span v-if="scope.row.menuType == 1">PC端菜单</span>
                                <span v-if="scope.row.menuType == 2">手机端菜单</span>
                            </template>
                            </zk-table>
                        </TabPane>
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
            userDataCount:1,
            roleId:-1,
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
             leftShow:true,
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
            roleDatas:[],
            userCloumns:[{
                title: '名称',
                key: 'name',
                width:'200px'
            },{
                title: '所属组织',
                key: 'deptName'
            }],
            userDatas:[],
            props: {
          stripe: false,
          border: true,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: true
        },
        meunDatas: [],
        columns: [
          {
            label: '菜单名称',
            prop: 'menuName',
            width: '200px',
          },
          {
            label: '菜单路径',
            prop: 'menuUrl',
            minWidth: '50px',
          },
          {
            label: '菜单类型',
            prop: 'menuType',
            type: 'template',
            template: 'menuType',
          },
          {
            label: '菜单描述',
            prop: 'memo',
          }
        ]

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
        changeUserpage:function(value){
            this.currentUser = value;
            this.loadRoleUser();
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
        roleRowClick:function(row){
            this.roleId = row.rid;
            this.loadRoleUser();
            this.loadMenus();
        },
        resourceMenuClick:function(index,rows){
            var self = this;
            var mids = [];
            rows.map(item=>{
                if(item._isChecked){
                    mids.push(item.mid);
                }
            });
            self.batchSave(self.roleId,mids.join(','));
        },
        batchSave:function(roleId,mIds){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/biRoleMenu/saveBatch',
                method:'GET',
                dataType:'json',
                params:{
                    roleId:self.roleId,
                    mIds:mIds
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    if(data.code == 1){
                        self.$Message.error({
                            content: data.data,
                            duration: 2
                        }); 
                    }
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        loadRoleUser:function(roleId){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/user/byRoleIdList',
                method:'GET',
                dataType:'json',
                params:{
                    current:self.current,
                    size:self.pageSize,
                    querys:'',
                    roleId: self.roleId 
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data);
                    self.userDatas = data.data.records;
                    self.userDataCount = data.data.total;
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        loadMenus:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/menu/byRoleMenuList',
                method:'GET',
                dataType:'json',
                params:{
                    roleId:self.roleId,
                    menuName:self.queryStr,
                    tenantId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data);
                    self.meunDatas = data.data;

                    
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
        deleteDept:function(index){
            var self = this;
            const data = this.roleDatas[index];

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
                url:self.$constants.BIURL+'/role/'+data.rid,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadRoles();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
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
