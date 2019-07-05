<template>
  <div class="step step_3">
    <h3 class="step_head">发展对象的确定和考察</h3>
    <section class="step_contant">
      <Form ref="" :model="formValidate" :rules="ruleValidate">
        <!-- <Form ref="" :model="formValidate" :rules="ruleValidate" :label-width="140"> -->
        <Row type="flex" justify="space-between">
          <Col span="11">
          <section>
            <FormItem label="支部确定发展对象人选时间:" required prop="param1">
              <DatePicker type="date" v-model="formValidate.param1"></DatePicker>
              </Input>
            </FormItem>
            <FormItem label="公示结束时间:" required prop="param2">
              <DatePicker type="date" v-model="formValidate.param2"></DatePicker>
            </FormItem>
            <FormItem label="党委备案同意时间:" required prop="param3">
              <DatePicker type="date" v-model="formValidate.param3"></DatePicker>
            </FormItem>
            <FormItem label="入党介绍人:" required prop="param4">
              <Input type="text" v-model="formValidate.param4">
              </Input>
            </FormItem>
            <FormItem label="政审人:（单位、职务、签名）:" required prop="param6">
              <Input type="text" v-model="formValidate.param6">
              </Input>
            </FormItem>
            <FormItem label="参加发展对象集中培训开始时间:" required prop="param7">
              <DatePicker type="date" v-model="formValidate.param7"></DatePicker>
            </FormItem>
            <FormItem label="培训成绩:" required prop="param8">
              <Input type="text" v-model="formValidate.param8">
              </Input>
            </FormItem>
          </section>
          </Col>
          <Col span="11">
          <section>
            <FormItem label="公示开始时间::" required prop="param9">
              <DatePicker type="date" v-model="formValidate.param9"></DatePicker>
            </FormItem>
            <FormItem label="党总支审议时间:" required prop="param10">
              <DatePicker type="date" v-model="formValidate.param10"></DatePicker>
            </FormItem>
            <FormItem label=" " style="height:51px;margin-bottom:24px;">

            </FormItem>
            <FormItem label="单位及职务:" required prop="param11">
              <Input type="text" v-model="formValidate.param11">
              </Input>
            </FormItem>
            <FormItem label="单位及职务:" required prop="param12">
              <Input type="text" v-model="formValidate.param12">
              </Input>
            </FormItem>
            <FormItem label="政审是否合格" required prop="param13">
              <Input type="text" v-model="formValidate.param13">
              </Input>
            </FormItem>
            <FormItem label="参加发展对象集中培训开始时间:" required prop="param14">
              <DatePicker type="date" v-model="formValidate.param14"></DatePicker>
            </FormItem>
          </section>
          </Col>
        </Row>
        <Row>
          <col span="24">
          <section>
            <FormItem label="备注:">
              <Input type="textarea" v-model="formValidate.param15">
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
                <!-- <Checkbox label="check1">1.发展对象党员推荐表</Checkbox>
                <Checkbox label="check2">2.支委会讨论发展对象人选会议记录(见参考例文3-1)</Checkbox>
                <Checkbox label="check3">3.支部大会讨论发展对象人选会议记录(见参考例文3-1)</Checkbox>
                <Checkbox label="check4">4.总支部委员会研究确定发展对象的会议记录</Checkbox>
                <Checkbox label="check5">5.发展对象人选公示(见参考例文3-2)</Checkbox>
                <Checkbox label="check6">6.发展对象备案请示(见参考例文3-3)</Checkbox>
                <Checkbox label="check7">7.上级党委发展对象备案批复</Checkbox>
                <Checkbox label="check8">8.个人自传(见参考例文3-4)</Checkbox>
                <Checkbox label="check9">9.发展对象政治审查材料(见参考例文3-5、见参考例文3-6)</Checkbox>
                <Checkbox label="check6">10.发展对象短期集中培训证书</Checkbox>
                <Checkbox label="check7">11.党支部政审报告(见参考例文3-7)</Checkbox>
                <Checkbox label="check8">12.发展对象人选备案登记表(见表3-1)</Checkbox>
                <Checkbox label="check9">13.发展对象人选公示情况登记表(见表3-2)</Checkbox> -->

                <Checkbox label="check1">1.发展对象党员推荐表</Checkbox>
                <Checkbox label="check2">2.支委会讨论发展对象人选会议记录(
                  <a href="http://www.kingtelo.com/partyAffairs/3/参考例文3-1：支部委员会（支部大会）讨论发展对象人选会议记录.doc">见参考例文3-1</a>)</Checkbox>
                <Checkbox label="check3">3.支部大会讨论发展对象人选会议记录(
                  <a href="http://www.kingtelo.com/partyAffairs/3/参考例文3-1：支部委员会（支部大会）讨论发展对象人选会议记录.doc">见参考例文3-1</a>)</Checkbox>
                <Checkbox label="check4">4.总支部委员会研究确定发展对象的会议记录</Checkbox>
                <Checkbox label="check5">5.发展对象人选公示(
                  <a href="http://www.kingtelo.com/partyAffairs/3/参考例文3-2：关于确定×××同志为发展对象人选的公示.doc">见参考例文3-2</a>)</Checkbox>
                <Checkbox label="check6">6.发展对象备案请示(
                  <a href="http://www.kingtelo.com/partyAffairs/3/参考例文3-3：关于将×××同志进行发展对象备案的报告.doc">见参考例文3-3</a>)</Checkbox>
                <Checkbox label="check7">7.上级党委发展对象备案批复</Checkbox>
                <Checkbox label="check8">8.个人自传(
                  <a href="http://www.kingtelo.com/partyAffairs/3/参考例文3-4：自传.doc">见参考例文3-4</a>)</Checkbox>
                <Checkbox label="check9">9.发展对象政治审查材料(
                  <a href="http://www.kingtelo.com/partyAffairs/3/参考例文3-5：发展对象政治审查函.doc">见参考例文3-5</a>、
                  <a href="http://www.kingtelo.com/partyAffairs/3/参考例文3-6：发展对象政治审查回函.doc">见参考例文3-6</a>)</Checkbox>
                <Checkbox label="check10">10.发展对象短期集中培训证书</Checkbox>
                <Checkbox label="check11">11.党支部政审报告(
                  <a href="http://www.kingtelo.com/partyAffairs/3/参考例文3-7：关于×××同志政治审查情况的报告.doc">见参考例文3-7</a>)</Checkbox>
                <Checkbox label="check12">13.发展对象人选备案登记表(
                  <a href="http://www.kingtelo.com/partyAffairs/3/表3-1：发展对象人选备案登记表.doc">见表3-1</a>)
                </Checkbox>
                <Checkbox label="check13">14.发展对象人选公示情况登记表(
                  <a href="http://www.kingtelo.com/partyAffairs/3/表3-2：发展对象人选公示情况登记表.doc">见表3-2</a>)</Checkbox>
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
      nationOption: ['汉', '回'],
      educationOption: ['小学', '高中'],
      sexOption: ['男', '女'],
      ruleValidate: {},
      formValidate: {},
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      checkCount: 13
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
