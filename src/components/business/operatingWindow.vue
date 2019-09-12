<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem >营商环境</BreadcrumbItem>
            <BreadcrumbItem >窗口管理</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
             <Row class="header">
                <Col  span="2"><Button @click="showWindow">新增</Button></Col>
                <Col  span="7">
                    <Input v-model="params.query" search enter-button @on-search="onSeach" placeholder="输入关键字查找" />
                </Col>
            </Row>
             <Table border ref="selection" :columns="windowCloumns" :data="windowDatas">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="qRCode(index)">窗口二维码</Button>
                    <Button  size="small" style="margin-right: 5px" @click="updateWindow(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deleteWindow(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="params.size" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>

            <Modal  v-model="windowModal" title="考勤规则" :footer-hide="true" :mask-closable="false">
                <Form ref="windowForm" :model="windowForm" :rules="windowFormValidate" :label-width="110" >
                    <FormItem label="办事窗口名称" prop="winName">
                        <Input placeholder="请输入办事窗口名称" v-model="windowForm.winName"/>
                    </FormItem>
                    <FormItem label="窗口办事员" prop="operatingUser">
                        <Select
                            v-model="windowForm.operatingUser"
                            filterable
                            remote
                            :remote-method="findUserByUserName"
                            placeholder="窗口办事员"
                            :loading="userloading">
                            <Option v-for="(item,index) in userList" :value="item.userId" :key="index">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注" prop="memo">
                         <Input v-model="windowForm.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入备注..." />
                    </FormItem>
                     <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="addOperatingWindow('windowForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideWindowModel('windowForm')">关闭</Button>
                        </div>
                    </Row>
                </Form>
            </Modal>
        
            <Modal  v-model="qrCodeModal" title="窗口二维码" :footer-hide="true" :mask-closable="false" width="600px">
                <div style="text-align:center">
                    <img :src="qrCodePath" width="300" height="300"/>
                </div>
            </Modal>
        </div>
    </div>
</template>
<style>
.header{
    margin-bottom: 15px;
    }
.pageView{
    text-align: right;
    margin-top: 10px;
}
</style>

<script> 
export default {
    data () {
        return {
            dataCount:0,
            // 每页显示多少条
            pageSize:15,
            windowModal:false,
            fileServer:null,
            isUpdate:false,
            userloading:false,
            uploadHeaders:{},
            qrCodePath:'',
            qrCodeModal:false,
            params:{
                size:15,
                current:1,
                query:''
            },
            userList:[],
            windowForm:{
                winName:'',
                operatingUser:'',
                memo:'',
                tenantId:''
            },
            arrIds:[],
            departmentId:null,
            windowFormValidate:{
                winName:[
                   { required: true, message: '办事窗口名称不能为空', trigger: 'change' }
                ]
            },
            windowCloumns:[
                {
                    type: 'index',
                    width: 70,
                    title:'序号',
                    align: 'center'
                },{
                    title: '窗口名称',
                    key: 'winName',
                    width:'220'
                },{
                    title: '窗口办事员',
                    key: 'operatingUserName'
                },{
                    title: '创建时间',
                    key: 'createDate'
                },{
                    title: '备注',
                    key: 'memo'
                },{
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            windowDatas:[]
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadOperatingWindow();
        },
        changepage:function(value){
            this.params.current = value;
            this.loadOperatingWindow();
        },
        onChangePageSize:function(value){
            this.params.size = value;
            this.loadOperatingWindow();
        },
        orgSelect:function(node){
            this.arrIds.push(node.id);
            if(node.children){
                this.recursiveSubset(node.children,this.arrIds);
            }
            this.rulsForm.departments = this.arrIds.join(',');
           // this.rulsForm.departmentId = node.did;
        },
        showWindow:function(){
            this.windowModal = true;
            this.isUpdate = false;
        },
        addOperatingWindow:function(name){
            var self = this;
            self.$refs[name].validate((valid) => {
                if(valid){
                    if(self.windowForm.operatingUser == null || self.windowForm.operatingUser == ''){
                        this.$Message.error('请选择窗口办事员!');
                        return;
                    }
                
                    self.windowForm.tenantId = self.$constants.userInfo.tenantId;
                    var url = self.$constants.BIURL+'/operating/window';
                    var method = 'POST';
                    if(self.isUpdate){
                        method = 'PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.windowForm
                    })
                    .then(function (response) {
                        if(response.status ==200){
                            var data = response.data
                            if(data.code == 1){
                                self.$Message.error({
                                    content: data.data,
                                    duration: 2
                                }); 
                            }else{
                                self.current = 1;
                                self.$refs[name].resetFields();
                                self.windowModal = false;
                                self.loadOperatingWindow();
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
                    });
                }else{  
                    this.$Message.error('表单校验失败，请输入必填项!');
                }
            });
        },
        hideWindowModel:function(name){
            this.$refs[name].resetFields();
            this.windowModal = false;
        },
        loadOperatingWindow:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/operating/window/list',
                method:'GET',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.windowDatas = data.data.records;
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
        findUserByUserName:function(userQuery){
            var self = this;
            self.userloading = true;
            self.$http({
                url:self.$constants.BIURL+'/user/findUserByUserName',
                method:'GET',
                params:{
                    current:1,
                    size:15,
                    query:userQuery
                }
            })
            .then(function (response) {
                self.userloading =false;
                if(response.status ==200){
                    var data = response.data;
                    self.userList = data.data.records;
                }
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        deleteWindow:function(index){
            var self = this;
            const data = this.windowDatas[index];
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
                url:self.$constants.BIURL+'/operating/window/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadOperatingWindow();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        updateWindow:function(index){
            this.isUpdate = true;
            this.windowForm = Object.assign({}, this.windowDatas[index]);
            this.windowModal = true;
        },
        qRCode:function(index){
            var data = this.windowDatas[index];
            this.qrCodePath = data.qrCode;
            this.qrCodeModal = true;
        }
    },
    mounted:function(){
        this.loadOperatingWindow();
    }
}
</script>
