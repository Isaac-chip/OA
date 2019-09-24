<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem >系统管理</BreadcrumbItem>
            <BreadcrumbItem to="/system/apkEdition">APK版本管理</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
            <Row class="header">
                    <Button @click="showApkEdition"  icon="ios-cloud-download">新增</Button>
            </Row>
             <Table border ref="selection" :columns="apkCloumns" :data="apkDatas">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="deleteApk(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="params.size" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>

            <Modal  v-model="apkModal" title="新增APK版本" :footer-hide="true" :mask-closable="false">
                <Form ref="apkForm" :model="apkForm" :rules="apkFormRuleValidate" :label-width="90" >
                    <FormItem label="版本信息" prop="apkVersion">
                        <Input v-model="apkForm.apkVersion" placeholder="请输入安装包版本信息" />
                    </FormItem>
                    <FormItem label="上传APK">
                        <Upload ref="apkUpload"
                                :action="fileServer"
                                :on-success="handleSuccess"
                                :format="['apk','APK']"
                                :on-format-error="formatError"
                                :headers="uploadHeaders" >
                            <Button icon="ios-cloud-upload-outline">上传APK文件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="版本信描述" prop="memo">
                        <Input v-model="apkForm.memo"  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入升级功能描述" />
                    </FormItem>
                     <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="addApkEdition('apkForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideUserModel('apkForm')">关闭</Button>
                        </div>
                    </Row>
                </Form>
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
            deptId:null,
            apkModal:false,
            fileServer:null,
            uploadHeaders:{},
            params:{
                size:15,
                current:1
            },
            apkForm:{
                apkName:'',
                apkVersion:'',
                apkUrl:'',
                memo : '',
                apkSize:''
            },
            apkFormRuleValidate:{
                apkVersion:[
                   { required: true, message: 'apk版本信息不能为空', trigger: 'blur' }
                ],
                memo:[
                    { required: true, message: '版本升级描述不能为空', trigger: 'blur' }
                ]
            },
            apkCloumns:[
                {
                    type: 'index',
                    width: 70,
                    title:'序号',
                    align: 'center'
                },{
                    title: 'apk名称',
                    key: 'appName',
                    width:'120'
                },{
                    title: '下载路径',
                    key: 'appUrl',
                    width:'250'
                },{
                    title: '版本信息',
                    key: 'appVersion'
                },{
                    title: '版本包大小',
                    key: 'appSize'
                },{
                    title: '创建时间',
                    key: 'createTime'
                },{
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            apkDatas:[]
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
        }
        this.fileServer = this.$constants.BIURL +'/apkEdition/upload';
    },
    methods:{
        changepage:function(value){
            this.params.current = value;
            this.loadAapEdition();
        },
        onChangePageSize:function(value){
            this.params.size = value;
            this.loadAapEdition();
        },
        showApkEdition:function(){
            this.apkModal = true;
        },
        addApkEdition:function(name){
             var self = this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(self.apkForm.apkUrl == null || self.apkForm.apkUrl == ''){
                        this.$Message.error('请选上传apk文件!');
                        return;
                    }
                    var url = self.$constants.BIURL+'/apkEdition';
                    self.$http({
                        url:url,
                        method:'POST',
                        dataType:'json',
                        params:self.apkForm
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
                                self.$refs.apkUpload.clearFiles();
                                self.apkModal = false;
                                self.loadAapEdition();
                                self.$Message.success({
                                    content: '数据添加成功!',
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
                }else{  
                    this.$Message.error('表单校验失败，请输入必填项!');
                }
            });
        },
        formatError:function(file, fileList){
            this.$Message.error('上传文件格式错误，请选择APK文件上传!');
        },
        hideUserModel:function(name){
            this.$refs[name].resetFields();
            this.apkModal = false;
        },
        handleSuccess:function(response, file, fileList){
            var self = this;
            var data = response.data;
            console.log(data);
            if(data){
                self.apkForm.apkName = data.name;
                self.apkForm.apkUrl = data.filePath;
                self.apkForm.apkSize = data.length;
            }
        },
        loadAapEdition:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/apkEdition/list',
                method:'GET',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.apkDatas = data.data.records;
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
        deleteApk:function(index){
            var self = this;
            const data = this.apkDatas[index];

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
                url:self.$constants.BIURL+'/apkEdition/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadAapEdition();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        }
    },
    mounted:function(){
        this.loadAapEdition();
    }
}
</script>
