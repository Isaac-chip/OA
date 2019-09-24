<template>
  <Form class="partyForm" ref="partInFourForm" :model="partInFourForm" :rules="partInFourFormruleValidate" :label-width="120">
    <Divider orientation="left">基本信息</Divider>
    <Row>
      <Col span="8">
        <FormItem label="支部审查时间" prop="checkTime">
          <DatePicker type="date" placeholder="支部审查时间" v-model="partInFourForm.checkTime" :disabled="partyFourDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="党委预审时间" prop="pretrialDay">
          <DatePicker type="date" placeholder="党委预审时间" v-model="partInFourForm.pretrialDay" :disabled="partyFourDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="入党志愿书编号" prop="partyCode">
          <Input  placeholder="入党志愿书编号" v-model="partInFourForm.partyCode" :disabled="partyFourDisabled" />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="支部大会时间" prop="meetingDay">
          <DatePicker type="date" placeholder="支部大会讨论会议时间" v-model="partInFourForm.meetingDay" :disabled="partyFourDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="有表决权党员人数" prop="voteTotal">
          <Input  placeholder="有表决权党员人数" v-model="partInFourForm.voteTotal" :disabled="partyFourDisabled"/>
        </FormItem>
      </Col>
        <Col span="8">
        <FormItem label="应到人数" prop="totalNum">
          <Input type="number" placeholder="应到人数" v-model="partInFourForm.totalNum" :disabled="partyFourDisabled"/>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="实到人数" prop="factNum">
          <Input type="number" v-model="partInFourForm.factNum" placeholder="实到人数" :disabled="partyFourDisabled"/>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="赞成票数" prop="affirmativeTicket">
          <Input type="number" v-model="partInFourForm.affirmativeTicket" placeholder="赞成票数" :disabled="partyFourDisabled"/>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="反对票数" prop="dissentingTicket">
          <Input type="number" v-model="partInFourForm.dissentingTicket" placeholder="赞成票数" :disabled="partyFourDisabled" />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="弃权票数" prop="waiverTicket">
          <Input type="number" v-model="partInFourForm.waiverTicket" placeholder="弃权票数" :disabled="partyFourDisabled"/>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="党总支审议时间">
          <DatePicker type="date" placeholder="党总支审议时间" v-model="partInFourForm.discussionTime" :disabled="partyFourDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="党委派人谈话时间" prop="talkDay">
          <DatePicker type="date" placeholder="党委派人谈话时间" v-model="partInFourForm.talkDay" :disabled="partyFourDisabled"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="谈话人姓名" prop="talkUser">
          <Input  placeholder="谈话人姓名:（单位、职务、签名）" v-model="partInFourForm.talkUser" :disabled="partyFourDisabled"/>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem prop="checkDay" label="党委审批时间">
          <DatePicker type="date" placeholder="党委审批时间" v-model="partInFourForm.checkDay" :disabled="partyFourDisabled"></DatePicker>
          </FormItem>
      </Col>
      <Col span="8">
        <FormItem prop="membersNum" label="党委委员人数">
          <Input type="number" placeholder="党委委员人数" v-model="partInFourForm.membersNum" :disabled="partyFourDisabled"/> 
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem prop="actualNum" label="实到人数">
          <Input type="number" placeholder="实到人数" v-model="partInFourForm.actualNum" :disabled="partyFourDisabled"/> 
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem prop="agreeNum" label="同意人数">
          <Input type="number" placeholder="同意人数" v-model="partInFourForm.agreeNum" :disabled="partyFourDisabled"/> 
        </FormItem>
      </Col>
      
    </Row>
    <Row>
        <Col span="8">
        <FormItem label="预备期开始时间" prop="startDay">
          <DatePicker :disabled="partyFourDisabled" type="date" placeholder="预备期开始时间" v-model="partInFourForm.startDay"></DatePicker>
        </FormItem>
      </Col>

      <Col span="8">
        <FormItem label="预备期结束时间" prop="endDay">
          <DatePicker :disabled="partyFourDisabled" type="date" placeholder="预备期结束时间" v-model="partInFourForm.endDay"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="备案时间" prop="backupDay">
          <DatePicker :disabled="partyFourDisabled" type="date" placeholder="向上级党委组织部门备案时间" v-model="partInFourForm.backupDay"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <FormItem label="备注">
          <Input v-model="partInFourForm.note" :disabled="partyFourDisabled" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="(填写更换入党介绍人、延长预备期的党员转正、党组织变更等特殊情况)"/>
        </FormItem>
      </Col>
    </Row>
    <Divider orientation="left">此阶段须准备的材料:(所需材料必须确认全部完成才能进入下一阶段)</Divider>
    <Row>
        <div style="padding-bottom:6px;margin-bottom:6px;">
          <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              :disabled="partyFourDisabled"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="checkAllGroup">
        <Row>
          <Col span="9"><Checkbox :disabled="partyFourDisabled" label="1">1.发展对象预审请示<a href="">(见参考例文4-1)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyFourDisabled" label="2">2.上级党委关于发展对象预审的意见<a href="">(见参考例文4-2)</a></Checkbox></Col>
        </Row>
        <Row>
          <Col span="9"><Checkbox :disabled="partyFourDisabled" label="3">3.本人填写《中国共产党入党志愿书》<a href="">(见参考例文4-3)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyFourDisabled" label="4">4.总支部委员会讨论接受预备党员的会议记录</Checkbox></Col>
        </Row>
        <Row>
          <Col span="9"><Checkbox :disabled="partyFourDisabled" label="5">支部大会讨论接收预备党员的会议记录<a href="">(见参考例文4-4)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyFourDisabled" label="6">6.上级党委派人谈话记录</Checkbox></Col>
        </Row>
        
        <Row>
          <Col span="9"><Checkbox :disabled="partyFourDisabled" label="7">7.党支部上报审批预备党员的请示<a href="">(见参考例文4-5)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyFourDisabled" label="8">8.上级党委上报进行接收预备党员备案的报告<a href="">(见参考例文4-7)</a></Checkbox></Col>
        </Row>
        
        <Row>
          <Col span="9"><Checkbox :disabled="partyFourDisabled" label="9">9.上级党委审批预备党员的批复<a href="">(见参考例文4-6)</a></Checkbox></Col>
        </Row>
      </CheckboxGroup>
    </Row>
    <FormItem class="btn">
      <Button @click="prevToThree" >上一步</Button>
      <Button :disabled="partyFourDisabled" type="primary" @click="handleSubmit('partInFourForm')" style="margin-left:8px;"> 提交</Button>
      <Button :disabled="partyFourDisabled" @click="handleReset('partInFourForm')" style="margin-left: 8px">重置</Button>
      <Button @click="fourNextToFive(partInFourForm)" style="margin-left:8px;">下一步</Button>
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
    name: 'partyInFour',
    props:{
      prevToThree:{
        type: Function,
        default : function prevToThree() {
          
        }
      },
      fourNextToFive:{
        type: Function,
        default : function fourNextToFive() {
          
        }
      },
      partyFourDisabled:{
        type: Boolean,
        default: false
      },
       currentState:{
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        indeterminate:false,
        checkAll:false,
        checkAllGroup:[],
        partInFourForm: {
          checkTime: '',
          pretrialDay: '',
          partyCode: '',
          meetingDay: '',
          voteTotal: 0,
          totalNum: 0,
          factNum: 0,
          affirmativeTicket: '',
          dissentingTicket:'',
          waiverTicket:'',
          discussionTime:'',
          talkDay:'',
          talkUser:'',
          checkDay:'',
          membersNum:0,
          actualNum:0,
          agreeNum:0,
          startDay:'',
          endDay:'',
          backupDay:'',
          note:''
        },
        partInFourFormruleValidate: {
          checkTime: [
            {required: true,type: 'date', message: '请填写支部审查时间', trigger: 'change' }
          ],
          pretrialDay:[
            {required: true, type: 'date',message: '请填写党委预审时间', trigger: 'change'}
          ],
          partyCode:[
            {required: true,message: '请填写入党志愿书编号', trigger: 'blur'}
          ],
          meetingDay:[
            {required: true, type: 'date',message: '请填写支部大会讨论会议时间', trigger: 'change'}
          ],
          voteTotal:[
            {required: true, message: '请输入有表决权党员人数', trigger: 'blur'}
          ],
          totalNum:[
            {required: true, message: '请输入应到人数', trigger: 'blur'}
          ],
          factNum:[
            {required: true, message: '请输入实到人数', trigger: 'blur'}
          ],
          affirmativeTicket:[
            {required: true, message: '请输入赞成票数', trigger: 'blur'}
          ],
          dissentingTicket:[
            {required: true, message: '请输入反对票数', trigger: 'blur'}
          ],
          waiverTicket:[
            {required: true, message: '请输入弃权票数', trigger: 'blur'}
          ],
          talkDay:[
            {required: true, type: 'date',message: '请填写党委派人谈话时间', trigger: 'change'}
          ],
          talkUser:[
            {required: true, message: '请输入谈话人姓名:（单位、职务、签名）', trigger: 'blur'}
          ],
          checkDay:[
            {required: true,type: 'date', message: '请输入党委审批时间', trigger: 'change'}
          ],
          membersNum:[
            {required: true, message: '请输入党委委员人数', trigger: 'blur'}
          ],
          actualNum:[
            {required: true, message: '请输入实到人数', trigger: 'blur'}
          ],
          agreeNum:[
            {required: true, message: '请输入同意人数', trigger: 'blur'}
          ],
          startDay:[
            {required: true, type: 'date',message: '请输入预备期开始时间', trigger: 'change'}
          ],
          endDay:[
            {required: true, type: 'date',message: '请输入预备期结束时间', trigger: 'change'}
          ],
          backupDay:[
            {required: true, type: 'date',message: '请输入向上级党委组织部门备案时间', trigger: 'change'}
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
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          var self = this;
          if (valid) {
             self.partInFourForm.tenantId = self.$constants.userInfo.tenantId;
             self.partInFourForm.userId = self.$constants.userInfo.userId;
             self.partInFourForm.userName = self.$constants.userInfo.name;
             self.partInFourForm.checkTime = self.$convertDate(self.partInFourForm.checkTime);
             self.partInFourForm.pretrialDay = self.$convertDate(self.partInFourForm.pretrialDay);
             self.partInFourForm.meetingDay = self.$convertDate(self.partInFourForm.meetingDay);
             self.partInFourForm.discussionTime = self.$convertDate(self.partInFourForm.discussionTime);
             self.partInFourForm.talkDay = self.$convertDate(self.partInFourForm.talkDay);
             self.partInFourForm.checkDay = self.$convertDate(self.partInFourForm.checkDay);
             self.partInFourForm.startDay = self.$convertDate(self.partInFourForm.startDay);
             self.partInFourForm.endDay = self.$convertDate(self.partInFourForm.endDay);
             self.partInFourForm.backupDay = self.$convertDate(self.partInFourForm.backupDay);
             if(self.checkAllGroup !=null && self.checkAllGroup.length >0){
                self.partInFourForm.checkAll = self.checkAllGroup.join(',');
             }

             var voteTotal = self.partInFourForm.voteTotal;
             var totalNum = self.partInFourForm.totalNum;
             var actualNum = self.partInFourForm.actualNum;
             if(actualNum*2 < voteTotal){
               self.$Message.success({
                    content: '实到会人数未达到有表决权党员人数的一半，不符合规定人数，请检查数据！',
                    duration: 3
                });
             }else if(totalNum*2 < voteTotal){
                self.$Message.success({
                    content: '应到会人数未达到有表决权党员人数的一半，不符合规定人数，请检查数据！',
                    duration: 3
                });
             } else{
                self.saveData();
             }
          } else {
            this.$Message.error('表单校验失败，请输入必填项!');
          }
        })
      },
      saveData:function(){
        var self = this;
        var url = self.$constants.BIURL+'/political/employee/apply/four';
        var method = 'POST';
        if(self.partInFourForm.id > 0){
            method='PUT';
        }
        self.$http({
            url:url,
            method:method,
            dataType:'json',
            data:self.partInFourForm
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
                    if(self.partInFourForm.id > 0){
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
      loadPartyInFourData:function(){
        var self = this;
        this.$http({
          url:  this.$constants.BIURL +'/political/employee/apply/four/'+this.mainId,
          method: 'GET',
          dataType: 'json'
        }).then(function (response) {
          var data = response.data;
            if(data.code == 0){
              if(data.data && data.data !=null){
                  self.partInFourForm = data.data;
                  if(self.partInFourForm.checkAll !=null && self.partInFourForm.checkAll != ''){
                    self.checkAllGroup =  self.partInFourForm.checkAll.split(',');
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
      this.partInFourForm.mainId = this.mainId;
    },
    watch:{
      'currentState':function(value){
         if(value >= 4){
            this.loadPartyInFourData();
         }
      }
    }
  }
</script>
