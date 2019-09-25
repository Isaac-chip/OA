<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
             <BreadcrumbItem>学习教育</BreadcrumbItem>
            <BreadcrumbItem>知识竞赛</BreadcrumbItem>
            <BreadcrumbItem>试卷管理</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
             <Row class="header">
               <Form :label-width="100">
                   <Col span="2">
                        <Button @click="showUserModal" icon="md-add">新增</Button>
                   </Col>
                   <Col span="8">
                        <FormItem label="分类:">
                            <Select v-model="subjectTypeId">
                                <Option value="">全部分类</Option>
                                <Option  v-for="item in examTypes" :value="item.id" :key="item.id">{{ item.subjectTypeName }}</Option>
                            </Select>
                        </FormItem>
                   </Col>
                   <Col span="8">
                        <FormItem label="试卷名称:">
                        <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入试卷名称" />
                    </FormItem>
                   </Col>
               </Form>
            </Row>
            <Table border ref="examSubject" :columns="examSubjectCloumns" :data="examSubjectDatas" :min-height="200">
                <template slot-scope="{ row, index }" slot="action">
                    <Dropdown trigger="click" :transfer="true" @on-click="oparHandler">
                        <a href="javascript:void(0)">
                            更多操作
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem :name="'add' + index" :ref="'add' + index" :data-index="index">添加/移除考试对象</DropdownItem>
                            <DropdownItem :name="'upd' + index" :ref="'upd' + index" :data-index="index">修改</DropdownItem>
                            <DropdownItem :name="'del' + index" :ref="'del' + index" :data-index="index">删除</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal v-model="examSubjectModal" :title="modalTitle" :footer-hide="true" :mask-closable="false" class="userFrom">
                <Form ref="examSubjectForm" :model="examSubjectForm" :rules="examRuleValidate" :label-width="110"  >
                    <FormItem label="所属分类" prop="subjectTypeId">
                        <Select v-model="examSubjectForm.subjectTypeId" @on-change="typeSearchSelect">
                            <Option  v-for="(item,index) in examTypes" :value="item.id" :key="index">{{ item.subjectTypeName }}</Option>
                        </Select>
                    </FormItem>
                     <FormItem label="试卷名称" prop="subject">
                        <Input v-model="examSubjectForm.subject" placeholder="请输入试卷分类名称" />
                    </FormItem>
                     <FormItem label="考试时长(分钟)" prop="totalTime">
                        <Input v-model="examSubjectForm.totalTime" placeholder="请输入考试时长(分钟)" />
                    </FormItem>
                    <FormItem label="考试开始时间" prop="startTime">
                        <DatePicker v-model="examSubjectForm.startTime" type="datetime"  placeholder="请输入考试开始时间" />
                    </FormItem>
                     <FormItem label="考试截止时间" prop="endTime">
                        <DatePicker v-model="examSubjectForm.endTime" type="datetime" placeholder="选择考试截止时间" />
                    </FormItem>
                     <FormItem label="备注" prop="memo">
                         <Input v-model="examSubjectForm.memo" type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder=""></Input>
                    </FormItem>
                    <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="saveExamSubject('examSubjectForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideExamModel('examSubjectForm')">关闭</Button>
                        </div>
                    </Row>
                </Form>
        </Modal>

        <Modal  v-model="examObjectActorModal" title="考试对象" :footer-hide="true" :mask-closable="false" class="userFrom" width="380">
            <div>
                <Row style="margin-bottom:10px">
                    <Input v-model="deptQueryStr" search  @on-search="deptSearch" enter-button placeholder="输入党委或支部名称查找" />
                </Row>
                <Row :gutter="16" class="actorView">
                    <Tree show-checkbox @on-check-change="treeCheckClick" style="margin-top:10px;" class="dept_tree" :data="departmentDatas"></Tree>
                </Row>
                 
            </div>
        </Modal>
    </div>
</template>
<style  scoped>
    .header{
        margin-bottom: 5px;
    }

    .pageView{
        text-align: right;
        margin-top: 10px;
    }

    .userFrom .ivu-modal{
    width: 620px !important;
}
.actorView{
    height: 300px;
    overflow-y: scroll;
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
            examSubjectModal:false,
            examObjectModal:false,
            examObjectActorModal:false,
            isUpdate:false,
            queryStr:'',
            modalTitle:'新增试卷',
            subjectTypeId:'',
            page:1,
            userDataCount:0,
            limit:10,
            deptCode:'',
            deptQueryStr:'',
            examSubjectId:-1,
            departmentDatas:[],
            examSubjectCloumns:[{
                type: 'index',
                width: 70,
                title:'序号',
                align: 'center'
            },{
                title: '试卷标题',
                key: 'subject',
                width:'180'
            },{
                title: '试卷分类',
                key: 'subjectTypeName'
            },{
                 title: '考试开始时间',
                key: 'startTime'
            },{
                 title: '考试截止时间',
                key: 'endTime'
            },{
                 title: '试卷总分',
                key: 'totalScore'
            },{
                 title: '考试时长(分钟)',
                key: 'totalTime'
            },{
                 title: '创建人',
                key: 'userName'
            },{
                title: '操作',
                slot: 'action',
                width: 120,
                align: 'center'
            }],
            examSubjectDatas:[],
            examTypes:[],
            examSubjectForm:{
                subject:'',
                totalTime:'',
                totalScore:0,
                startTime:'',
                endTime:'',
                subjectTypeId:-1,
                subjectTypeName:'',
                memo:''
            },
            examRuleValidate:{
                subjectTypeId:[
                    {required: true, type:'integer', message: '所属分类不能为空', trigger: 'change'}
                ],
                subject:[
                    { required: true, message: '试卷名称不能为空', trigger: 'blur' }
                ],
                totalTime:[
                    { required: true, message: '考试时长不能为空', trigger: 'blur' }
                ],
                startTime:[
                     {required: true, type: 'date',message: '请输入考试开始时间', trigger: 'change'}
                ],
                endTime:[
                     {required: true, type: 'date',message: '请输入截止开始时间', trigger: 'change'}
                ]
            }
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadExamSubject();
        },
        changepage:function(value){
            this.current = value;
            this.loadExamSubject();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadExamSubject();
        },
        showUserModal:function(){
            this.clearData();
            this.examSubjectModal = true;
            this.modalTitle = '新增试卷';
            this.isUpdate = false;
        },
        clearData:function(){
            this.examSubjectForm = {
                subject:'',
                totalTime:'',
                totalScore:0,
                startTime:'',
                endTime:'',
                subjectTypeId:'',
                subjectTypeName:'',
                memo:''
            }
        },
        oparHandler:function(name){
           const self = this;
           var index = this.$refs[name].$el.dataset.index;
           var data = this.examSubjectDatas[index];
           switch(name){
               case 'add'+index:
                   self.examSubjectId = data.id;
                   self.addExamObject(data);
                   break;
                case 'upd'+index:
                   self.updateExam(data);
                    break;
                case 'del'+index:
                    self.deleteUser(index);
                    break;
           }
        },
        changepageByUser:function(vaule){
            this.page = vaule;
        },
        treeCheckClick:function(obj,item){
           var data = this.childrenNode(obj);
           var str = '';
           if(data && data.length >0){
               str = data.join(',');
           }
            this.saveExamSubjectActor(this.examSubjectId,str);
        },
        saveExamSubjectActor:function(id,data){
            var self = this
            self.$http({
                url: self.$constants.BIURL + '/education/exam/student/save',
                method: 'get',
                params:{
                    subId:id,
                    data:data
                }
            }).then(function (response) {
                
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                })
            })
        },
        childrenNode:function(sub){
            var arr = [];
            for(var i=0;i<sub.length; i++){
                var obj = sub[i];
                arr.push(obj.id);
            }
            return arr;
        },
        deptSearch:function(value){
            this.loadDepartment();
        },
        loadDepartment:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/education/exam/student/department/list',
                method:'GET',
                params:{
                    objId:self.examSubjectId,
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
                self.departmentDatas = data;
                }
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        //添加考试成员
        addExamObject:function(data){
            this.examObjectActorModal = true;
            this.loadDepartment();
        },
        updateExam:function(data){
            this.examSubjectForm = Object.assign({}, data);
            this.examSubjectForm.subjectTypeId = data.subjectTypeId;

            console.log(this.examSubjectForm);
            this.isUpdate = true;
            this.modalTitle = '修改试卷';
            this.examSubjectModal = true;
        },
        typeSearchSelect:function(node){
           var self = this;
           for(var i=0; i<self.examTypes.length;i++){
               var item = self.examTypes[i];
               if(item.id == node){
                   self.examSubjectForm.subjectTypeName = item.subjectTypeName;
                   break;
               }
           }
        },
        loadExamSubject:function(){
            var self = this;
            self.$http({
            url:self.$constants.BIURL+'/education/exam/subject/list',
            method:'GET',
            params:{
                current:self.current,
                size:self.pageSize,
                type:self.subjectTypeId,
                subject:self.queryStr
            }
            }) .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.examSubjectDatas = data.data.records;
                    self.dataCount = data.data.total;
                }
            })
        },
        loadAllExamType:function(){
            var self = this
            self.$http({
                url: self.$constants.BIURL + '/education/exam/subject/type/list',
                method: 'get',
                params:{
                    current:1,
                    size:100
                }
            }).then(function (response) {
                var data = response.data;
                if(data.data.records){
                    self.examTypes = data.data.records;
                }
            })
        },
        saveExamSubject:function(name){
            var self = this;
            if(self.examSubjectForm.subjectTypeId == '' || self.examSubjectForm.subjectTypeId ==null) {
                this.$Message.error('请选择分类!');
                return;
            }
            self.examSubjectForm.startTime = self.$convertDate(self.examSubjectForm.startTime);
            self.examSubjectForm.endTime = self.$convertDate(self.examSubjectForm.endTime);
            var url = self.$constants.BIURL+'/education/exam/subject';
            var method = 'POST';
            if(self.isUpdate){
                method='PUT';
            }
            self.$http({
                url:url,
                method:method,
                dataType:'json',
                data:self.examSubjectForm
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
                        self.hideExamModel(name);
                        self.loadExamSubject();
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
               
        },
        deleteUser:function(index){
            var self = this;
            const data = this.examSubjectDatas[index];
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
                url:self.$constants.BIURL+'/education/exam/subject/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadExamSubject();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        hideExamModel:function(name){
            this.$refs[name].resetFields();
            this.examSubjectModal = false;
            this.examSubjectForm.subjectTypeId = null;
        }
    },
    mounted:function(){
        this.loadAllExamType();
        this.loadExamSubject();
    }
}
</script>
