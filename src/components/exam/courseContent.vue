<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>学习教育</BreadcrumbItem>
            <BreadcrumbItem>每日一学</BreadcrumbItem>
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
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal v-model="contentModal" title="信息发布" :footer-hide="true" :mask-closable="false" class="contentFrom" width="600">
                <Form ref="courseForm" :model="courseForm" :rules="userRuleValidate" :label-width="80"  >
                    <FormItem label="标题" prop="title">
                        <Input v-model="courseForm.title" placeholder="请输入标题" />
                    </FormItem>
                     <FormItem label="副标题" prop="subTitle">
                        <Input v-model="courseForm.subTitle" placeholder="请输入副标题" />
                    </FormItem>
                    <FormItem label="有效日期">
                        <DatePicker v-model="courseForm.expiryDate" type="datetime" placeholder="请选择有效日期" ></DatePicker>
                    </FormItem>
                     <FormItem label="作者">
                        <Input v-model="courseForm.author" placeholder="请输入作者" />
                    </FormItem>
                     <FormItem label="信息来源">
                        <Input v-model="courseForm.newsfrom"  placeholder="请输入信息来源" />
                    </FormItem>
                    <FormItem label="序号">
                        <Input v-model="courseForm.sortNo" type="number" placeholder="请输入标题" />
                    </FormItem>
                    <FormItem label="标题图片" >
                        <div class="demo-upload-list" :key="item.url" v-for="item in uploadList">
                            <img :src="'http://120.24.51.37/group1/'+item.url">
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
                            <img :src="'http://120.24.51.37/group1/' + imgName + ''" v-if="visible" style="width: 100%">
                        </Modal>
                    </FormItem>
                    <FormItem label="发布状态" >
                         <!-- v-model="courseForm.isTop" -->
                        <RadioGroup v-model="courseForm.state">
                            <Radio label="1" >已发布</Radio>
                            <Radio label="0">未发布</Radio>
                        </RadioGroup>
                    </FormItem>
                    <Row>
                        <Col span="5">
                            <FormItem v-model="courseForm.isTop" label="是否置顶" >
                                <Checkbox label="1" >置顶</Checkbox>
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem v-model="courseForm.isDailyPush" label="每日推送" >
                                <Checkbox label="1" >每日推送</Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="height:360px;margin-bottom:20px;">
                        <quill-editor ref="myTextEditor"
                            :options="editorOption" 
                            v-model="courseForm.content">
                        </quill-editor>
                    </Row>
                    <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="addConent('courseForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideContentModel('courseForm')">关闭</Button>
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
                title: '预览图片',
                key: 'titlePic',
                width:'120px',
                render : (h, params) => {
                    var self = this;
                    var titlePic = params.row.titlePic;
                    return h('img',{
                        attrs:{
                            src:self.$constants.PREPATH+titlePic
                        },
                        style: {
                            width: '64px',
                            height:'64px'
                        }
                    }) 
                }
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
                key: 'creatTs',
            },{
                 title: '置顶',
                key: 'isTop',
                render: (h, params) => {
                    const row = params.row
                    var text = row.isTop;
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
            courseForm:{
                catalogId:null,
                state:0,
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
        loadContents:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/course/content/list',
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
        },
        addConent:function(name){
            var self = this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    self.courseForm.tenantId = self.$constants.userInfo.tenantId;
                    self.courseForm.expiryDate = self.$convertDate(self.courseForm.expiryDate);
                    self.courseForm.creatorId = self.$constants.userInfo.userId;
                    var url = self.$constants.BIURL+'/course/content';
                    var method = 'POST';
                    if(self.isUpdate){
                        method='PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.courseForm
                    })
                    .then(function (response) {
                        if(response.status ==200){
                            var data = response.data;
                            self.courseForm.catalogId = -1;
                            if(data.code == 1){
                                self.$Message.error({
                                    content: data.data,
                                    duration: 2
                                }); 
                            }else{
                                self.current = 1;
                                self.contentModal = false;
                                self.$refs['courseForm'].resetFields();
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
            this.courseForm = Object.assign({}, this.contentDatas[index]);
            this.courseForm.isTop = this.courseForm.isTop+'';
            this.courseForm.isDailyPush = this.courseForm.isDailyPush+'';
            this.courseForm.state = this.courseForm.state +'';
            this.contentModal = true;
            this.uploadList = [];
            this.uploadList.push({
                'name':'image',
                'url':this.courseForm.titlePic
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
                url:self.$constants.BIURL+'/course/content/'+data.id,
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
                this.courseForm.titlePic = data.filePath;
                this.uploadList.push({
                    'name':data.name,
                    'url':data.filePath
                });
            }
        },
        hideContentModel:function(name){
            this.$refs[name].resetFields();
            this.contentModal = false;
            this.courseForm.catalogId = -1;
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            this.uploadList.splice(this.uploadList.indexOf(file), 1);
            this.courseForm.titlePic = '';
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
