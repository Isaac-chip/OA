<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem >营商环境</BreadcrumbItem>
            <BreadcrumbItem >办事事项</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
             <Row class="header">
                 <Form :label-width="100">
                <Col  span="2"><Button @click="showMatter">新增</Button></Col>
                <Col span="7">
                    <FormItem label="所属办事窗口">
                        <Select v-model="params.winId" clearable >
                            <Option v-for="(item,index) in windowDatas" :value="item.id" :key="index">{{ item.winName }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col  span="7">
                    <FormItem label="事项名称">
                        <Input v-model="params.query"  placeholder="输入事项名称" />
                    </FormItem>
                </Col>
                </Form>
                <Col  span="2" style="padding-left:15px;"><Button @click="onSeach" type="primary" icon="ios-search"></Button></Col>
            </Row>
             <Table border ref="selection" :columns="matterCloumns" :data="matterDatas">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="updateMatter(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deleteMatter(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="params.size" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>

            <Modal  v-model="matterModal" title="服务窗口" :footer-hide="true" :mask-closable="false">
                <Form ref="matterForm" :model="matterForm" :rules="matterFormValidate" :label-width="110" >
                    <FormItem label="事项名称" prop="matterName">
                        <Input placeholder="请输入窗口事项名称" v-model="matterForm.matterName"/>
                    </FormItem>
                    <FormItem label="所属办事窗口" prop="winId">
                        <Select v-model="matterForm.winId">
                            <Option v-for="(item,index) in windowDatas" :value="item.id" :key="index">{{ item.winName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注" prop="memo">
                         <Input v-model="matterForm.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入备注..." />
                    </FormItem>
                     <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="addOperatingMatter('matterForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideWindowModel('matterForm')">关闭</Button>
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
            matterModal:false,
            fileServer:null,
            isUpdate:false,
            userloading:false,
            uploadHeaders:{},
            qrCodePath:'',
            qrCodeModal:false,
            params:{
                size:15,
                current:1,
                winId:-1,
                query:''
            },
            userList:[],
            matterForm:{
                matterName:'',
                winId:'',
                memo:'',
                tenantId:''
            },
            arrIds:[],
            departmentId:null,
            matterFormValidate:{
                matterName:[
                   { required: true, message: '窗口办事事项名称不能为空', trigger: 'change' }
                ]
            },
            matterCloumns:[
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
                    title: '事项名称',
                    key: 'matterName'
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
            windowDatas:[],
            matterDatas:[]
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadOperatingMatter();
        },
        changepage:function(value){
            this.params.current = value;
            this.loadOperatingMatter();
        },
        onChangePageSize:function(value){
            this.params.size = value;
            this.loadOperatingMatter();
        },
        showMatter:function(){
            this.matterModal = true;
            this.isUpdate = false;
        },
        addOperatingMatter:function(name){
            var self = this;
            self.$refs[name].validate((valid) => {
                if(valid){
                    self.matterForm.tenantId = self.$constants.userInfo.tenantId;
                    var url = self.$constants.BIURL+'/operating/matter';
                    var method = 'POST';
                    if(self.isUpdate){
                        method = 'PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.matterForm
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
                                self.matterModal = false;
                                self.loadOperatingMatter();
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
            this.matterModal = false;
        },
        loadOperatingMatter:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/operating/matter/list',
                method:'GET',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.matterDatas = data.data.records;
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
        findAllWindow:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/operating/window/list',
                method:'GET',
                dataType:'json',
                params:{
                    current:1,
                    size:100,
                    tenantId:self.$constants.userInfo.tenantId
                }
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
        deleteMatter:function(index){
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
                    self.loadOperatingMatter();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        updateMatter:function(index){
            this.isUpdate = true;
            this.matterForm = Object.assign({}, this.windowDatas[index]);
            this.matterModal = true;
        },
        qRCode:function(index){
            var data = this.windowDatas[index];
            this.qrCodePath = data.qrCode;
            this.qrCodeModal = true;
        }
    },
    mounted:function(){
        this.findAllWindow();
        this.loadOperatingMatter();
    }
}
</script>
