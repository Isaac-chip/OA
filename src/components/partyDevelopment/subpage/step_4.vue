<template>
  <div class="step step_4">
    <h3 class="step_head">预备党员的接收阶段</h3>
    <section class="step_contant">
      <Form ref="" :model="formValidate" :rules="ruleValidate">
        <!-- <Form ref="" :model="formValidate" :rules="ruleValidate" :label-width="140"> -->
        <Row type="flex" justify="space-between">
          <Col span="11">
          <section>
            <FormItem label="支部审查时间:" required prop="param1">
              <DatePicker type="date" v-model="formValidate.param1"></DatePicker>
              </Input>
            </FormItem>
            <FormItem label="入党志愿书编号:" required prop="param2">
              <Input type="text" v-model="formValidate.param2">
              </Input>
            </FormItem>
            <FormItem label="有表决权党员人数:" required prop="param21">
              <Input type="text" v-model="formValidate.param21">
              </Input>
            </FormItem>
            <FormItem label="实到人数:" required prop="param3">
              <Input type="number" v-model="formValidate.param3">
              </Input>
            </FormItem>
            <FormItem label="反对票数:" required prop="param4">
              <Input type="number" v-model="formValidate.param4">
              </Input>
            </FormItem>
            <FormItem label="党总支审议时间:" required prop="param5">
              <DatePicker type="date" v-model="formValidate.param5"></DatePicker>
            </FormItem>
            <FormItem label="谈话人姓名:（单位、职务、签名）:" required prop="param6">
              <Input type="text" v-model="formValidate.param6">
              </Input>
            </FormItem>
            <FormItem label="党委委员人数:" required prop="param7">
              <Input type="number" v-model="formValidate.param7">
              </Input>
            </FormItem>
            <FormItem label="同意人数:" required prop="param8">
              <Input type="number" v-model="formValidate.param8">
              </Input>
            </FormItem>
            <FormItem label="预备期结束时间:" required prop="param9">
              <DatePicker type="date" v-model="formValidate.param9"></DatePicker>
            </FormItem>
          </section>
          </Col>
          <Col span="11">
          <section>
            <FormItem label="党委预审时间:" required prop="param10">
              <DatePicker type="date" v-model="formValidate.param10"></DatePicker>
            </FormItem>
            <FormItem label="支部大会讨论会议时间:" required prop="param11">
              <DatePicker type="date" v-model="formValidate.param11"></DatePicker>
            </FormItem>
            <FormItem label="应到人数:" required prop="param12">
              <Input type="number" v-model="formValidate.param12">
              </Input>
            </FormItem>
            <FormItem label="赞成票数:" required prop="param13">
              <Input type="number" v-model="formValidate.param13">
              </Input>
            </FormItem>
            <FormItem label="弃权票数:" required prop="param14">
              <Input type="number" v-model="formValidate.param14">
              </Input>
            </FormItem>
            <FormItem label="党委派人谈话时间:" required prop="param15">
              <DatePicker type="date" v-model="formValidate.param15"></DatePicker>
            </FormItem>
            <FormItem label="党委审批时间:" required prop="param16">
              <DatePicker type="date" v-model="formValidate.param16"></DatePicker>
            </FormItem>
            <FormItem label="实到人数:" required prop="param17">
              <Input type="number" v-model="formValidate.param17">
              </Input>
            </FormItem>
            <FormItem label="预备期开始时间:" required prop="param18">
              <DatePicker type="date" v-model="formValidate.param18"></DatePicker>
            </FormItem>
            <FormItem label="向上级党委组织部门备案时间:" required prop="param19">
              <DatePicker type="date" v-model="formValidate.param19"></DatePicker>
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
                <!-- <Checkbox label="check1">1.发展对象预审请示(见参考例文4-1)</Checkbox>
                <Checkbox label="check2">2.上级党委关于发展对象预审的意见(见参考例文4-2)</Checkbox>
                <Checkbox label="check3">3.本人填写《中国共产党入党志愿书》</Checkbox>
                <Checkbox label="check4">4.接收预备党员表决票</Checkbox>
                <Checkbox label="check5">5.支部大会讨论接收预备党员的会议记录(见参考例文4-4)</Checkbox>
                <Checkbox label="check6">6.总支部委员会讨论接受预备党员的会议记录</Checkbox>
                <Checkbox label="check7">7.党支部上报审批预备党员的请示</Checkbox>
                <Checkbox label="check8">8.上级党委派人谈话记录</Checkbox>
                <Checkbox label="check9">9.上级党委审批预备党员的批复(见参考例文4-6)</Checkbox>
                <Checkbox label="check7">10.上级党委上报进行接收预备党员备案的报告(见参考例文4-7)</Checkbox> -->

                <Checkbox label="check1">1.发展对象预审请示(
                  <a href="http://www.kingtelo.com/partyAffairs/4/参考例文4-1：关于对×××同志进行预审的请示.doc">见参考例文4-1</a>)</Checkbox>
                <Checkbox label="check2">2.上级党委关于发展对象预审的意见(
                  <a href="http://www.kingtelo.com/partyAffairs/4/参考例文4-2：对×××同志预审的意见.doc">见参考例文4-2</a>)</Checkbox>
                <Checkbox label="check3">3.本人填写《中国共产党入党志愿书》</Checkbox>
                <Checkbox label="check4">4.接收预备党员表决票</Checkbox>
                <Checkbox label="check5">5.支部大会讨论接收预备党员的会议记录(
                  <a href="http://www.kingtelo.com/partyAffairs/4/参考例文4-4：支部大会讨论接收预备党员会议记录.doc">见参考例文4-4</a>)</Checkbox>
                <Checkbox label="check6">6.总支部委员会讨论接受预备党员的会议记录</Checkbox>
                <Checkbox label="check7">7.党支部上报审批预备党员的请示</Checkbox>
                <Checkbox label="check8">8.上级党委派人谈话记录</Checkbox>
                <Checkbox label="check9">9.上级党委审批预备党员的批复(
                  <a href="http://www.kingtelo.com/partyAffairs/4/参考例文4-6：关于同意接收×××同志为中共预备党员的批复.doc">见参考例文4-6</a>)</Checkbox>
                <Checkbox label="check10">10.上级党委上报进行接收预备党员备案的报告(
                  <a href="http://www.kingtelo.com/partyAffairs/4/参考例文4-7：关于将×××等×名同志进行预备党员备案的报告.doc">见参考例文4-7</a>)</Checkbox>
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
      ruleValidate: {},
      formValidate: {},
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      checkCount: 10
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
