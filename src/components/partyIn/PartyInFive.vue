<template>
  <Form class="partyForm" ref="partInFiveForm" :model="partInFiveForm" :rules="partInFiveFormruleValidate" :label-width="120">
    <Divider orientation="left">基本信息</Divider>
    <Row>
      <Col span="8">
        <FormItem label="编入党支部名称" prop="checkTime">
            <treeselect 
                    :disabled="partyFiveDisabled"
                    v-model="partInFiveForm.partybranchId"
                    :options="departments"
                    :max-height="200"
                    @select="orgSelect"
                    noResultsText="没有找到匹配结果"
                    placeholder="请选择所属组织..." />
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="编入党小组名称" >
          <Input placeholder="编入党小组名称" v-model="partInFiveForm.partyteamName" :disabled="partyFiveDisabled"/>
        </FormItem>
      </Col>
        <Col span="8">
        <FormItem label="入党宣誓时间" prop="jurationDay">
          <DatePicker type="date" placeholder="入党宣誓时间" v-model="partInFiveForm.jurationDay" :disabled="partyFiveDisabled"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
        <Col span="8">
        <FormItem label="申请转正时间" prop="becomeDay">
          <DatePicker type="date" placeholder="申请转正时间" v-model="partInFiveForm.becomeDay" :disabled="partyFiveDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="转正公示开始时间" prop="publicityStartDay">
          <DatePicker type="date" placeholder="转正公示开始时间" v-model="partInFiveForm.publicityStartDay" :disabled="partyFiveDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="转正公示结束时间" prop="publicityEndDay">
          <DatePicker type="date" placeholder="转正公示开始时间" v-model="partInFiveForm.publicityEndDay" :disabled="partyFiveDisabled"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="支部大会时间" prop="meetingDay">
          <DatePicker type="date" placeholder="支部大会讨论会议时间" v-model="partInFiveForm.meetingDay" :disabled="partyFiveDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="有表决权党员人数" prop="voteTotal">
          <Input type="number"  placeholder="有表决权党员人数" v-model="partInFiveForm.voteTotal" :disabled="partyFiveDisabled"/>
        </FormItem>
      </Col>
        <Col span="8">
        <FormItem label="应到人数" prop="totalNum">
          <Input type="number"  placeholder="应到人数" v-model="partInFiveForm.totalNum" :disabled="partyFiveDisabled"/>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="实到人数" prop="factNum">
          <Input type="number" v-model="partInFiveForm.factNum" placeholder="实到人数" :disabled="partyFiveDisabled"/>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="赞成票数" prop="affirmativeTicket">
          <Input type="number" v-model="partInFiveForm.affirmativeTicket" placeholder="赞成票数" :disabled="partyFiveDisabled"/>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="反对票数" prop="dissentingTicket">
          <Input type="number" v-model="partInFiveForm.dissentingTicket" placeholder="赞成票数" :disabled="partyFiveDisabled"/>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="弃权票数" prop="waiverTicket">
          <Input type="number" v-model="partInFiveForm.waiverTicket" placeholder="弃权票数" :disabled="partyFiveDisabled"/>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="党总支审议时间">
          <DatePicker type="date" placeholder="党总支审议时间" v-model="partInFiveForm.discussionTime" :disabled="partyFiveDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="会议决议" prop="resolution">
          <Input placeholder="会议决议（按期转正、延长预备期一年/半年、取消预备党员资格）" v-model="partInFiveForm.resolution" :disabled="partyFiveDisabled" />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem prop="checkDay" label="党委审批时间">
          <DatePicker type="date" placeholder="党委审批时间" v-model="partInFiveForm.checkDay" :disabled="partyFiveDisabled"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem prop="membersNum" label="党委委员人数">
          <Input type="number"  placeholder="党委委员人数" v-model="partInFiveForm.membersNum" :disabled="partyFiveDisabled"/> 
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem prop="actualNum" label="实到人数">
          <Input type="number"  placeholder="实到人数" v-model="partInFiveForm.actualNum" :disabled="partyFiveDisabled"/> 
        </FormItem>
      </Col>
    </Row>
    <Row>
       <Col span="8">
        <FormItem prop="agreeNum" label="同意人数">
          <Input type="number" placeholder="同意人数" v-model="partInFiveForm.agreeNum" :disabled="partyFiveDisabled"/> 
        </FormItem>
      </Col>
        <Col span="8">
        <FormItem label="党龄起算时间" prop="partyStartDay">
          <DatePicker type="date" placeholder="预备期开始时间" v-model="partInFiveForm.partyStartDay" :disabled="partyFiveDisabled"></DatePicker>
        </FormItem>
      </Col>
        <Col span="8">
        <FormItem label="档案整理人" prop="collator">
          <Input  placeholder="档案整理人" v-model="partInFiveForm.collator" :disabled="partyFiveDisabled"/>
        </FormItem>
      </Col>
    </Row>
    <Row>
        <Col span="8">
        <FormItem label="预备期开始时间">
          <DatePicker :disabled="partyFiveDisabled" type="date" placeholder="预备期开始时间" v-model="partInFiveForm.extendStartDay"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="预备期结束时间" >
          <DatePicker :disabled="partyFiveDisabled" type="date" placeholder="预备期结束时间" v-model="partInFiveForm.extendEndDay"></DatePicker>
        </FormItem>
      </Col>
      
    </Row>
    <Row>
      <Col span="24">
        <FormItem label="备注">
          <Input v-model="partInFiveForm.note"  :disabled="partyFiveDisabled" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="(填写更换入党介绍人、延长预备期的党员转正、党组织变更等特殊情况)"/>
        </FormItem>
      </Col>
    </Row>
    <Divider orientation="left">此阶段须准备的材料:(所需材料必须确认全部完成才能进入下一阶段)</Divider>
    <Row>
        <div style="padding-bottom:6px;margin-bottom:6px;">
          <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              :disabled="partyFiveDisabled"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="checkAllGroup">
        <Row>
          <Col span="9"><Checkbox :disabled="partyFiveDisabled" label="1">1.转正申请书<a href="">(见参考例文5-1)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyFiveDisabled" label="2">2.支部委员会（不设支部委员会的由支部大会）讨论预备党员转正会议记录</Checkbox></Col>
        </Row>
        <Row>
          <Col span="9"><Checkbox :disabled="partyFiveDisabled" label="3">3.预备党员转正公示<a href="">(见参考例文5-2)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyFiveDisabled" label="4">4.支部大会讨论预备党员转正有关事项的记录<a href="">(见参考例文5-3)</a></Checkbox></Col>
        </Row>
        <Row>
          <Col span="9"><Checkbox :disabled="partyFiveDisabled" label="5">5.总支部委员会讨论预备党员转正的会议记录</Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyFiveDisabled" label="6">6.党支部上报审批关于预备党员转正的请示<a href="">(见参考例文5-7)</a></Checkbox></Col>
        </Row>
        
        <Row>
          <Col span="9"><Checkbox :disabled="partyFiveDisabled" label="7">7.上级党委审批预备党员按期转正的批复<a href="">(见参考例文5-10)</a></Checkbox></Col>
          <Col span="9"><Checkbox :disabled="partyFiveDisabled" label="8">8.预备党员转正审查登记表<a href="">(见表5-1)</a></Checkbox></Col>
        </Row>
        
        <Row>
          <Col span="9"><Checkbox :disabled="partyFiveDisabled" label="9">9.预备党员转正公示情况登记表<a href="">(见表5-2)</a></Checkbox></Col>
        </Row>
        <Row>
          其它参考例文:(<a href="">5-4</a>、<a href="">5-4</a>、<a href="">5-5</a>、<a href="">5-6</a>、<a href="">5-8</a>、<a href="">5-9</a>、<a href="">5-11</a>)
        </Row>
      </CheckboxGroup>
    </Row>
    <FormItem class="btn">
        <Button @click="prevToFour" >上一步</Button>
      <Button :disabled="partyFiveDisabled" type="primary" @click="handleSubmit('partInFiveForm')" style="margin-left: 8px">提交</Button>
      <Button :disabled="partyFiveDisabled" @click="handleReset('partInFiveForm')" style="margin-left: 8px">重置</Button>
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

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
  export default {
    name: 'partyInFive',
    components: { Treeselect },
    props:{
      prevToFour:{
        type: Function,
        default : function prevToFour() {
          
        }
      },
      partyFiveDisabled:{
        type: Boolean,
        default: false
      },
      currentState:{
        type: Number,
        default: 0
      },
      meetingDay:{
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
        departments:[],
        partInFiveForm: {
          mainId:0,
          partybranchId:null,
          branchName:'',
          partyteamName:'',
          jurationDay:null,
          becomeDay:null,
          publicityStartDay:null,
          publicityEndDay:null,
          meetingDay: null,
          voteTotal: 0,
          totalNum: 0,
          factNum: 0,
          affirmativeTicket: '',
          dissentingTicket:'',
          waiverTicket:'',
          resolution:'',
          discussionTime:null,
          membersNum:0,
          actualNum:0,
          agreeNum:0,
          extendStartDay:null,
          extendEndDay:null,
          partyStartDay:null,
          collator:'',
          note:''
        },
        partInFiveFormruleValidate: {
          jurationDay: [
            {required: true,type: 'date', message: '请填写入党宣誓时间', trigger: 'change' }
          ],
          becomeDay:[
            {required: true, type: 'date',message: '请填写申请转正时间', trigger: 'change'}
          ],
          publicityStartDay:[
            {required: true, type: 'date',message: '请填写转正公示开始时间', trigger: 'change'}
          ],
          publicityStartDay:[
            {required: true, type: 'date',message: '请填写转正公示结束时间', trigger: 'change'}
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
          resolution:[
            {required: true, message: '请输入会议决议', trigger: 'blur'}
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
          partyStartDay:[
            {required: true, type: 'date',message: '请输入党龄起算时间', trigger: 'change'}
          ],
          collator:[
            {required: true,message: '请输入档案整理人', trigger: 'blur'}
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
      orgSelect:function(node){
          this.partInFiveForm.partybranchId = node.did;
          this.partInFiveForm.branchName = node.title;
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
                this.checkAllGroup = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            } else {
                this.checkAllGroup = [];
            }
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
                    console.log('加载部门信息.....');
                    self.userForm.deptId =  self.userForm.deptId;
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
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          var self = this;
          if (valid) {
             self.partInFiveForm.tenantId = self.$constants.userInfo.tenantId;
             self.partInFiveForm.userId = self.$constants.userInfo.userId;
             self.partInFiveForm.userName = self.$constants.userInfo.name;
             self.partInFiveForm.jurationDay = self.$convertDate(self.partInFiveForm.jurationDay);
             self.partInFiveForm.becomeDay = self.$convertDate(self.partInFiveForm.becomeDay);
             self.partInFiveForm.publicityStartDay = self.$convertDate(self.partInFiveForm.publicityStartDay);
             self.partInFiveForm.publicityEndDay = self.$convertDate(self.partInFiveForm.publicityEndDay);
             self.partInFiveForm.meetingDay = self.$convertDate(self.partInFiveForm.meetingDay);
             self.partInFiveForm.discussionTime = self.$convertDate(self.partInFiveForm.discussionTime);
             self.partInFiveForm.checkDay = self.$convertDate(self.partInFiveForm.checkDay);
             self.partInFiveForm.partyStartDay = self.$convertDate(self.partInFiveForm.partyStartDay);
             self.partInFiveForm.extendStartDay = self.$convertDate(self.partInFiveForm.extendStartDay);
             self.partInFiveForm.extendEndDay = self.$convertDate(self.partInFiveForm.extendEndDay);
            
            if(self.checkAllGroup !=null && self.checkAllGroup.length >0){
                self.partInFiveForm.checkAll = self.checkAllGroup.join(',');
             }

             var voteTotal = self.partInFiveForm.voteTotal;
             var totalNum = self.partInFiveForm.totalNum;
             var actualNum = self.partInFiveForm.actualNum;
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
               var check = self.checkDate(self.partInFourForm.meetingDay, self.meetingDay);
                if(check){
                    self.$Message.success({
                        content: '预备期未满1年，不能确定为正式党员，请检查数据！',
                        duration: 3
                    });
                }else{
                  self.saveData();
                }
             }
          } else {
            this.$Message.error('表单校验失败，请输入必填项!');
          }
        })
      },
      saveData:function(){
        var self = this;
        var url = self.$constants.BIURL+'/political/employee/apply/five';
        var method = 'POST';
        if(self.partInFiveForm.id > 0){
            method='PUT';
        }
        self.$http({
            url:url,
            method:method,
            dataType:'json',
            data:self.partInFiveForm
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
                    if(self.partInFiveForm.id > 0){
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
      loadPartyInFiveData:function(){
        var self = this;
        this.$http({
          url:  this.$constants.BIURL +'/political/employee/apply/five/'+this.mainId,
          method: 'GET',
          dataType: 'json'
        }).then(function (response) {
          var data = response.data;
            if(data.code == 0){
              if(data.data && data.data !=null){
                  self.partInFiveForm = data.data;
                  if(self.partInFiveForm.checkAll !=null && self.partInFiveForm.checkAll != ''){
                    self.checkAllGroup =  self.partInFiveForm.checkAll.split(',');
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
      this.partInFiveForm.mainId = this.mainId;
      this.loadDepartment();
    },
    watch:{
      'currentState':function(value){
         if(value >= 4){
            this.loadPartyInFiveData();
         }
      }
    }
  }
</script>
