<template>
  <div class="step step_5">
    <h3 class="step_head">预备党员的转正</h3>
    <section class="step_contant">
      <Form ref="" :model="formValidate" :rules="ruleValidate">
        <!-- <Form ref="" :model="formValidate" :rules="ruleValidate" :label-width="140"> -->
        <Row type="flex" justify="space-between">
          <Col span="11">
          <section>
            <FormItem label="编入党支部名称:" required prop="param1">
              <Select v-model="formValidate.param1">
                <Option v-for="(item,index) in option" :key="index" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem label="入党宣誓时间:" required prop="param2">
              <DatePicker type="date" v-model="formValidate.param2"></DatePicker>
              </Input>
            </FormItem>
            <FormItem label="转正公示开始时间:" required prop="param3">
              <DatePicker type="date" v-model="formValidate.param3"></DatePicker>
              </Input>
            </FormItem>
            <FormItem label="支部大会讨论会议时间:" required prop="param4">
              <DatePicker type="date" v-model="formValidate.param4"></DatePicker>
              </Input>
            </FormItem>
            <FormItem label="应到人数:" required prop="param5">
              <Input type="number" v-model="formValidate.param5">
              </Input>
            </FormItem>
            <FormItem label="赞成票数:" required prop="param6">
              <Input type="number" v-model="formValidate.param6">
              </Input>
            </FormItem>
            <FormItem label="弃权票数:" required prop="param7">
              <Input type="number" v-model="formValidate.param7">
              </Input>
            </FormItem>
            <FormItem label="党总支审议时间::" required prop="param8">
              <DatePicker type="date" v-model="formValidate.param8"></DatePicker>
            </FormItem>
            <FormItem label="党委委员人数:" required prop="param9">
              <Input type="number" v-model="formValidate.param9">
              </Input>
            </FormItem>
            <FormItem label="同意人数:" required prop="param10">
              <Input type="number" v-model="formValidate.param10">
              </Input>
            </FormItem>
            <FormItem label="延长预备期开始时间:">
              <DatePicker type="date" v-model="formValidate.param12"></DatePicker>
            </FormItem>
            <FormItem label="档案整理人:" required prop="param12">
              <Input type="text" v-model="formValidate.param12">
              </Input>
            </FormItem>
          </section>
          </Col>
          <Col span="11">
          <section>
            <FormItem label="编入党小组名称:" style="margin-bottom:24px;">
              <Input type="text" v-model="formValidate.param13">
              </Input>
            </FormItem>
            <FormItem label="申请转正时间:" required prop="param14">
              <DatePicker type="date" v-model="formValidate.param14"></DatePicker>
            </FormItem>
            <FormItem label="转正公示结束时间:" required prop="param15">
              <DatePicker type="date" v-model="formValidate.param15"></DatePicker>
            </FormItem>
            <FormItem label="有表决权党员人数:" required prop="param16">
              <Input type="number" v-model="formValidate.param16">
              </Input>
            </FormItem>
            <FormItem label="实到人数:" required prop="param17">
              <Input type="number" v-model="formValidate.param17">
              </Input>
            </FormItem>
            <FormItem label="反对票数:" required prop="param18">
              <Input type="number" v-model="formValidate.param18">
              </Input>
            </FormItem>
            <FormItem label="会议决议（按期转正、延长预备期一年/半年、取消预备党员资格）:" required prop="param19">
              <Input type="text" v-model="formValidate.param19">
              </Input>
            </FormItem>
            <FormItem label="党委审批时间:" required prop="param20">
              <DatePicker type="date" v-model="formValidate.param20"></DatePicker>
            </FormItem>
            <FormItem label="实到人数:" required prop="param21">
              <Input type="number" v-model="formValidate.param21">
              </Input>
            </FormItem>
            </FormItem>
            <FormItem label="党龄起算时间:" required prop="param22">
              <DatePicker type="date" v-model="formValidate.param22"></DatePicker>
            </FormItem>
            </FormItem>
            <FormItem label="延长预备期结束时间:">
              <DatePicker type="date" v-model="formValidate.param23"></DatePicker>
            </FormItem>
          </section>
          </Col>
        </Row>
        <Row>
          <col span="24">
          <section>
            <FormItem label="备注:">
              <Input type="textarea" v-model="formValidate.param20">
              </Input>
            </FormItem>
          </section>
          </col>
          <Col span="24">
          <section class="tips">
            <FormItem :label-width="0">
              <h4>此阶段须准备的材料:(所需材料必须确认全部完成才能进入下一阶段)</h4>
            </FormItem>
            <FormItem :label-width="0">
              <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="_handleCheckAll">全选</Checkbox>
              </div>
              <CheckboxGroup v-model="checkAllGroup" @on-change="_checkAllGroupChange">
                <!-- <Checkbox label="check1">1.转正申请书(见参考例文5-1)</Checkbox>
                <Checkbox label="check2">2.支部委员会（不设支部委员会的由支部大会）讨论预备党员转正会议记录</Checkbox>
                <Checkbox label="check3">3.预备党员转正公示(见参考例文5-2)</Checkbox>
                <Checkbox label="check4">4.支部大会讨论预备党员转正有关事项的记录(见参考例文5-3)</Checkbox>
                <Checkbox label="check5">5.总支部委员会讨论预备党员转正的会议记录</Checkbox>
                <Checkbox label="check6">6.党支部上报审批关于预备党员转正的请示(见参考例文5-7)</Checkbox>
                <Checkbox label="check7">7.上级党委审批预备党员按期转正的批复(见参考例文5-10)</Checkbox>
                <Checkbox label="check8">8.预备党员转正审查登记表(见表5-1)</Checkbox>
                <Checkbox label="check9">9.预备党员转正公示情况登记表(见表5-2)</Checkbox> -->
                <Checkbox label="check1">1.转正申请书(
                  <a href="http://www.kingtelo.com/partyAffairs/5/参考例文5-1：转正申请书.doc">见参考例文5-1</a>)</Checkbox>
                <Checkbox label="check2">2.支部委员会（不设支部委员会的由支部大会）讨论预备党员转正会议记录</Checkbox>
                <Checkbox label="check3">3.预备党员转正公示(
                  <a href="http://www.kingtelo.com/partyAffairs/5/参考例文5-2：关于拟将×××同志转为中共正式党员的公示.doc">见参考例文5-2</a>)</Checkbox>
                <Checkbox label="check4">4.支部大会讨论预备党员转正有关事项的记录(
                  <a href="http://www.kingtelo.com/partyAffairs/5/参考例文5-3：支部大会讨论预备党员转正会议记录.doc">见参考例文5-3</a>)</Checkbox>
                <Checkbox label="check5">5.总支部委员会讨论预备党员转正的会议记录</Checkbox>
                <Checkbox label="check6">6.党支部上报审批关于预备党员转正的请示(
                  <a href="http://www.kingtelo.com/partyAffairs/5/参考例文5-7：关于审批×××同志转为中共正式党员的请示.doc">见参考例文5-7</a>)</Checkbox>
                <Checkbox label="check7">7.上级党委审批预备党员按期转正的批复(
                  <a href="http://www.kingtelo.com/partyAffairs/5/参考例文5-10：关于同意×××同志转为中共正式党员的批复.doc">见参考例文5-10</a>)</Checkbox>
                <Checkbox label="check8">8.预备党员转正审查登记表(
                  <a href="http://www.kingtelo.com/partyAffairs/5/表5-1：预备党员转正审查登记表.doc">见表5-1</a>)</Checkbox>
                <Checkbox label="check9">9.预备党员转正公示情况登记表(
                  <a href="http://www.kingtelo.com/partyAffairs/5/表5-2：预备党员转正公示情况登记表.doc">见表5-2</a>)</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </section>
          </Col>
        </Row>
      </Form>
    </section>
  </div>
</template>
<script>
export default {
  name: 'StepOne',
  data() {
    return {
      option: ['1', '2'],
      ruleValidate: {},
      formValidate: {},
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      checkCount: 9
    }
  },
  methods: {
    _handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.checkAllGroup = []
        const count = this.checkCount + 1
        for (let i = 1; i < count; i++) {
          this.checkAllGroup.push('check' + i)
        }
        // this.checkAllGroup = ['check1', 'check2']
      } else {
        this.checkAllGroup = []
      }
    },
    _checkAllGroupChange(data) {
      if (data.length === this.checkCount) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    }
  }
}
</script>
<style lang="less">
.step {
  .step_head {
    text-align: center;
    margin-bottom: 10px;
  }
  .step_contant {
    .ivu-date-picker {
      width: 100%;
    }
    .tips {
      .ivu-form-item {
        margin-bottom: 0px;
      }
    }
  }
}
</style>
