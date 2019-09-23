<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>学习教育</BreadcrumbItem>
            <BreadcrumbItem>专题学习</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
             <Row class="header">
                <Col  span="2"><Button @click="showContentModal">新增</Button></Col>
                <Col  span="7">
                    <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入标题或副标题查找" />
                </Col>
            </Row>
            <Table border ref="selection" :columns="contentCloumns" :data="contentDatas" :min-height="200">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="loadStudyConentList(index)">专题列表</Button>
                    <Button  size="small" style="margin-right: 5px" @click="updateContent(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deleteContent(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal v-model="contentModal" title="专题栏目" :footer-hide="true" :mask-closable="false" class="contentFrom" width="600">
                <Form ref="studyCatalogForm" :model="studyCatalogForm" :rules="userRuleValidate" :label-width="80"  >
                    <FormItem label="专题名称" prop="catalogName">
                        <Input v-model="studyCatalogForm.catalogName" placeholder="请输入标题" />
                    </FormItem>
                    <FormItem label="序号">
                        <Input v-model="studyCatalogForm.sortNo" type="number" placeholder="请输入标题" />
                    </FormItem>
                    <FormItem label="专题图片" >
                        <div class="demo-upload-list" :key="item.url" v-for="item in uploadList">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </div>
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            :headers="uploadHeaders" 
                            multiple
                            type="drag"
                            :action="contentFilePath"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>

                        <Modal title="图片预览" v-model="visible">
                            <img :src="imgName" v-if="visible" style="width: 100%">
                        </Modal>
                    </FormItem>
                    <FormItem label="发布状态" >
                         <!-- v-model="studyCatalogForm.isTop" -->
                        <RadioGroup v-model="studyCatalogForm.catalogState">
                            <Radio label="1" >已发布</Radio>
                            <Radio label="0">未发布</Radio>
                        </RadioGroup>
                    </FormItem>
                     <FormItem label="专题描述" prop="memo">
                         <Input v-model="studyCatalogForm.memo" type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder=""></Input>
                    </FormItem>
                    <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="addConent('studyCatalogForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideContentModel('studyCatalogForm')">关闭</Button>
                        </div>
                    </Row>
                </Form>
        </Modal>
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

.contentFrom .ivu-modal-content{
    width: 720px !important;
}

.quill-editor{
    height: 300px;
}

</style>
<script>
export default {
    data() {
        return {
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            current:1,
            size:15,
            contentModal:false,
            isUpdate:false,
            queryStr:'',
            catalogId:-1,
            editorOption:{
                height:'400px'
            },
            contentFilePath:'',
            contentCloumns:[{
                type: 'index',
                width: 65,
                title:'序号',
                align: 'center'
            },{
                title: '专题图片',
                key: 'catalogIcon',
                width:'100px',
                render : (h, params) => {
                    var self = this;
                    var catalogIcon = params.row.catalogIcon;
                    return h('img',{
                        attrs:{
                            src:self.$constants.PREPATH+catalogIcon
                        },
                        style: {
                            width: '64px',
                            height:'64px'
                        }
                    }) 
                }
            },{
                title: '专题名称',
                key: 'catalogName',
                width:'240px'
            },{
                title: '专题描述',
                key: 'memo',
                width:'220px'
            },{
                title: '创建时间',
                key: 'createTs',
            },{
                title: '操作',
                slot: 'action',
                width: 220,
                align: 'center'
            }],
            contentDatas:[],
            studyCatalogForm:{
                catalogName:null,
                sortNo:0,
                catalogIcon:'',
                catalogState:'',
                memo:''
            },
            imgUrl: '',
            visible: false,
            uploadHeaders:{},
            uploadList: [],
            catalogDatas:[],
            defaultList:[],
            userRuleValidate:{
                catalogName: [
                    { required: true, message: '专题名称不能为空', trigger: 'blur' }
                ],
                memo: [
                    { required: true, message: '专题描述不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created:function(){
        this.imgUrl = this.$constants.BIURL
        this.contentFilePath = this.$constants.BIURL + '/file/upload';
        this.setHeaders();
    },
    methods:{
        setHeaders:function(){
            var self = this;
            var access_token = this.$constants.access_token;
            if(access_token == null || access_token ==''){
                var userInfo =window.localStorage.getItem('userInfo');
                if(userInfo !=null && userInfo!=''){
                    access_token = JSON.parse(userInfo).access_token;
                }
            }
            self.uploadHeaders = {
                'Authorization': "bearer " + access_token
            };  
        },
        onSeach:function(){
            this.current = 1;
            this.loadContents();
        },
        changepage:function(value){
            this.current = value;
            this.loadContents();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadContents();
        },
        loadContents:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/study/catalog/list',
                method:'GET',
                dataType:'json',
                params:{
                    current:self.current,
                    size:self.pageSize,
                    query:self.queryStr,
                    tenantId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data);
                    self.contentDatas = data.data.records;
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
        showContentModal:function(){
            this.contentModal = true;
            this.isUpdate = false;
            this.uploadList = [];
            this.$refs['studyCatalogForm'].resetFields();
        },
        addConent:function(name){
            var self = this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    self.studyCatalogForm.tenantId = self.$constants.userInfo.tenantId;
                    self.studyCatalogForm.creator = self.$constants.userInfo.userName;
                    var url = self.$constants.BIURL+'/study/catalog';
                    var method = 'POST';
                    if(self.isUpdate){
                        method='PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.studyCatalogForm
                    })
                    .then(function (response) {
                        if(response.status ==200){
                            var data = response.data;
                            self.studyCatalogForm.catalogId = -1;
                            if(data.code == 1){
                                self.$Message.error({
                                    content: data.data,
                                    duration: 2
                                }); 
                            }else{
                                self.current = 1;
                                self.contentModal = false;
                                self.$refs['studyCatalogForm'].resetFields();
                                self.loadContents();
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
        loadStudyConentList:function(index){
            var data = this.contentDatas[index];
            this.$router.push({
                'name': 'studyContent',
                'path': '/exam/studyContent',
                query: {'id': data.id}
            })
        },
        updateContent:function(index){
            this.isUpdate = true;
            this.studyCatalogForm = Object.assign({}, this.contentDatas[index]);
            this.studyCatalogForm.catalogState = this.studyCatalogForm.catalogState +'';
            this.contentModal = true;
            this.uploadList = [];
            this.uploadList.push({
                'name':'image',
                'url':this.$constants.PREPATH+this.studyCatalogForm.catalogIcon
            });
        },
        deleteContent:function(index){
            var self = this;
            const data = this.contentDatas[index];

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
                url:self.$constants.BIURL+'/study/catalog/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadContents();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        handleSuccess :function(response, file, fileList){
            var data = response.data;
            var self = this;
            if(data){
                this.studyCatalogForm.catalogIcon = data.filePath;
                this.uploadList.push({
                    'name':data.name,
                    'url': this.$constants.PREPATH+data.filePath
                });
            }
        },
        hideContentModel:function(name){
            this.$refs[name].resetFields();
            this.contentModal = false;
            this.studyCatalogForm.catalogId = -1;
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            this.uploadList.splice(this.uploadList.indexOf(file), 1);
            this.studyCatalogForm.catalogIcon = '';
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '系统提示',
                desc: '上传图片格式错误'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '系统提示',
                desc: '上传的图片文件不能超过4M.'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 1;
            return check;
        }
    },
    mounted:function(){
        this.loadContents();
    }
}
</script>
