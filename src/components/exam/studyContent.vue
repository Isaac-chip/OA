<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>学习教育</BreadcrumbItem>
            <BreadcrumbItem to="/exam/studyCatalog">专题学习</BreadcrumbItem>
            <BreadcrumbItem>专题列表</BreadcrumbItem>
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
                    <Button  size="small" style="margin-right: 5px" @click="updateContent(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deleteContent(index)">删除</Button>
                </template>
                 <template slot-scope="{row }" slot="imgtpl">
                    <img v-if="row.titlePic" :src="$constants.PREPATH+row.titlePic" style="width:64px;height:64px;margin-top:5px;" />
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal v-model="contentModal" title="信息发布" :footer-hide="true" :mask-closable="false" class="contentFrom" width="600">
                <Form ref="studyContentForm" :model="studyContentForm" :rules="userRuleValidate" :label-width="80"  >
                    <FormItem label="标题" prop="title">
                        <Input v-model="studyContentForm.title" placeholder="请输入标题" />
                    </FormItem>
                     <FormItem label="副标题" prop="subTitle">
                        <Input v-model="studyContentForm.subTitle" placeholder="请输入副标题" />
                    </FormItem>
                    <FormItem label="有效日期">
                        <DatePicker v-model="studyContentForm.expiryDate" type="datetime" placeholder="请选择有效日期" ></DatePicker>
                    </FormItem>
                     <FormItem label="作者">
                        <Input v-model="studyContentForm.author" placeholder="请输入作者" />
                    </FormItem>
                     <FormItem label="信息来源">
                        <Input v-model="studyContentForm.newsfrom"  placeholder="请输入信息来源" />
                    </FormItem>
                    <FormItem label="序号">
                        <Input v-model="studyContentForm.sortNo" type="number" placeholder="请输入标题" />
                    </FormItem>
                    <FormItem label="标题图片" >
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
                        <RadioGroup v-model="studyContentForm.used">
                            <Radio label="1" >已发布</Radio>
                            <Radio label="0">未发布</Radio>
                        </RadioGroup>
                    </FormItem>
                    <Row>
                        <Col span="6">
                            <FormItem label="是否置顶" >
                                <RadioGroup v-model="studyContentForm.isTop">
                                    <Radio label="1" >是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem  label="每日推送" >
                                 <RadioGroup v-model="studyContentForm.isDailyPush">
                                    <Radio label="1" >是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="height:360px;margin-bottom:20px;">
                        <quill-editor ref="myTextEditor"
                            :options="editorOption" 
                            v-model="studyContentForm.content">
                        </quill-editor>
                    </Row>
                    <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="addConent('studyContentForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideContentModel('studyContentForm')">关闭</Button>
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
                key: 'index',
                width: 65,
                title:'序号',
                align: 'center'
            },{
                title: '预览图片',
                key: 'titlePic',
                width:'120px',
                slot:'imgtpl'
            },{
                title: '标题',
                key: 'title',
                width:'220px'
            },{
                title: '副标题',
                key: 'subTitle',
                width:'220px'
            },{
                title: '创建时间',
                key: 'createTs',
                 width:'180px'
            },{
                 title: '置顶',
                key: 'isTop',
                render: (h, params) => {
                    const row = params.row
                    var text = row.isTop;
                    console.log(text);
                    switch(text){
                        case 0:
                            return h('span','否');
                            break;
                        case 1:
                            return h('span','是');
                            break;
                    }
                }
            },{
                title: '操作',
                slot: 'action',
                width: 140,
                align: 'center'
            }],
            contentDatas:[],
            catalogId:'',
            studyContentForm:{
                catalogId:null,
                used:0,
                title:'',
                expiryDate:'',
                author:'',
                newsfrom:'',
                content:'',
                isTop:0,
                isDailyPush:0,
                creatorId:-1,
                titlePic:'',
                sortNo:0
            },
            imgUrl: '',
            visible: false,
            uploadHeaders:{},
            uploadList: [],
            catalogDatas:[],
            defaultList:[],
            userRuleValidate:{
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created:function(){
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
        clearForm:function(){
            this.studyContentForm={
                catalogId:null,
                used:0,
                title:'',
                expiryDate:'',
                author:'',
                newsfrom:'',
                content:'',
                isTop:0,
                isDailyPush:0,
                creatorId:-1,
                titlePic:'',
                sortNo:0
            }
        },
        loadContents:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/study/content/list',
                method:'GET',
                dataType:'json',
                params:{
                    current:self.current,
                    size:self.pageSize,
                    title:self.queryStr,
                    catalogId:self.catalogId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data);
                    self.contentDatas = data.data.records;
                    self.dataCount = data.data.total;
                     self.contentDatas.forEach((item,index) => {
                        item["index"]= index + (self.current -1)*  self.pageSize +1
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
        showContentModal:function(){
            this.contentModal = true;
            this.isUpdate = false;
            this.uploadList = [];
            this.clearForm();
        },
        addConent:function(name){
            var self = this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    self.studyContentForm.tenantId = self.$constants.userInfo.tenantId;
                    self.studyContentForm.expiryDate = self.$convertDate(self.studyContentForm.expiryDate);
                    self.studyContentForm.creatorId = self.$constants.userInfo.userId;
                    self.studyContentForm.studyCatalogId = self.catalogId;
                    var url = self.$constants.BIURL+'/study/content';
                    var method = 'POST';
                    if(self.isUpdate){
                        method='PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.studyContentForm
                    })
                    .then(function (response) {
                        if(response.status ==200){
                            var data = response.data;
                            self.studyContentForm.catalogId = -1;
                            if(data.code == 1){
                                self.$Message.error({
                                    content: data.data,
                                    duration: 2
                                }); 
                            }else{
                                self.current = 1;
                                self.contentModal = false;
                                self.$refs['studyContentForm'].resetFields();
                                self.uploadList = [];
                                self.clearForm();
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
        updateContent:function(index){
            this.isUpdate = true;
            this.studyContentForm = Object.assign({}, this.contentDatas[index]);
            this.studyContentForm.isTop = this.studyContentForm.isTop+'';
            this.studyContentForm.isDailyPush = this.studyContentForm.isDailyPush+'';
            this.studyContentForm.used = this.studyContentForm.used +'';
            this.contentModal = true;
            this.uploadList = [];
            this.uploadList.push({
                'name':'image',
                'url':this.$constants.PREPATH+this.studyContentForm.titlePic
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
                url:self.$constants.BIURL+'/study/content/'+data.id,
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
            if(data){
                this.studyContentForm.titlePic = data.filePath;
                this.uploadList.push({
                    'name':data.name,
                    'url':this.$constants.PREPATH+data.filePath
                });
            }
        },
        hideContentModel:function(name){
            this.$refs[name].resetFields();
            this.contentModal = false;
            this.studyContentForm.catalogId = -1;
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            this.uploadList.splice(this.uploadList.indexOf(file), 1);
            this.studyContentForm.titlePic = '';
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
        this.catalogId = this.$route.query.id
        this.loadContents();
    }
}
</script>
