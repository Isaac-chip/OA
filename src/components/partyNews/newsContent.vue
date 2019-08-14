<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>党讯管理</BreadcrumbItem>
            <BreadcrumbItem>信息发布</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
             <Row class="header">
                <Col  span="2"><Button @click="showContentModal">新增</Button></Col>
                <Col  span="7">
                    <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
                </Col>
            </Row>
            <Table border ref="selection" :columns="contentCloumns" :data="contentDatas" :min-height="200">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="resetPwd(index)">查看评论</Button>
                    <Button  size="small" style="margin-right: 5px" @click="updateContent(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deleteContent(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal v-model="contentModal" title="信息发布" :footer-hide="true" :mask-closable="false" class="contentFrom" width="600">
                <Form ref="contentForm" :model="contentForm" :rules="userRuleValidate" :label-width="80"  >
                    <FormItem label="所属栏目">
                        <treeselect 
                                v-model="contentForm.catalogId"
                                :options="catalogDatas"
                                :max-height="200"
                                @select="orgSelect"
                                noResultsText="没有找到匹配结果"
                                placeholder="请选择所属栏目..." />
                    </FormItem>
                    <FormItem label="标题" prop="title">
                        <Input v-model="contentForm.title" placeholder="请输入标题" />
                    </FormItem>
                    <FormItem label="有效日期">
                        <DatePicker v-model="contentForm.expiryDate" type="datetime" placeholder="请选择有效日期" ></DatePicker>
                    </FormItem>
                    <FormItem label="序号">
                        <Input v-model="contentForm.sortNo" type="number" placeholder="请输入标题" />
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
                            multiple
                            type="drag"
                            action="http://localhost:9011/file/fileUpload"
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
                         <!-- v-model="contentForm.isTop" -->
                        <RadioGroup v-model="contentForm.state">
                            <Radio label="1" >已发布</Radio>
                            <Radio label="0">未发布</Radio>
                        </RadioGroup>
                    </FormItem>
                    <Row>
                        <Col span="5">
                            <FormItem v-model="contentForm.isTop" label="是否置顶" >
                                <Checkbox label="1" >置顶</Checkbox>
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem v-model="contentForm.isDailyPush" label="每日推送" >
                                <Checkbox label="1" >每日推送</Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="height:360px;margin-bottom:20px;">
                        <quill-editor ref="myTextEditor"
                            :options="editorOption" 
                            v-model="contentForm.content">
                        </quill-editor>
                    </Row>
                    <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="addConent('contentForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideContentModel('contentForm')">关闭</Button>
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
            contentCloumns:[{
                type: 'index',
                width: 65,
                title:'序号',
                align: 'center'
            },{
                title: '栏目',
                width:'100px',
                key: 'catalogName'
            },{
                title: '标题',
                key: 'title',
                width:'280px'
            },{
                 title: '创建人',
                key: 'userName'
            },{
                title: '创建时间',
                key: 'creatTs',
            },{
                 title: '状态',
                key: 'state',
                render: (h, params) => {
                    const row = params.row
                    var text = row.state;
                    switch(text){
                        case 0:
                            return h('span','未发布');
                            break;
                        case 1:
                            return h('span','已发布');
                            break;
                    }
                    return h('span', '已发布')
                }
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
                width: 210,
                align: 'center'
            }],
            contentDatas:[],
            contentForm:{
                catalogId:null,
                state:0,
                title:'',
                expiryDate:'',
                content:'',
                isTop:0,
                isDailyPush:0,
                creatorId:-1,
                titlePic:'',
                sortNo:0
            },
            imgUrl: '',
            visible: false,
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
    methods:{
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
                url:self.$constants.BIURL+'/political/content/findAll',
                method:'GET',
                dataType:'json',
                params:{
                    current:self.current,
                    size:self.pageSize,
                    query:self.queryStr,
                    catalogId:self.catalogId,  
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
            this.loadCatalog();
        },
        orgSelect:function(node){
            this.contentForm.catalogId = node.id;
        },
        loadCatalog:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/catalog/findAll',
                method:'GET',
                params:{
                queryStr:''
                }
            }).then(function (response) {
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
                    arrChange(data.data);
                    self.catalogDatas = data.data;
            }}).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        addConent:function(name){
            var self = this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(self.contentForm.catalogId == -1) {
                         this.$Message.error('请选择所属栏目!');
                         return;
                    }
                    self.contentForm.tenantId = self.$constants.userInfo.tenantId;
                    self.contentForm.expiryDate = self.$convertDate(self.contentForm.expiryDate);
                    self.contentForm.creatorId = self.$constants.userInfo.userId;
                    var url = self.$constants.BIURL+'/political/content';
                    var method = 'POST';
                    if(self.isUpdate){
                        url = self.$constants.BIURL+'/political/content';
                        method='PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.contentForm
                    })
                    .then(function (response) {
                        if(response.status ==200){
                            var data = response.data;
                            self.contentForm.catalogId = -1;
                            if(data.code == 1){
                                self.$Message.error({
                                    content: data.data,
                                    duration: 2
                                }); 
                            }else{
                                self.current = 1;
                                self.contentModal = false;
                                self.$refs['contentForm'].resetFields();
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
            this.loadCatalog();
            this.contentForm = Object.assign({}, this.contentDatas[index]);
            this.contentForm.isTop = this.contentForm.isTop+'';
            this.contentForm.isDailyPush = this.contentForm.isDailyPush+'';
            this.contentForm.state = this.contentForm.state +'';
            this.contentModal = true;
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
                url:self.$constants.BIURL+'/political/content/'+data.id,
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
        handleSuccess :function(response, file, fileList){
            var data = response.data;
            if(data){
                this.contentForm.titlePic = data.filePath;
                this.uploadList.push({
                    'name':data.name,
                    'url':data.filePath
                });
            }
        },
        hideContentModel:function(name){
            this.$refs[name].resetFields();
            this.contentModal = false;
            this.contentForm.catalogId = -1;
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            this.uploadList.splice(this.uploadList.indexOf(file), 1);
            this.contentForm.titlePic = '';
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
