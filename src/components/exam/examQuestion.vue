<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
             <BreadcrumbItem>学习教育</BreadcrumbItem>
            <BreadcrumbItem>知识竞赛</BreadcrumbItem>
            <BreadcrumbItem>试题管理</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
             <Row class="header">
               <Form :label-width="100">
                   <Col span="2">
                        <Button @click="showUserModal" icon="md-add">新增</Button>
                   </Col>
                   <Col span="8">
                        <FormItem label="试卷:">
                            <Select v-model="subjectId">
                                <Option  v-for="item in examSubjectDatas" :value="item.id" :key="item.id">{{ item.subject }}</Option>
                            </Select>
                        </FormItem>
                   </Col>
                   <Col span="8">
                        <FormItem label="试题名称:">
                        <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入试卷名称" />
                    </FormItem>
                   </Col>
               </Form>
            </Row>
            <Table border ref="examSubject" :columns="examQuestionCloumns" :data="examQuestionDatas" :min-height="200">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="update(index)">修改</Button>
                    <Button size="small" @click="remove(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal v-model="examQuestionModal" title="新增试题" :footer-hide="true" :mask-closable="false" class="userFrom">
                <Form ref="examQuestionForm" :model="examQuestionForm" :rules="examRuleValidate" :label-width="110"  >
                    <FormItem label="所属试卷">
                        <Select v-model="examQuestionForm.subjectId">
                            <Option  v-for="(item,index) in examSubjectDatas" :value="item.id" :key="index">{{ item.subject}}</Option>
                        </Select>
                    </FormItem>
                     <FormItem label="试题内容" prop="question">
                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="examQuestionForm.question" placeholder="请输入试题内容" />
                    </FormItem>
                     <FormItem label="试题分值" prop="score">
                        <Input v-model="examQuestionForm.score" placeholder="请输入基础分值" />
                    </FormItem>
                    <div class="questionHeader">
                        <div>试题选项</div>
                        <div> <Button shape="circle" icon="md-add" @click="addOptions"></Button></div>
                    </div>
                    <div class="questionContent">
                        <div class="question" >
                            <div class="w-10"></div>
                            <div class="w-20">选号</div>
                            <div class="w-40">选项内容</div>
                            <div class="w-20 center">答案</div>
                            <div class="w-20 center">操作</div>
                        </div>
                        <div class="question" v-for="(item,index) in examQuestionOptions" :key="index">
                            <div class="w-10"></div>
                            <div class="w-20">{{item.answer}}</div>
                            <div class="w-40"><Input size="small" v-model="item.memo"></Input></div>
                            <div class="w-20 center"><Checkbox  v-model="item.isRight"></Checkbox></div>
                            <div class="w-20 center"><Icon type="md-close" @click="removeOptions(index)" /></div>
                        </div>
                    </div>
                
                     <FormItem label="备注">
                         <Input v-model="examQuestionForm.memo" type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder=""></Input>
                    </FormItem>
                    <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="saveExamQuestion('examQuestionForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideExamModel('examQuestionForm')">关闭</Button>
                        </div>
                    </Row>
                </Form>
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
.questionHeader{
    position: relative;
    display: -webkit-flex;
    display: flex;
    justify-content:space-between;
    border-bottom: 1px solid #E3E3E3;
    padding: 5px;
    margin-left: 30px;
    margin-bottom: 10px;
}

.w-10{
    width: 10%;
}
.w-20{
    width: 20%;
}

.w-40{
    width: 40%;
}

.center{
    text-align: center;
}
.question{
    position: relative;
    display: -webkit-flex;
    display: flex;
    justify-content:space-around;
    padding: 5px;
}
.questionContent{
    position: relative;
    margin-bottom: 20px;
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
            examQuestionModal:false,
            isUpdate:false,
            subjectId:-1,
            queryStr:'',
            examSubjectDatas:[],
            examQuestionCloumns:[{
                type: 'index',
                width: 70,
                title:'序号',
                align: 'center'
            },{
                title: '试题内容',
                key: 'question',
                width:'380'
            },{
                title: '所属试卷',
                key: 'subject'
            },{
                 title: '分值',
                key: 'score',
                width:'70'
            },{
                 title: '创建时间',
                key: 'createdDate'
            },{
                title: '操作',
                slot: 'action',
                width: 140,
                align: 'center'
            }],
            examQuestionDatas:[],
            examQuestionOptions:[],
            examIndexs:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            examQuestionForm:{
                subjectId:'',
                question:'',
                score:0,
                answers:'',
                memo:''
            },
            examRuleValidate:{
                question:[
                    { required: true, message: '试题内容不能为空', trigger: 'blur' }
                ],
                score:[
                    { required: true, message: '基础分值不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadExamQuestion();
        },
        changepage:function(value){
            this.current = value;
            this.loadExamQuestion();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadExamQuestion();
        },
        showUserModal:function(){
            this.clearData();
            this.examQuestionModal = true;
            this.isUpdate = false;
        },
        clearData:function(){
            this.examQuestionForm = {
                subjectId:'',
                question:'',
                score:0,
                answers:'',
                memo:''
            }
        },
        update:function(index){
            const data = this.examQuestionDatas[index];
            this.loadAnswer(data.id);
            this.examQuestionForm = Object.assign({}, data);
            this.examQuestionModal = true;
        },
        addOptions:function(){
            var length = this.examQuestionOptions.length;
            var answer = this.examIndexs[length];
            var option = {
                answer:answer,
                memo:'',
                isRight:0
            }
            this.examQuestionOptions.push(option);
        },
        removeOptions:function(index){
            this.examQuestionOptions.splice(index, 1);
            for(let i=0; i<this.examQuestionOptions.length;i++){
                this.examQuestionOptions[i].answer = this.examIndexs[i];
            }
        },
        loadExamQuestion:function(){
            var self = this;
            self.$http({
            url:self.$constants.BIURL+'/education/exam/question/list',
            method:'GET',
            params:{
                current:self.current,
                size:self.pageSize,
                subjectId:self.subjectId,
                question:self.queryStr
            }
            }) .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.examQuestionDatas = data.data.records;
                    self.dataCount = data.data.total;
                }
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        loadAnswer:function(questionId){
            var self = this
            self.$http({
                url: self.$constants.BIURL + '/education/exam/answer/findAnswerByQuestionId',
                method: 'get',
                params:{
                    questionId:questionId
                }
            }).then(function (response) {
                var data = response.data;
                console.log(data);
                self.examQuestionOptions = data.data;
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                })
            })
        },
        loadAllExamSubject:function(){
            var self = this
            self.$http({
                url: self.$constants.BIURL + '/education/exam/subject/list',
                method: 'get',
                params:{
                    current:1,
                    size:100,
                    subJect:'',
                    type:''
                }
            }).then(function (response) {
                var data = response.data;
                 self.examSubjectDatas = data.data.records;
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                })
            })
        },
        saveExamQuestion:function(name){
            var self = this;
            if(self.examQuestionOptions.length == 0) {
                this.$Message.error('试题选项不能为空!');
                return;
            }
            self.examQuestionForm.answers = JSON.stringify(self.examQuestionOptions);
            var url = self.$constants.BIURL+'/education/exam/question';
            var method = 'POST';
            if(self.isUpdate){
                method='PUT';
            }
            self.$http({
                url:url,
                method:method,
                dataType:'json',
                data:self.examQuestionForm
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
                        self.loadExamQuestion();
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
        remove:function(index){
            var self = this;
            const data = this.examQuestionDatas[index];
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
                url:self.$constants.BIURL+'/education/exam/question/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadExamQuestion();
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
            this.examQuestionModal = false;
            this.examQuestionOptions = [];
        }
    },
    mounted:function(){
        this.loadExamQuestion();
        this.loadAllExamSubject();
    }
}
</script>
