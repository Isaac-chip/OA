<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem>党务管理</BreadcrumbItem>
      <BreadcrumbItem to="/partyIn/partyInTable">党员管理</BreadcrumbItem>
      <BreadcrumbItem>{{partyUserTitle}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="bi-container">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Form class="partyUserForm" ref="partyUserForm" :model="partyUserForm" :rules="partyUserFormValidate" :label-width="120">
            <Divider orientation="left">基本信息</Divider>
            <Row>
                <Col span="8">
                    <FormItem label="用户名" prop="loginName">
                        <Input :disabled="isUpdate" v-model="partyUserForm.loginName" placeholder="请输入用户名" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="姓名" prop="userName">
                        <Input v-model="partyUserForm.userName" placeholder="请输入姓名" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="登录密码"  prop="loginPwd">
                        <Input type="password" :disabled="isUpdate" v-model="partyUserForm.loginPwd" placeholder="请输入登录密码" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="所属组织" >
                        <treeselect 
                            v-model="partyUserForm.deptId"
                            :options="departments"
                            :max-height="200"
                            @select="orgSelect"
                            noResultsText="没有找到匹配结果"
                            placeholder="请选择所属组织..." />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="岗位" >
                        <Input v-model="partyUserForm.postName" placeholder="请输入岗位" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="手机号码" prop="mobilePhone" >
                        <Input v-model="partyUserForm.mobilePhone" placeholder="请输入手机号码" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="性别" prop="sex">
                        <Select v-model="partyUserForm.sex" placeholder="请选择性别"  >
                            <Option value="0">男</Option>
                            <Option value="1">女</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="政治面貌" prop="politics" >
                        <Select v-model="partyUserForm.politics" placeholder="请选择政治面貌"  >
                            <Option value="1">中共党员</Option>
                            <Option value="2">中共预备党员</Option>
                            <Option value="3">入党积极分子</Option>
                            <Option value="4">共青团员</Option>
                            <Option value="5">民革党员</Option>
                            <Option value="6">民盟盟员</Option>
                            <Option value="7">民建会员</Option>
                            <Option value="8">民进会员</Option>
                            <Option value="9">农工党党员</Option>
                            <Option value="10">致公党党员</Option>
                            <Option value="11">九三学社社员</Option>
                            <Option value="12">台盟盟员</Option>
                            <Option value="13">无党派人士</Option>
                            <Option value="14">群众</Option>
                            <Option value="15">其他</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="职务" >
                        <Input v-model="partyUserForm.officerName" placeholder="请输入职务" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="民族" prop="minority">
                        <Select placeholder="请选择民族" v-model="partyUserForm.minority" >
                            <Option v-for="item in minoritys" :key="item.value" :value="item.name">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="人员分类" >
                        <Select v-model="partyUserForm.ryfl" placeholder="请选择人员分类"  >
                            <Option value="1">国家机关负责人</Option>
                            <Option value="2">党政机关工作人员</Option>
                            <Option value="3">企业负责人</Option>
                            <Option value="4">事业单位负责人</Option>
                            <Option value="5">专业技术人员</Option>
                            <Option value="6">办事人员和有关人员</Option>
                            <Option value="7">商业、服务业人员 </Option>
                            <Option value="8">农业生产人员</Option>
                            <Option value="9">林业生产人员</Option>
                            <Option value="10">畜牧业生产人员</Option>
                            <Option value="11">渔业生产人员</Option>
                            <Option value="12">水利业生产人员</Option>
                            <Option value="13">生产、运输设备操作人员及有关人员</Option>
                            <Option value="14">军人</Option>
                            <Option value="15">其他从业人员</Option>
                            <Option value="16">聘用人员</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="人员编制" >
                        <Select v-model="partyUserForm.rybz" placeholder="请选择人员编制">
                            <Option value="1">公务员</Option>
                            <Option value="2">参照公务员</Option>
                            <Option value="3">行政编制</Option>
                            <Option value="4">全额拨款事业编制</Option>
                            <Option value="5">差额拨款事业编制</Option>
                            <Option value="6">聘用</Option>
                            <Option value="7">其它</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Divider orientation="left">详细信息</Divider>
            <Row>
                <Col span="8">
                    <FormItem label="职业分类">
                        <Select v-model="partyUserForm.zyfl" placeholder="请选择职业分类"  >
                            <Option value="1">工人</Option>
                            <Option value="2">农民</Option>
                            <Option value="3">教师</Option>
                            <Option value="4">学生</Option>
                            <Option value="5">公务员</Option>
                            <Option value="6">军人</Option>
                            <Option value="7">其他</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="在职状态" >
                        <Select v-model="partyUserForm.zzzt" placeholder="请选择在职状态"  >
                            <Option value="1">在职</Option>
                            <Option value="2">停职</Option>
                            <Option value="3">离职</Option>
                            <Option value="4">退休</Option>
                            <Option value="5">试用期</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="行政职务" >
                        <Select v-model="partyUserForm.xzzw"  placeholder="请选择行政职务">		
                            <Option value="1">厅局级正职</Option>
                            <Option value="2">厅局级副职</Option>
                            <Option value="3">县处级正职</Option>
                            <Option value="4">县处级副职</Option>
                            <Option value="5">乡科级正职</Option>
                            <Option value="6">乡科级副职</Option>
                            <Option value="7">科员</Option>
                            <Option value="8">办事员</Option>
                            <Option value="9">其它</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="职务级别" prop="zwjb">
                        <Select v-model="partyUserForm.zwjb" placeholder="请选择职务级别"  >
							<Option value="-999">请选择职务级别</Option>
                            <Option value="1">正市</Option>
                            <Option value="2">副市</Option>
                            <Option value="3">正区</Option>
                            <Option value="4">副区</Option>
                            <Option value="5">正县</Option>
                            <Option value="6">副县</Option>
                            <Option value="7">正局</Option>
                            <Option value="8">副局</Option>
                            <Option value="9">正处</Option>
                            <Option value="10">副处</Option>
                            <Option value="11">正科</Option>
                            <Option value="12">副科</Option>
                            <Option value="13">科员</Option>
                            <Option value="14">无</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                     <FormItem label="学历学位" prop="educat">
                        <Select v-model="partyUserForm.educat" placeholder="请选择学历学位" style="z-index:9999" >
                            <Option value="博士后">博士后</Option>
                            <Option value="博士">博士</Option>
                            <Option value="硕士">硕士</Option>
                            <Option value="本科">本科</Option>
                            <Option value="大专">大专</Option>
                            <Option value="中专">中专</Option>
                            <Option value="高中">高中</Option>
                            <Option value="初中">初中</Option>
                            <Option value="其它">其它</Option>
                        </Select>
                        </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="婚姻状况" >
                        <Select v-model="partyUserForm.marital" placeholder="请选择婚姻状况">
                            <Option value="1">已婚</Option>
                            <Option value="2">未婚</Option>
                            <Option value="3">离异</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="出生日期" prop="birthday">
                        <DatePicker type="date" placeholder="出生日期" v-model="partyUserForm.birthday" ></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="参加工作时间" prop="workTime" >
                        <DatePicker type="date" placeholder="参加工作时间" v-model="partyUserForm.workTime" ></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="入党时间" prop="partyTime" >
                        <DatePicker type="date" placeholder="入党时间" v-model="partyUserForm.partyTime" ></DatePicker>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <FormItem label="身份证" prop="cardNo">
                        <Input v-model="partyUserForm.cardNo" placeholder="请输入身份证号码" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="电子邮箱" >
                        <Input v-model="partyUserForm.email" placeholder="请输入电子邮箱" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="用户状态" prop="state">
                        <Select v-model="partyUserForm.state" placeholder="请选择用户状态"  >
                            <Option value="0">启用</Option>
                            <Option value="1">停用</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="家庭住址" >
                    <Input v-model="partyUserForm.address" placeholder="请输入家庭住址" />
                </FormItem>
            </Row>
             <FormItem class="btn">
              <Button type="primary" @click="handleSubmit('partyUserForm')">保存</Button>
              <Button @click="backUp('partyUserForm')" style="margin-left: 8px">返回</Button>
            </FormItem>
        </Form>
    </div>
   </div>
</template>
<style>
 .btn {
    padding: 10px 0px;
    text-align: center
  }
</style>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import minoritys from '@/minority.js'

import Base64  from "js-base64/base64.js";
import CryptoJS from "crypto-js/crypto-js.js";

export default {
    components: { Treeselect },
    data () {
        return {
            isUpdate:false,
            minoritys:minoritys,
            departments:[],
            partyUserTitle:'新增党员',
            spinShow:false,
            partyUserForm:{
                loginName:'',
                loginPwd:'',
                userName:'',
                mobilePhone:'',
                deptId:null,
                deptName:'',
                postName:'',
                politics:'',
                officerName:'',
                minority:'',
                deptCode:'',
                sex:'',
                rybz:'',
                ryfl:'',
                zyfl:'',
                zzzt:'',
                xzzw:'',
                zwjb:'',
                educat:'',
                marital:'',
                birthday:'',
                workTime:'',
                partyTime:'',
                cardNo:'',
                email:'',
                state:'0',
                address:''
            },
            partyUserFormValidate:{
                loginName:[
                    {required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                loginPwd:[
                    {required: true, message: '登录密码不能为空', trigger: 'blur' }
                ],
                userName:[
                    {required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                mobilePhone:[
                    {required: true, message: '手机号码不能为空', trigger: 'blur' },
                    {pattern: /^1[3456789]\d{9}$/, message: '电话格式不正确', trigger: 'blur'}
                ],
                politics:[
                    {required: true, message: '政治面貌不能为空', trigger: 'change' }
                ],
                sex:[
                    {required: true, message: '性别不能为空', trigger: 'change' }
                ],
                minority:[
                    {required: true, message: '请选择民族', trigger: 'change' }
                ],
                educat:[
                    {required: true, message: '学历不能为空', trigger: 'change' }
                ],
                birthday:[
                    {required: true,type:'date', message: '出生日期不能为空', trigger: 'change' }
                ],
                partyTime:[
                    {required: true,type:'date', message: '入党时间不能为空', trigger: 'change' }
                ],
                workTime:[
                    {required: true,type:'date', message: '参加工作时间不能为空', trigger: 'change' }
                ],
                cardNo:[
                     {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码格式不正确', trigger: 'blur'},
                    {required: true, message: '身份证号码不能为空', trigger: 'blur' }
                ],
                state:[
                    {required: true, message: '用户状态不能为空', trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        getAesString:function(word,_key){//加密
            var key = CryptoJS.enc.Utf8.parse(_key);  //十六位十六进制数作为密钥
            var iv = CryptoJS.enc.Utf8.parse(_key); 
            let srcs = CryptoJS.enc.Utf8.parse(word);
            let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
            return encrypted.toString();//返回的是base64格式的密文
        },
         orgSelect:function(node){
            this.partyUserForm.deptId = node.did;
            this.partyUserForm.deptName = node.title;
            this.partyUserForm.deptCode = node.deptCode;
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
                    if(self.isUpdate){
                        self.partyUserForm.deptId =  self.partyUserForm.deptId;
                    }
                }
            }).catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        loadPartyUserById:function(id){
            this.isUpdate = true;
            var self = this;
            self.spinShow = true;
            this.$http({
                url:this.$constants.BIURL+'/political/user/'+id,
                method:"GET",
                dataType:'json'
            }).then(function (response) {
                self.spinShow = false;
                self.partyUserForm = response.data.data;
                self.partyUserForm.sex = self.partyUserForm.sex +'';
                console.log(self.partyUserForm);
            });
        },
        handleSubmit:function(name){
            var self = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    self.partyUserForm.tenantId = self.$constants.userInfo.tenantId;
                    self.partyUserForm.birthday = self.$convertDate(self.partyUserForm.birthday);
                    self.partyUserForm.partyTime = self.$convertDate(self.partyUserForm.partyTime);
                    self.partyUserForm.workTime = self.$convertDate(self.partyUserForm.workTime);
                    //加密密码
                    if(!self.isUpdate){
                        self.partyUserForm.loginPwd = self.getAesString(self.partyUserForm.loginPwd,self.$constants.decryptAESCode);
                    }
                    var url = self.$constants.BIURL+'/political/user';
                    var method = 'POST';
                    if(self.partyUserForm.uid > 0){
                        method='PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.partyUserForm
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
                                if(self.isUpdate){
                                    self.$Message.success({
                                        content: '数据修改成功!',
                                        duration: 2
                                    });
                                }else{
                                    self.$refs[name].resetFields();
                                    self.$Message.success({
                                        content: '数据添加成功!',
                                        duration: 2
                                    });
                                }
                                self.backUp();
                            }
                        
                        }
                    }) .catch(function (error) {
                        self.$Message.error({
                            content: error.message,
                            duration: 2
                        });
                        console.log(error);
                    });
                
                } else {
                    this.$Message.error('表单校验失败，请输入必填项!');
                }
            })
        },
        backUp:function(){
            this.$router.push({
                'name': 'partyUserTable',
                'path': '/system/partyUserTable'
            })
        }
    },
    mounted:function(){
        var id = this.$route.query.id;
        console.log("党员："+id);
        if(id && id>0){
            this.partyUserForm.uId = id;
            console.log(this.partyUserForm.uId );
            this.partyUserTitle = '修改党员';
            this.loadPartyUserById(id);
        }
        this.loadDepartment();
    }
}
</script>

