<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem>党建业务</BreadcrumbItem>
      <BreadcrumbItem to="/partyIn/partyInTable">发展党员</BreadcrumbItem>
      <BreadcrumbItem>新增、修改</BreadcrumbItem>
    </Breadcrumb>
    <div class="bi-container">
      <Steps :current="currentIndex">
        <Step :title="step1Title" content="申请入党"></Step>
        <Step :title="step2Title" content="入党积极分子的确定和培养教育"></Step>
        <Step :title="step3Title" content="发展对象的确定和考察"></Step>
        <Step :title="step4Title" content="预备党员的接收阶段"></Step>
        <Step :title="step5Title" content="预备党员的转正"></Step>
      </Steps>
      <div class="partyInOne" v-show="partyInOneShow">
          <Form class="partyForm" ref="partInOneForm" :model="partInOneForm" :rules="partInOneFormruleValidate" :label-width="120">
            <Divider orientation="left">基本信息</Divider>
            <Row>
              <Col span="8">
                <FormItem label="姓名" prop="userName">
                  <Input :disabled="partyOneDisabled" v-model="partInOneForm.userName" placeholder="请输入姓名" />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="性别" prop="sex">
                  <Select v-model="partInOneForm.sex" placeholder="请选择性别" :disabled="partyOneDisabled" >
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="民族" prop="minority">
                  <Select placeholder="请选择民族" v-model="partInOneForm.minority" :disabled="partyOneDisabled">
                    <Option v-for="item in minoritys" :key="item.value" :value="item.name">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem prop="birthday" label="出生日期">
                  <DatePicker format="yyyy-MM-dd" :disabled="partyOneDisabled" type="date" placeholder="出生日期" v-model="partInOneForm.birthday"></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="学历学位" prop="educat">
                  <Select v-model="partInOneForm.educat" placeholder="请选择学历学位" style="z-index:9999" :disabled="partyOneDisabled" >
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
                <FormItem prop="birthPlace" label="籍贯">
                  <Input v-model="partInOneForm.birthPlace" placeholder="请输入籍贯" :disabled="partyOneDisabled" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="身份证号码" prop="cardNo">
                  <Input v-model="partInOneForm.cardNo" placeholder="请输入身份证号码" :disabled="partyOneDisabled"/>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="职务或职业" prop="vocation">
                  <Input v-model="partInOneForm.vocation" placeholder="请输入单位、职务或职业" :disabled="partyOneDisabled"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="联系电话" prop="phoneNo">
                  <Input v-model="partInOneForm.phoneNo" placeholder="请输入联系电话" :disabled="partyOneDisabled" />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="firstDay" label="入党申请时间">
                  <DatePicker type="date" placeholder="入党申请时间" v-model="partInOneForm.firstDay" :disabled="partyOneDisabled"></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="支部派人谈话时间" prop="talkDay">
                  <DatePicker type="date" placeholder="支部派人谈话时间" v-model="partInOneForm.talkDay" :disabled="partyOneDisabled"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="入党申请书接收人" prop="receiver">
                  <Input v-model="partInOneForm.receiver" placeholder="请输入接收人（单位、职务、签名）" :disabled="partyOneDisabled" />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="谈话人:" prop="talkUser" >
                  <Input v-model="partInOneForm.talkUser" placeholder="请输入谈话人:（单位、职务、签名）" :disabled="partyOneDisabled" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="16">
                <FormItem label="家庭详细住址" prop="address">
                  <Input v-model="partInOneForm.address" placeholder="请输入家庭详细住址" :disabled="partyOneDisabled" />
                </FormItem>
              </Col>
            </Row>
            <Divider orientation="left">此阶段须准备的材料:(所需材料必须确认全部完成才能进入下一阶段)</Divider>
            <Row>
              <div style="padding-bottom:6px;margin-bottom:6px;">
                  <Checkbox
                      :indeterminate="indeterminate"
                      :value="checkAll"
                      :disabled="partyOneDisabled"
                      @click.prevent.native="handleCheckAll">全选</Checkbox>
              </div>
              <CheckboxGroup v-model="checkAllGroup">
                <Checkbox :disabled="partyOneDisabled" label="1">1.入党申请书<a href="">(见参考例文1-1)</a></Checkbox>
                <Checkbox :disabled="partyOneDisabled" label="2">2.党组织派人谈话的记录材料<a href="">(见参考例文1-2)</a></Checkbox>
              </CheckboxGroup>
            </Row>
            <FormItem class="btn">
              <Button type="primary" @click="handleSubmit('partInOneForm')" :disabled="partyOneDisabled">提交</Button>
              <Button @click="handleReset('partInOneForm')" style="margin-left: 8px" :disabled="partyOneDisabled">重置</Button>
              <Button @click="nextToTwo(partInOneForm)" style="margin-left: 8px" >下一步</Button>
            </FormItem>
          </Form>
      </div>

      <div class="partyInTwo" v-show="partyInTwoViewShow">
          <partyInTwo
            :prevToOne="prevToOne"
            :twoNextToThree="twoNextToThree"
            :partyTwoDisabled="partyTwoDisabled"
            :currentState="currentState"
            :firstDay="firstDay"
          ></partyInTwo>
      </div>

      <div class="partyInThree" v-show="partyInThreeViewShow">
          <partyInThree
              :prevToTwo="prevToTwo"
              :threeNextToFour="threeNextToFour"
              :partyThreeDisabled="partyThreeDisabled"
              :currentState="currentState"
              :partyDay="partyDay"
          ></partyInThree>
      </div>

       <div class="partyInFour" v-show="partyInFourViewShow">
          <partyInFour
            :prevToThree="prevToThree"
            :fourNextToFive="fourNextToFive"
            :partyFourDisabled="partyFourDisabled"
            :currentState="currentState"
          ></partyInFour>
      </div>

       <div class="partyInFive" v-show="partyInFiveViewShow">
          <partyInFive
            :prevToFour="prevToFour"
            :partyFiveDisabled="partyFiveDisabled"
            :currentState="currentState"
            :meetingDay="meetingDay"
          ></partyInFive>
      </div>
      
        <BackTop :height="100" :bottom="20" @on-click="backUp" style="display:block">
          <div class="top">返回发展党员</div>
      </BackTop>
    </div>
  </div>
</template>

<style scoped>

.top{
    padding: 10px;
    background:#f5a623;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    display: block !important;
}
  .partyIn {
    padding: 15px;
  }

  .partyForm {
    padding: 20px;
  }

  .partyTip {
    padding: 10px 5px;
  }

  .btn {
    padding: 10px 0px;
    text-align: center
  }
</style>


<script>
import PartyInTwo from '../partyIn/partyInTow'
import PartyInThree from '../partyIn/partyInThree'
import PartyInFour from '../partyIn/partyInFour'
import PartyInFive from '../partyIn/partyInFive'
import minoritys from '@/minority.js'
  export default {
    components: { PartyInTwo,PartyInThree,PartyInFour,PartyInFive},
    data () {
      return {
        mainId:-1,
        currentIndex:0,
        currentState:1,
        indeterminate:false,
        checkAll:false,
        checkAllGroup:[],
        firstDay:'',
        partyDay:'',
        meetingDay:'',
        step1Title:'进行中',
        step2Title:'未开始',
        step3Title:'未开始',
        step4Title:'未开始',
        step5Title:'未开始',
        minoritys:minoritys,
        partyOneDisabled:false,
        partyTwoDisabled:true,
        partyThreeDisabled:true,
        partyFourDisabled:true,
        partyFiveDisabled:true,
        partyInOneShow:true,
        partyInTwoViewShow:false,
        partyInThreeViewShow:false,
        partyInFourViewShow:false,
        partyInFiveViewShow:false,
        partInOneForm: {
          userName: '',
          sex: '',
          minority: '',
          birthday: '',
          educat: '',
          phoneNo: '',
          vocation: '',
          cardNo: '',
          address:'',
          birthPlace:'',
          firstDay:'',
          receiver:'',
          talkDay:'',
          talkUser:'',
          creator:'',
          creatorName:'',
          checkAll:'',
          memo:''
        },
        indeterminate: true,
        checkAll: false,
        partInOneFormruleValidate: {
          userName: [
            {required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          sex:[
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          minority:[
            {required: true, message: '请选择民族', trigger: 'change'}
          ],
          birthday:[
             { required: true, type: 'date', message: '出生日期不能为空', trigger: 'change'},
              {validator:(rule,value, callback, source, options) =>{
                  var nowday = new Date(), 
                  birthday = new Date(value), 
                  age = nowday.getFullYear() - birthday.getFullYear() - ((nowday.getMonth() < birthday.getMonth() || nowday.getMonth() == birthday.getMonth() && nowday.getDate() < birthday.getDate()) ? 1 : 0);
                  if(age < 18){
                    callback('');
                  }else{
                    callback();
                  }
                   
              },message:'申请入党需要年满十八周岁'}
          ],
          educat:[
             { required: true, message: '请选择学历学位', trigger: 'change' }
          ],
          birthPlace:[
            {required: true, message: '请输入籍贯', trigger: 'blur'}
          ],
          cardNo:[
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码格式不正确', trigger: 'blur'},
            {validator:(rule,value, callback, source, options) =>{
                  if(this.partInOneForm.birthday !=null || this.partInOneForm.birthday !='' ){
                    if(value.length == 18){
                        var birthday = this.$convertDate(this.partInOneForm.birthday);
                        birthday = birthday.split(' ');
                        birthday = birthday[0].split('-');
                        console.log(birthday);
                        var year = Number(birthday[0]);
                        var mon = Number(birthday[1]);
                        var day = Number(birthday[2]);
                        var re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/);
                        var arrSplit = value.match(re);
                        console.log(arrSplit);
                        var checkBir = (year == Number(arrSplit[2]))
                            && (mon == Number(arrSplit[3]))
                            && (day == Number(arrSplit[4]));
                        if (!checkBir) {
                          callback('');
                        }else{
                          callback();
                        }
                    }
                  }
              },message:'出生日期跟身份证不一致'}
          ],
          vocation:[
            {required: true, message: '请输入单位、职务或者职业', trigger: 'blur'}
          ],
          phoneNo:[
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            {pattern: /^1[3456789]\d{9}$/, message: '电话格式不正确', trigger: 'blur'}
          ],
          firstDay:[
             { required: true, type: 'date', message: '请选择申请入党时间', trigger: 'change' }
          ],
          talkDay:[
             { required: true, type: 'date', message: '请选择支部派人谈话时间', trigger: 'change' }
          ],
          receiver:[
             {required: true, message: '请输入入党申请书接收人', trigger: 'blur'}
          ],
          talkUser:[
             {required: true, message: '请输入谈话人', trigger: 'blur'}
          ],
          address:[
             {required: true, message: '请输入家庭详细住址', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      backUp:function(){
        this.$router.push({
            'name': 'partyInTable',
            'path': '/partyIn/partyInTable'
        })
      },
      handleCheckAll:function(){
          if (this.indeterminate) {
              this.checkAll = false;
          } else {
              this.checkAll = !this.checkAll;
          }
          this.indeterminate = false;

          if (this.checkAll) {
              this.checkAllGroup = ['1', '2'];
          } else {
              this.checkAllGroup = [];
          }
      },
      prevToOne:function(){
        this.partyInOneShow = true;
        this.partyInTwoViewShow = false;
        this.currentIndex = 0;
      },
      prevToTwo:function(){
         this.partyInTwoViewShow = true;
         this.partyInThreeViewShow = false;
        this.currentIndex = 1;
      },
      prevToThree:function(){
        this.partyInFourViewShow = false;
        this.partyInThreeViewShow = true;
        this.currentIndex = 2;
      },
      prevToFour:function(){
        this.partyInFiveViewShow = false;
        this.partyInFourViewShow = true;
        this.currentIndex = 3;
      },
      nextToTwo:function(oneForm){
        this.partyInOneShow = false;
        this.partyInTwoViewShow = true;
        this.currentIndex = 1;
        this.step1Title = '已完成';
        if(this.mainId > 0 && this.partInOneForm.currentState >= 1){
          if(oneForm.checkAll !=''){
              var _checkAll = oneForm.checkAll.split(',');
              if(_checkAll.length == 2){
                this.currentState = this.partInOneForm.currentState;
                this.firstDay =  this.$convertDate(this.partInOneForm.firstDay);
                this.partyTwoDisabled = false;
                this.step2Title = '进行中';
              }
          }
        }
      },
      twoNextToThree:function(twoForm){
        this.partyInTwoViewShow = false;
        this.partyInThreeViewShow = true;
        this.currentIndex = 2;
         if(this.mainId > 0 && this.partInOneForm.currentState >= 2){
           if(twoForm.checkAll !=''){
              var _checkAll = twoForm.checkAll.split(',');
              if(_checkAll.length == 9){
                this.currentState = this.partInOneForm.currentState;
                this.partyThreeDisabled = false;
                this.partyDay = twoForm.partyDay; 
                this.step1Title = '已完成';
                this.step2Title = '已完成';
                this.step3Title = '进行中';
              }
          }
         }
      },
      threeNextToFour:function(threeForm){
        this.partyInThreeViewShow = false;
        this.partyInFourViewShow = true;
        this.currentIndex = 3;
        
        if(this.mainId > 0 && this.partInOneForm.currentState >= 3){
           if(threeForm.checkAll !=''){
              var _checkAll = threeForm.checkAll.split(',');
              if(_checkAll.length == 12){
                this.currentState = this.partInOneForm.currentState;
                this.partyFourDisabled = false;
                this.step1Title = '已完成';
                this.step2Title = '已完成';
                this.step3Title = '已完成';
                this.step4Title = '进行中';
              }
          }
        }
      },
      fourNextToFive:function(fourForm){
        this.partyInFourViewShow = false;
        this.partyInFiveViewShow = true;
        this.currentIndex = 4;
       
        if(this.mainId > 0 && this.partInOneForm.currentState >= 4){
          console.log(fourForm.checkAll);
           if(fourForm.checkAll !=''){
              var _checkAll = fourForm.checkAll.split(',');
              if(_checkAll.length == 9){
                this.currentState = this.partInOneForm.currentState;
                this.partyFiveDisabled = false;
                this.meetingDay =fourForm.meetingDay; 
                this.step1Title = '已完成';
                this.step2Title = '已完成';
                this.step3Title = '已完成';
                this.step4Title = '已完成';
                this.step5Title = '进行中';
              }
          }
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          console.log(valid);
          var self = this;
          if (valid) {
             self.partInOneForm.tenantId = self.$constants.userInfo.tenantId;
             self.partInOneForm.creator = self.$constants.userInfo.userId;
             self.partInOneForm.creatorName = self.$constants.userInfo.name;
             self.partInOneForm.birthday = self.$convertDate(self.partInOneForm.birthday);
             self.partInOneForm.firstDay = self.$convertDate(self.partInOneForm.firstDay);
             self.partInOneForm.talkDay = self.$convertDate(self.partInOneForm.talkDay);
             if(self.checkAllGroup !=null && self.checkAllGroup.length >0){
                self.partInOneForm.checkAll = self.checkAllGroup.join(',');
             }
             
             var url = self.$constants.BIURL+'/political/employee/apply/one';
             var method = 'POST';
             if(self.mainId > 0){
                self.partInOneForm.id = self.mainId;
                  method='PUT';
              }
              self.$http({
                  url:url,
                  method:method,
                  dataType:'json',
                  data:self.partInOneForm
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
                          self.backUp();
                          if(self.mainId > 0){
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
          } else {
            this.$Message.error('表单校验失败，请输入必填项!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      loadPartyInOneData:function(){
        var self = this;
          this.$http({
          url:  this.$constants.BIURL +'/political/employee/apply/one/'+this.mainId,
          method: 'GET',
          dataType: 'json'
        }).then(function (response) {
          var data = response.data;
            if(data.code == 0){
              self.partInOneForm = data.data;
              self.partInOneForm.sex = data.data.sex+'';
              self.firstDay = self.partInOneForm.firstDay;
              if(self.partInOneForm.checkAll !=null && self.partInOneForm.checkAll != ''){
                self.checkAllGroup =  self.partInOneForm.checkAll.split(',');
                if(self.checkAllGroup.length ==2){
                  self.checkAll  = true;
                }else if(self.checkAllGroup.length >0 && self.checkAllGroup.length <2){
                  self.checkAll = false;
                  self.indeterminate = true;
                }else{
                  self.checkAll = false;
                  self.indeterminate = false;
                }
             }
              //当前所处阶段
              self.setStepTitle(self.partInOneForm.currentState);
            }
        }).catch(function (error) {
          console.log(error)
        })
      },
      setStepTitle:function(currentState){
        switch(currentState){
            case 1:
              this.step1Title = '已完成';
              break;
            case 2:
              this.step1Title = '已完成';
              this.step2Title = '已完成';
              break;
            case 3:
              this.step1Title = '已完成';
              this.step2Title = '已完成';
              this.step3Title = '已完成';
              break;
            case 4:
              this.step1Title = '已完成';
              this.step2Title = '已完成';
              this.step3Title = '已完成';
              this.step4Title = '已完成';
              break;
            case 5:
              this.step1Title = '已完成';
              this.step2Title = '已完成';
              this.step3Title = '已完成';
              this.step4Title = '已完成';
              this.step5Title = '已完成';
              break;
        }
      }
    },
    mounted:function(){
      this.mainId = this.$route.query.mainId
      console.log(this.mainId);
      if(this.mainId > 0){
          this.loadPartyInOneData();
      }
    }
  }
</script>
