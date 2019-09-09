<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem >日常工作</BreadcrumbItem>
            <BreadcrumbItem >会议通知</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
              <Row class="header">
                <Col  span="2"><Button @click="showMeetingModal">新增</Button></Col>
                <Col  span="7">
                    <Input v-model="params.query" search enter-button @on-search="onSeach" placeholder="输入会议名称搜索" />
                </Col>
            </Row>
             <Table border ref="selection" :columns="meetingCloumns" :data="meetingDatas">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="deleteUserSign(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="params.pageSize" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Modal  v-model="meetingModal" title="会议通知" :footer-hide="true" :mask-closable="false" width="600px">
            <Form ref="meetingForm" :model="meetingForm" :rules="meetingFormRuleValidate" :label-width="80" >
                <FormItem label="会议标题" prop="meetingTitle">
                    <Input  placeholder="请输入会议标题" v-model="meetingForm.meetingTitle" />
                </FormItem>
                <FormItem label="会议时间" prop="meetingTime">
                    <DatePicker type="datetime" placeholder="会议时间" v-model="meetingForm.meetingTime"  ></DatePicker>
                </FormItem>
                <FormItem label="会议内容" prop="meetingContent">
                    <Input v-model="meetingForm.meetingContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入会议内容" />
                </FormItem>
                <Divider>参会者</Divider>
                    <select-user></select-user>
                <Row>
                    <div style="text-align:center">
                        <Button type="primary" @click="addMeeting('meetingForm')">提交</Button>
                        <Button style="margin-left: 8px" @click="hideMeetingModel('meetingForm')">关闭</Button>
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
</style>

<script> 

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import SelectUser from '../public/selectUser'

export default {
    components: { Treeselect,SelectUser },
    data () {
        return {
            dataCount:0,
            // 每页显示多少条
            params:{
                size:15,
                current:1,
                query:''
            },
            meetingModal:false,
            meetingCloumns:[
                {
                    type: 'index',
                    width: 70,
                    title:'序号',
                    align: 'center'
                },{
                    title: '会议标题',
                    key: 'meetingTitle'
                },{
                    title: '会议内容',
                    key: 'meetingContent',
                    width:'200'
                },{
                    title: '开始时间',
                    key: 'meetingTime'
                },{
                    title: '创建人',
                    key: 'userName'
                },{
                    title: '参与者',
                    key: 'meetingMembers',
                    render:(h,param) =>{
                        var meetingMembers = param.row.meetingMembers;
                        if(meetingMembers && meetingMembers.length>0){
                            var names = [];
                            meetingMembers.forEach(element => {
                               names.push(element.userName);
                            });
                            return h('Poptip',{
                                props:{
                                    content:names.join(',')
                                },
                                style:{
                                    textAlign:'center'
                                }
                            },[h('a',{
                                props:{
                                    type:'nonal'
                                }},'点击查看')])
                        }else{
                            return h('span','');
                        }
                    }
                },{
                    title: '会议状态',
                    key: 'meetingState',
                    render:(h,param) =>{
                        var type = param.row.meetingState;
                        var text = '未开始';
                        switch(type){
                            case 1:
                                text = '未开始';
                                break;
                            case 2:
                                text = '进行中';
                                break;
                            case 3:
                                text = '已完成';
                                break;
                        }

                        return h('span',text);
                    }
                },{
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            meetingDatas:[],
            meetingForm:{
                meetingTitle:'',
                meetingContent:'',
                meetingTime:'',
                meetingActors:''
            },
            meetingFormRuleValidate:{
                meetingTitle :[
                    {required: true, message: '会议标题不能为空', trigger: 'blur'}
                ],
                 meetingTime :[
                    {required: true,type:'date', message: '会议时间不能为空', trigger: 'change'}
                ],
                 meetingContent :[
                    {required: true, message: '会议内容不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        onSeach:function(){
            this.params.current = 1;
            this.loadMeetingNotice();
        },
        changepage:function(value){
            this.params.size = value;
            this.loadMeetingNotice();
        },
        onChangePageSize:function(value){
            this.params.size = value;
            this.loadMeetingNotice();
        },
        showMeetingModal:function(){
            this.meetingModal = true;
        },
        loadMeetingNotice:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/meeting/notice/list',
                method:'GET',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.meetingDatas = data.data.records;
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
        deleteUserSign:function(index){
            var self = this;
            const data = this.mettingDatas[index];
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
                url:self.$constants.BIURL+'/meeting/notice/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadUserSign();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        addMeeting:function(name){

        },
        hideMeetingModel:function(name){
            this.meetingModal = false;
            this.$refs[name].resetFields();
        }
    },
    mounted:function(){
        this.loadMeetingNotice();
    }
}
</script>
