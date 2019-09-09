<template>
  <Form class="partyForm" ref="partInTwoForm" :model="partInTwoForm" :rules="partInTwoFormruleValidate" :label-width="120">
    <Divider orientation="left">基本信息</Divider>
    <Row>
      <Col span="12">
        <FormItem label="党员推荐情况">
          <Input v-model="partInTwoForm.recommend" placeholder="请输入党员推荐情况" :disabled="partyTwoDisabled" />
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="团组织推优情况">
          <Input v-model="partInTwoForm.elect" placeholder="请输入团组织推优情况" :disabled="partyTwoDisabled"/>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem prop="partyDay" label="支部确定时间">
          <DatePicker  format="yyyy-MM-dd" type="date" placeholder="支部确定入党积极分子时间" v-model="partInTwoForm.partyDay" :disabled="partyTwoDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="党总支审议时间">
          <DatePicker  format="yyyy-MM-dd" type="date" placeholder="党总支审议时间" v-model="partInTwoForm.discussionTime" :disabled="partyTwoDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem prop="recorDay" label="党委备案时间">
            <DatePicker  format="yyyy-MM-dd" type="date" placeholder="党委备案时间" v-model="partInTwoForm.recorDay" :disabled="partyTwoDisabled"></DatePicker>
          </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem label="培养联系人" prop="fosterUser">
          <Input v-model="partInTwoForm.fosterUser" placeholder="请输入培养联系人" :disabled="partyTwoDisabled" />
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="职务或职业" prop="units1">
          <Input v-model="partInTwoForm.units1" placeholder="请输入单位、职务或职业" :disabled="partyTwoDisabled" />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem label="培养联系人" prop="fosterUser2">
          <Input v-model="partInTwoForm.fosterUser2" placeholder="请输入培养联系人" :disabled="partyTwoDisabled"/>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="职务或职业" prop="units2">
          <Input v-model="partInTwoForm.units2" placeholder="请输入单位、职务或职业" :disabled="partyTwoDisabled" />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="书面思想汇报时间" prop="reportDate1">
          <DatePicker  format="yyyy-MM-dd" type="date" placeholder="书面思想汇报时间" v-model="partInTwoForm.reportDate1" :disabled="partyTwoDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem prop="reportDate2" label="书面思想汇报时间">
          <DatePicker  format="yyyy-MM-dd" type="date" placeholder="书面思想汇报时间" v-model="partInTwoForm.reportDate2" :disabled="partyTwoDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="书面思想汇报时间" prop="reportDate3">
          <DatePicker  format="yyyy-MM-dd" type="date" placeholder="书面思想汇报时间" v-model="partInTwoForm.reportDate3" :disabled="partyTwoDisabled"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="书面思想汇报时间" prop="reportDate4">
          <DatePicker  format="yyyy-MM-dd" type="date" placeholder="入党申请时间" v-model="partInTwoForm.reportDate4" :disabled="partyTwoDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem prop="checkDate1" label="支部考察时间">
          <DatePicker  format="yyyy-MM-dd" type="date" placeholder="支部考察时间" v-model="partInTwoForm.checkDate1" :disabled="partyTwoDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="支部考察时间" prop="checkDate2">
          <DatePicker  format="yyyy-MM-dd" type="date" placeholder="支部考察时间" v-model="partInTwoForm.checkDate2" :disabled="partyTwoDisabled"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <FormItem label="备注" prop="address">
          <Input  :disabled="partyTwoDisabled" v-model="partInTwoForm.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="(填写更换入党介绍人、延长预备期的党员转正、党组织变更等特殊情况)"/>
        </FormItem>
      </Col>
    </Row>
    <Divider orientation="left">此阶段须准备的材料:(所需材料必须确认全部完成才能进入下一阶段)</Divider>
    <Row>
        <div style="padding-bottom:6px;margin-bottom:6px;">
          <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              :disabled="partyTwoDisabled"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="checkAllGroup" >
        <Row>
          <Col span="9"><Checkbox :disabled="partyTwoDisabled" label="1">1.申请人的思想汇报<a href="">(见参考例文2-3)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyTwoDisabled" label="2">2.推荐入党积极分子人选登记表<a href="">(见表2-1)</a></Checkbox></Col>
        </Row>
        <Row>
          <Col span="9"><Checkbox :disabled="partyTwoDisabled" label="3">3.支部委员会（支部大会）研究确定入党积极分子的会议记录<a href="">(见参考例文2-1)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyTwoDisabled" label="4">4.总支部委员会研究确定入党积极分子的会议记录</Checkbox></Col>
        </Row>
        <Row>
          <Col span="9"><Checkbox :disabled="partyTwoDisabled" label="5">5.入党积极分子备案登记表<a href="">(见表2-2)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyTwoDisabled" label="6">6.报上级党委备案的文件<a href="">(见参考例文2-2)</a></Checkbox></Col>
        </Row>
        
        <Row>
          <Col span="9"><Checkbox :disabled="partyTwoDisabled" label="7">7.上级党委备案同意的文件</Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyTwoDisabled" label="8">8.入党积极分子培训证书</Checkbox></Col>
        </Row>
        
        <Row>
          <Col span="9"><Checkbox :disabled="partyTwoDisabled" label="9">9.入党积极分子培养考察登记表<a href="">(见表2-3)</a></Checkbox></Col>
        </Row>
        
      </CheckboxGroup>
    </Row>
    <FormItem class="btn">
      <Button @click="prevToOne()" >上一步</Button>
      <Button :disabled="partyTwoDisabled" type="primary" @click="handleSubmit('partInTwoForm')" style="margin-left:8px;">提交</Button>
      <Button :disabled="partyTwoDisabled" @click="handleReset('partInTwoForm')" style="margin-left: 8px">重置</Button>
      <Button @click="twoNextToThree(partInTwoForm)" style="margin-left:8px;">下一步</Button>
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
    name: 'partyInTwo',
    props:{
      prevToOne:{
        type: Function,
        default : function prevToOne() {
          
        }
      },
      twoNextToThree:{
        type: Function,
        default : function nextToThree() {
          
        }
      },
      partyTwoDisabled:{
        type: Boolean,
        default: false
      },
      currentState:{
         type: Number,
        default: 0
      },
      firstDay:{
        type: String,
        default: 0
      }
    },
    data () {
      return {
        indeterminate:false,
        checkAll:'',
        checkAllGroup:[],
        isfrist:true,
        partInTwoForm: {
          recommend: '',
          elect: '',
          mainId:0,
          partyDay: null,
          discussionTime: null,
          recorDay: null,
          fosterUser: '',
          units1: '',
          fosterUser2: '',
          units2:'',
          reportDate1:null,
          reportDate2:null,
          reportDate3:null,
          reportDate4:null,
          checkDate1:null,
          checkDate2:null,
          checkAll:'',
          note:''
        },
        partInTwoFormruleValidate: {
          partyDay: [
            {required: true,type: 'date', message: '请填写支部确定入党积极分子时间', trigger: 'change' }
          ],
          recorDay:[
            {required: true, type: 'date',message: '请填写党委备案时间', trigger: 'change'}
          ],
          fosterUser:[
            {required: true, message: '请输入培养联系人', trigger: 'blur'}
          ],
          fosterUser2:[
            {required: true, message: '请输入培养联系人', trigger: 'blur'}
          ],
          units1:[
            {required: true, message: '请输入单位及职务', trigger: 'blur'}
          ],
          units2:[
            {required: true, message: '请输入单位及职务', trigger: 'blur'}
          ],
          reportDate1:[
            {required: true, type: 'date',message: '请填写书面汇报时间', trigger: 'change'}
          ],
          reportDate2:[
            {required: true, type: 'date',message: '请填写书面汇报时间', trigger: 'change'}
          ],
          reportDate3:[
            {required: true, type: 'date',message: '请填写书面汇报时间', trigger: 'change'}
          ],
          reportDate4:[
            {required: true, type: 'date',message: '请填写书面汇报时间', trigger: 'change'}
          ],
          checkDate1:[
            {required: true, type: 'date',message: '请填写支部考察时间', trigger: 'change'}
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
              this.checkAllGroup = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
          } else {
              this.checkAllGroup = [];
          }
      },
      checkDate:function(date,partyDay){
        var str = new Date(date);
        var str1 = new Date(partyDay);
        return this.completeDate(str,str1,6);
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
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          var self = this;
          if (valid) {
             self.partInTwoForm.tenantId = self.$constants.userInfo.tenantId;
             self.partInTwoForm.userId = self.$constants.userInfo.userId;
             self.partInTwoForm.userName = self.$constants.userInfo.name;
             self.partInTwoForm.discussionTime = self.$convertDate(self.partInTwoForm.discussionTime);
             self.partInTwoForm.partyDay = self.$convertDate(self.partInTwoForm.partyDay);
             self.partInTwoForm.recorDay = self.$convertDate(self.partInTwoForm.recorDay);
             self.partInTwoForm.reportDate1 = self.$convertDate(self.partInTwoForm.reportDate1);
             self.partInTwoForm.reportDate2 = self.$convertDate(self.partInTwoForm.reportDate2);
             self.partInTwoForm.reportDate3 = self.$convertDate(self.partInTwoForm.reportDate3);
             self.partInTwoForm.reportDate4 = self.$convertDate(self.partInTwoForm.reportDate4);
             self.partInTwoForm.checkDate1 = self.$convertDate(self.partInTwoForm.checkDate1);
             self.partInTwoForm.checkDate2 = self.$convertDate(self.partInTwoForm.checkDate2);
             if(self.checkAllGroup !=null && self.checkAllGroup.length >0){
                self.partInTwoForm.checkAll = self.checkAllGroup.join(',');
             }
            
             var check = self.checkDate(self.firstDay, self.partInTwoForm.partyDay);
             if(check){
               self.$Modal.confirm({
                  title:'系统提示',
                  content:'入党申请未满6个月,一般不宜被推荐和确定为入党积极分子！确定要保存当前信息吗?',
                  okText:'确定',
                  cancelText:'取消',
                  onOk:function(){
                     self.savePartyTwo();
                  }
              });
             }else{
               self.savePartyTwo();
             }
          } else {
            this.$Message.error('表单校验失败，请输入必填项!');
          }
        })
      },
      savePartyTwo:function(){
        var self = this;
        var url = self.$constants.BIURL+'/political/employee/apply/tow';
        var method = 'POST';
        if(self.partInTwoForm.id > 0){
            method='PUT';
        }
        self.$http({
            url:url,
            method:method,
            dataType:'json',
            data:self.partInTwoForm
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
                    if(self.partInTwoForm.id > 0){
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
      loadPartyInTwoData:function(){
        var self = this;
          this.$http({
          url:  this.$constants.BIURL +'/political/employee/apply/tow/'+this.mainId,
          method: 'GET',
          dataType: 'json'
        }).then(function (response) {
          var data = response.data;
            if(data.code == 0){
              if(data.data && data.data !=null){
                  self.partInTwoForm = data.data;
                  if(self.partInTwoForm.checkAll !=null && self.partInTwoForm.checkAll != ''){
                    self.checkAllGroup =  self.partInTwoForm.checkAll.split(',');
                    if(self.checkAllGroup.length ==9){
                      self.checkAll  = true;
                    }else if(self.checkAllGroup.length >0 && self.checkAllGroup.length <9){
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
      this.partInTwoForm.mainId = this.mainId;
    },
    watch:{
      'currentState':function(value){
        if(value >= 2){
          this.loadPartyInTwoData();
        }
      }
    }
  }
</script>
