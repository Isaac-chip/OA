<template>
  <Form class="partyForm" ref="partInThreeForm" :model="partInThreeForm" :rules="partInThreeFormruleValidate" :label-width="120">
    <Divider orientation="left">基本信息</Divider>
    <Row>
      <Col span="8">
        <FormItem label="发展对象人选时间" prop="discDay">
          <DatePicker :disabled="partyThreeDisabled" type="date" placeholder="支部确认发展对象人选时间" v-model="partInThreeForm.discDay"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="公示开始时间" prop="publicityStartDay">
          <DatePicker :disabled="partyThreeDisabled" type="date" placeholder="公示开始时间" v-model="partInThreeForm.publicityStartDay"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="公示结束时间" prop="publicityEndDay">
          <DatePicker :disabled="partyThreeDisabled" type="date" placeholder="公示结束时间" v-model="partInThreeForm.publicityEndDay"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="党总支审议时间">
          <DatePicker :disabled="partyThreeDisabled" type="date" placeholder="党总支审议时间" v-model="partInThreeForm.discussionTime"></DatePicker>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="党委备案同意时间" prop="recordsDay">
          <DatePicker :disabled="partyThreeDisabled" type="date" placeholder="党委备案同意时间" v-model="partInThreeForm.recordsDay"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem label="入党介绍人" prop="introducer1">
          <Input v-model="partInThreeForm.introducer1" placeholder="请输入入党介绍人" :disabled="partyThreeDisabled" />
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="职务或职业" prop="units1">
          <Input v-model="partInThreeForm.units1" placeholder="请输入单位、职务或职业" :disabled="partyThreeDisabled" />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem label="入党介绍人" prop="introducer2">
          <Input v-model="partInThreeForm.introducer2" placeholder="请输入入党介绍人" :disabled="partyThreeDisabled"/>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="职务或职业" prop="units2">
          <Input v-model="partInThreeForm.units2" placeholder="请输入单位、职务或职业" :disabled="partyThreeDisabled"/>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem label="政审人" prop="checkUser">
          <Input  placeholder="政审人:（单位、职务、签名）" v-model="partInThreeForm.checkUser" :disabled="partyThreeDisabled"/>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem prop="checkAdvice" label="政审是否合格">
          <Input  placeholder="政审是否合格" v-model="partInThreeForm.checkAdvice" :disabled="partyThreeDisabled"/>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="培训开始时间" prop="trainStartDay">
          <DatePicker type="date" placeholder="参加发展对象集中培训开始时间" v-model="partInThreeForm.trainStartDay" :disabled="partyThreeDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem prop="trainEndDay" label="培训结束时间">
          <DatePicker type="date" placeholder="参加发展对象集中培训结束时间" v-model="partInThreeForm.trainEndDay" :disabled="partyThreeDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="培训成绩" prop="trainScore">
          <Input placeholder="培训成绩" v-model="partInThreeForm.trainScore" :disabled="partyThreeDisabled" />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <FormItem label="备注" >
          <Input v-model="partInThreeForm.note" :disabled="partyThreeDisabled" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="(填写更换入党介绍人、延长预备期的党员转正、党组织变更等特殊情况)"/>
        </FormItem>
      </Col>
    </Row>
    <Divider orientation="left">此阶段须准备的材料:(所需材料必须确认全部完成才能进入下一阶段)</Divider>
    <Row>
        <div style="padding-bottom:6px;margin-bottom:6px;">
          <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              :disabled="partyThreeDisabled"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="checkAllGroup">
        <Row>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="1">1.支部大会讨论发展对象人选会议记录<a href="">(见参考例文3-1)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="2">2.支委会讨论发展对象人选会议记录<a href="">(见参考例文3-1)</a></Checkbox></Col>
        </Row>
        <Row>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="3">3.发展对象人选公示<a href="">(见参考例文3-2)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="4">4.总支部委员会研究确定发展对象的会议记录</Checkbox></Col>
        </Row>
        <Row>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="5">5.上级党委发展对象备案批复</Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="6">6.发展对象备案请示<a href="">(见参考例文3-3)</a></Checkbox></Col>
        </Row>
        
        <Row>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="7">7.发展对象政治审查材料(<a href="">见参考例文3-5</a>、<a href="">见参考例文3-6)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="8">8.个人自传<a href="">(见参考例文3-4)</a></Checkbox></Col>
        </Row>
        
        <Row>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="9">9.党支部政审报告<a href="">(见参考例文3-7)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="10">10.发展对象短期集中培训证书</Checkbox></Col>
        </Row>
          <Row>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="11">11.发展对象人选公示情况登记表<a href="">(见表3-2)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyThreeDisabled" label="12">12.发展对象人选备案登记表<a href="">(见表3-1)</a></Checkbox></Col>
        </Row>
        
      </CheckboxGroup>
    </Row>
    <FormItem class="btn">
      <Button @click="prevToTwo" >下一步</Button>
      <Button :disabled="partyThreeDisabled" type="primary" @click="handleSubmit('partInThreeForm')" style="margin-left:8px;"> 提交</Button>
      <Button :disabled="partyThreeDisabled" @click="handleReset('partInThreeForm')" style="margin-left: 8px">重置</Button>
      <Button @click="threeNextToFour(partInThreeForm)" style="margin-left:8px;">下一步</Button>
    </FormItem>
  </Form>
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
  export default {
    name: 'partyInThree',
     props:{
      prevToTwo:{
        type: Function,
        default : function prevToTwo() {
          
        }
      },
      threeNextToFour:{
        type: Function,
        default : function threeNextToFour() {
          
        }
      },
      partyThreeDisabled:{
        type: Boolean,
        default: false
      },
      currentState:{
        type: Number,
        default: 0
      },
      partyDay:{
        type: String,
        default: 0
      }
    },
    data () {
      return {
        mainId:0,
        indeterminate:false,
        checkAll:false,
        checkAllGroup:[],
        partInThreeForm: {
          discDay: '',
          publicityStartDay: '',
          publicityEndDay: '',
          discussionTime: '',
          recordsDay: '',
          introducer1: '',
          units1: '',
          introducer2: '',
          units2:'',
          checkUser:'',
          checkAdvice:'',
          trainStartDay:'',
          trainEndDay:'',
          trainScore:'',
          checkAll:'',
          note:''
        },
        partInThreeFormruleValidate: {
          discDay: [
            {required: true,type: 'date', message: '请填写支部确定发展对象人选时间', trigger: 'change' }
          ],
          publicityStartDay:[
            {required: true, type: 'date',message: '请填写公示开始时间', trigger: 'change'}
          ],
          publicityEndDay:[
            {required: true, type: 'date',message: '请填写公示结束时间', trigger: 'change'}
          ],
          recordsDay:[
            {required: true, type: 'date',message: '请填写党委备案同意时间', trigger: 'change'}
          ],
          introducer1:[
            {required: true, message: '请输入入党介绍人', trigger: 'blur'}
          ],
          introducer2:[
            {required: true, message: '请输入入党介绍人', trigger: 'blur'}
          ],
          units1:[
            {required: true, message: '请输入单位及职务', trigger: 'blur'}
          ],
          units2:[
            {required: true, message: '请输入单位及职务', trigger: 'blur'}
          ],
          checkUser:[
            {required: true, message: '请输入政审人:（单位、职务、签名）', trigger: 'blur'}
          ],
          checkAdvice:[
            {required: true, message: '请输入政审是否合格', trigger: 'blur'}
          ],
          trainStartDay:[
            {required: true, type: 'date',message: '请填写参加发展对象集中培训开始时间', trigger: 'change'}
          ],
          trainEndDay:[
            {required: true, type: 'date',message: '请填参加发展对象集中培训结束时间', trigger: 'change'}
          ],
          trainScore:[
            {required: true,message: '请填写培训成绩', trigger: 'blur'}
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
      checkDate:function(date,partyDay){
        var str = new Date(date);
        var str1 = new Date(partyDay);
        return this.completeDate(str,str1,12);
      },
      completeDate : function(time1 , time2 , m){
          var diffyear = time2.getFullYear() - time1.getFullYear() ;
          var diffmonth = diffyear * 12 + time2.getMonth() - time1.getMonth() ;
          if(diffmonth < 0 ){
            return false ;
          }
          var diffDay = time2.getDate() - time1.getDate() ;
          if(diffmonth < m || (diffmonth == m && diffDay <= 0)){
            if(diffmonth == m && diffDay == 0){
              var timeA = time1.getHours()*3600+60*time1.getMinutes()+time1.getSeconds();
              var timeB = time2.getHours()*3600+60*time2.getMinutes()+time2.getSeconds();
              if(timeB-timeA > 0){
                return false;
              }
            }
            return true ;
          }
          return false ;
      }, 
      handleCheckAll:function(){
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.checkAllGroup = ['1', '2', '3', '4', '5', '6', '7', '8', '9','10','11','12'];
            } else {
                this.checkAllGroup = [];
            }
        },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          var self = this;
          if (valid) {
             self.partInThreeForm.tenantId = self.$constants.userInfo.tenantId;
             self.partInThreeForm.userId = self.$constants.userInfo.userId;
             self.partInThreeForm.userName = self.$constants.userInfo.name;
             self.partInThreeForm.discDay = self.$convertDate(self.partInThreeForm.discDay);
             self.partInThreeForm.publicityStartDay = self.$convertDate(self.partInThreeForm.publicityStartDay);
             self.partInThreeForm.publicityEndDay = self.$convertDate(self.partInThreeForm.publicityEndDay);
             self.partInThreeForm.recordsDay = self.$convertDate(self.partInThreeForm.recordsDay);
             self.partInThreeForm.trainStartDay = self.$convertDate(self.partInThreeForm.trainStartDay);
             self.partInThreeForm.trainEndDay = self.$convertDate(self.partInThreeForm.trainEndDay);
             self.partInThreeForm.discussionTime = self.$convertDate(self.partInThreeForm.discussionTime);
             if(self.checkAllGroup !=null && self.checkAllGroup.length >0){
                self.partInThreeForm.checkAll = self.checkAllGroup.join(',');
             }

             var check = self.checkDate(self.partInThreeForm.discDay, self.partyDay);
             if(check){
                self.$Message.success({
                    content: '入党积极分子时间未满1年，不能确定为发展对象，请检查数据！',
                    duration: 3
                });
             }else{
               self.saveData();
             }
          } else {
            this.$Message.error('表单校验失败，请输入必填项!');
          }
        })
      },
      saveData:function(){
        var self = this;
        var url = self.$constants.BIURL+'/political/employee/apply/three';
        var method = 'POST';
        if(self.partInThreeForm.id > 0){
            method='PUT';
        }
        self.$http({
            url:url,
            method:method,
            dataType:'json',
            data:self.partInThreeForm
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
                    if(self.partInThreeForm.id > 0){
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
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      loadPartyInThreeData:function(){
        var self = this;
        this.$http({
          url:  this.$constants.BIURL +'/political/employee/apply/three/'+this.mainId,
          method: 'GET',
          dataType: 'json'
        }).then(function (response) {
          var data = response.data;
            if(data.code == 0){
              if(data.data && data.data !=null){
                  self.partInThreeForm = data.data;
                  if(self.partInThreeForm.checkAll !=null && self.partInThreeForm.checkAll != ''){
                    self.checkAllGroup =  self.partInThreeForm.checkAll.split(',');
                    if(self.checkAllGroup.length ==12){
                      self.checkAll  = true;
                    }else if(self.checkAllGroup.length >0 && self.checkAllGroup.length <12){
                      self.checkAll = false;
                      self.indeterminate = true;
                    }else{
                      self.checkAll = false;
                      self.indeterminate = false;
                    }
                }
              }
            }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    mounted:function(){
      this.mainId = this.$route.query.mainId
      this.partInThreeForm.mainId = this.mainId;
    },
    watch:{
      'currentState':function(value){
         if(value >= 3){
            this.loadPartyInThreeData();
         }
      }
    }
  }
</script>
