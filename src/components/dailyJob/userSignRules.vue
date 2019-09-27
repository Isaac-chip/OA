<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem >日常工作</BreadcrumbItem>
            <BreadcrumbItem >考勤规则</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
             <Row class="header">
                <Col  span="2"><Button @click="showRulesEdition">新增</Button></Col>
                <Col  span="7">
                    <Input v-model="params.deptName" search enter-button @on-search="onSeach" placeholder="输入组织名称查找" />
                </Col>
            </Row>
             <Table border ref="selection" :columns="userSignRuleCloumns" :data="userSignRuleDatas">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="updateRule(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deleteRules(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="params.size" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>

            <Modal  v-model="apkModal" title="考勤规则" :footer-hide="true" :mask-closable="false">
                <Form ref="rulsForm" :model="rulsForm" :rules="rulsFormRuleValidate" :label-width="110" >
                    <FormItem label="所属组织">
                        <treeselect
                            :multiple="true"
                            v-model="departmentId"
                            :options="departments"
                            :max-height="200"
                            @select="orgSelect"
                            @deselect="unOrgSelect"
                            noResultsText="没有找到匹配结果"
                            placeholder="请选择组织..." />
                    </FormItem>
                    <Row>
                        <Col span="12">
                            <FormItem label="上班时间(上午)" prop="amOnTimeStr">
                                <TimePicker format="HH:mm" placeholder="选择时间" v-model="rulsForm.amOnTimeStr"></TimePicker>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="下班时间(上午)" prop="amOffTimeStr">
                                <TimePicker format="HH:mm" placeholder="选择时间" v-model="rulsForm.amOffTimeStr"></TimePicker>
                            </FormItem>
                        </Col>
                    </Row>
                     <Row>
                        <Col span="12">
                            <FormItem label="上班时间(下午)" prop="pmOnTimeStr">
                                <TimePicker format="HH:mm" placeholder="选择时间" v-model="rulsForm.pmOnTimeStr"></TimePicker>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="下班时间(下午)" prop="pmOffTimeStr">
                                <TimePicker format="HH:mm" placeholder="选择时间" v-model="rulsForm.pmOffTimeStr"></TimePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="备注">
                         <Input v-model="rulsForm.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入备注..." />
                    </FormItem>
                     <Row>
                        <div style="text-align:center">
                            <Button type="primary" @click="addRuleEdition('rulsForm')">提交</Button>
                            <Button style="margin-left: 8px" @click="hideUserModel('rulsForm')">关闭</Button>
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

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    components: { Treeselect },
    data () {
        return {
            dataCount:0,
            // 每页显示多少条
            pageSize:15,
            deptId:null,
            apkModal:false,
            fileServer:null,
            isUpdate:false,
            uploadHeaders:{},
            params:{
                size:15,
                current:1,
                deptName:''
            },
            rulsForm:{
                amOnTimeStr:'',
                amOffTimeStr:'',
                pmOnTimeStr:'',
                pmOffTimeStr:'',
                departments:'',
                tenantId:''
            },
            arrIds:[],
            departmentId:null,
            rulsFormRuleValidate:{
                amOnTimeStr:[
                   { required: true, message: '上午上班时间不能为空', trigger: 'change' }
                ],
                amOffTimeStr:[
                   { required: true, message: '上午下班时间不能为空', trigger: 'change' }
                ],
                pmOnTimeStr:[
                   { required: true, message: '下午上班时间不能为空', trigger: 'change' }
                ],
                pmOffTimeStr:[
                   { required: true, message: '下午下班时间不能为空', trigger: 'change' }
                ]
            },
            userSignRuleCloumns:[
                {
                    key: 'index',
                    width: 70,
                    title:'序号',
                    align: 'center'
                },{
                    title: '所属组织',
                    key: 'deptName',
                    width:'220'
                },{
                    title: '上班时间(上午)',
                    key: 'amOnTime'
                },{
                    title: '下班时间(上午)',
                    key: 'amOffTime'
                },{
                    title: '上班时间(下午)',
                    key: 'pmOnTime'
                },{
                    title: '下班时间(下午)',
                    key: 'pmOffTime'
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
            userSignRuleDatas:[],
            departments:[]
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadSignRuls();
        },
        changepage:function(value){
            this.params.current = value;
            this.loadSignRuls();
        },
        onChangePageSize:function(value){
            this.params.size = value;
            this.loadSignRuls();
        },
        orgSelect:function(node){
            this.arrIds.push(node.id);
            if(node.children){
                this.recursiveSubset(node.children,this.arrIds);
            }
            this.rulsForm.departments = this.arrIds.join(',');
           // this.rulsForm.departmentId = node.did;
        },
        recursiveSubset:function(children,arrIds){
            var self = this;
            if(children && children.length >0){
                children.forEach(element => {
                    arrIds.push(element.id);
                    if(element.children){
                        self.recursiveSubset(element,arrIds);
                    }
                })
            }
        },
        unOrgSelect:function(node){
            this.arrIds.splice(node.id,1);
        },
        showRulesEdition:function(){
            this.apkModal = true;
            this.isUpdate = false;
        },
        addRuleEdition:function(name){
            var self = this;
            self.$refs[name].validate((valid) => {
                if(valid){
                    if(self.rulsForm.departments == null || self.rulsForm.departments == ''){
                        this.$Message.error('请选择所属组织!');
                        return;
                    }
                
                    self.rulsForm.tenantId = self.$constants.userInfo.tenantId;
                    var url = self.$constants.BIURL+'/community/sign';
                    var method = 'POST';
                    if(self.isUpdate){
                        method = 'PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.rulsForm
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
                                self.apkModal = false;
                                self.loadSignRuls();
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
        hideUserModel:function(name){
            this.$refs[name].resetFields();
            this.apkModal = false;
        },
        loadSignRuls:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/community/sign/list',
                method:'GET',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.userSignRuleDatas = data.data.records;
                    self.dataCount = data.data.total;
                    self.userSignRuleDatas.forEach((item,index) => {
                        item["index"]= index + (self.params.current -1)*  self.params.size +1
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
        deleteRules:function(index){
            var self = this;
            const data = this.userSignRuleDatas[index];
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
        loadDepartment:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/department/list',
                method:'GET',
                params:{
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
                    self.departments = data;
                }
            }).catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        handleDelete:function(data){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/community/sign/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadSignRuls();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        updateRule:function(index){
            this.isUpdate = true;
            this.departmentId = [];
            this.rulsForm = Object.assign({}, this.userSignRuleDatas[index]);
            console.log(this.rulsForm);
            this.rulsForm.amOnTimeStr = this.rulsForm.amOnTime;
            this.rulsForm.amOffTimeStr = this.rulsForm.amOffTime;
            this.rulsForm.pmOnTimeStr = this.rulsForm.pmOnTime;
            this.rulsForm.pmOffTimeStr = this.rulsForm.pmOffTime;
            this.rulsForm.departments = this.rulsForm.departmentId;
            this.departmentId.push(this.rulsForm.departmentId);
            this.apkModal = true;
        }
    },
    mounted:function(){
        this.loadSignRuls();
        this.loadDepartment();
    }
}
</script>
