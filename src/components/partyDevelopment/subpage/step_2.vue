<template>
  <div class="step step_2">
    <h3 class="step_head">入党积极分子的确定和培养教育</h3>
    <section class="step_contant">
      <Form ref="" :model="formValidate" :rules="ruleValidate">
        <!-- <Form ref="" :model="formValidate" :rules="ruleValidate" :label-width="140"> -->
        <Row>
          <col span="24">
          <section>
            <FormItem label="党员推荐情况:">
              <Input type="text" v-model="formValidate.param1">
              </Input>
            </FormItem>
            <FormItem label="群团组织推优情况:">
              <Input type="text" v-model="formValidate.param2">
              </Input>
            </FormItem>
          </section>
          </col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="11">
          <section>
            <FormItem label="支部确定入党积极分子时间:" required prop="param3">
              <DatePicker type="date" v-model="formValidate.param3"></DatePicker>
              </Input>
            </FormItem>
            <FormItem label="党委备案时间:" required prop="param4">
              <DatePicker type="date" v-model="formValidate.param4"></DatePicker>
            </FormItem>
            <FormItem label="培养联系人:" required prop="param5">
              <Input type="text" v-model="formValidate.param5">
              </Input>
            </FormItem>
            <FormItem label="培养联系人:" required prop="param6">
              <Input type="text" v-model="formValidate.param6">
              </Input>
            </FormItem>
          </section>
          </Col>
          <Col span="11">
          <section>
            <FormItem label="党总支审议时间:" required prop="param7">
              <DatePicker type="date" v-model="formValidate.param7"></DatePicker>
              </Input>
            </FormItem>
            <FormItem label="">
              &nbsp;
            </FormItem>
            <FormItem label="单位及职务:" required prop="param8">
              <Input type="text" v-model="formValidate.param8">
              </Input>
            </FormItem>
            <FormItem label="单位及职务:" required prop="param9">
              <Input type="text" v-model="formValidate.param9">
              </Input>
            </FormItem>
          </section>
          </Col>
        </Row>
        <Row>
          <col span="24">
          <section>
            <!-- <h4>书面思想汇报时间:</h4> -->
            <FormItem label="书面思想汇报时间:" required>
              <Date-picker type="datetimerange" format="yyyy-MM-dd" style="width:100%"></Date-picker>
            </FormItem>
            <FormItem required>
              <Date-picker type="datetimerange" format="yyyy-MM-dd" style="width:100%"></Date-picker>
            </FormItem>
            <FormItem>
              <Date-picker type="datetimerange" format="yyyy-MM-dd" style="width:100%"></Date-picker>
            </FormItem>
            <FormItem>
              <Date-picker type="datetimerange" format="yyyy-MM-dd" style="width:100%"></Date-picker>
            </FormItem>
          </section>
          </col>
          <col span="24">
          <section>
            <!-- <h4>支部考察时间:</h4> -->
            <FormItem label="支部考察时间:" required>
              <Date-picker type="datetimerange" format="yyyy-MM-dd" style="width:100%"></Date-picker>
            </FormItem>
            <FormItem>
              <Date-picker type="datetimerange" format="yyyy-MM-dd" style="width:100%"></Date-picker>
            </FormItem>
          </section>
          </col>
          <col span="24">
          <section>
            <FormItem label="备注:">
              <Input type="textarea" v-model="formValidate.param11">
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
                <!-- <Checkbox label="check1">1.申请人的思想汇报(见参考例文2-3)</Checkbox>
                <Checkbox label="check2">2.入党积极分子党员推荐表(见表2-1)</Checkbox>
                <Checkbox label="check3">3.支部委员会（支部大会）研究确定入党积极分子的会议记录(见参考例文2-1)</Checkbox>
                <Checkbox label="check4">4.总支部委员会研究确定入党积极分子的会议记录</Checkbox>
                <Checkbox label="check5">5.入党积极分子备案登记表(见表2-2)</Checkbox>
                <Checkbox label="check6">6.报上级党委备案的文件(见参考例文2-2)</Checkbox>
                <Checkbox label="check7">7.上级党委备案同意的文件</Checkbox>
                <Checkbox label="check8">8.入党积极分子培训证书</Checkbox>
                <Checkbox label="check9">9.入党积极分子培养考察表
                  <a href="http://www.kingtelo.com/partyAffairs/2/表2-2：入党积极分子备案登记表.doc" target="_blank">(见表2-3)</a>
                </Checkbox> -->
                <Checkbox label="check1">1.申请人的思想汇报(
                  <a href="http://www.kingtelo.com/partyAffairs/2/参考例文2-3：思想汇报.doc">见参考例文2-3</a>)</Checkbox>
                <Checkbox label="check2">2.入党积极分子党员推荐表(
                  <a href="http://www.kingtelo.com/partyAffairs/2/表2-1：推荐入党积极分子人选登记表.doc">见表2-1</a>)</Checkbox>
                <Checkbox label="check3">3.支部委员会（支部大会）研究确定入党积极分子的会议记录(
                  <a href="http://www.kingtelo.com/partyAffairs/2/参考例文2-1：支部委员会（支部大会）确定入党积极分子会议记录.doc">见参考例文2-1</a>)</Checkbox>
                <Checkbox label="check4">4.总支部委员会研究确定入党积极分子的会议记录</Checkbox>
                <Checkbox label="check5">5.入党积极分子备案登记表(
                  <a href="http://www.kingtelo.com/partyAffairs/2/表2-2：入党积极分子备案登记表.doc">见表2-2</a>)</Checkbox>
                <Checkbox label="check6">6.报上级党委备案的文件(
                  <a href="http://www.kingtelo.com/partyAffairs/2/参考例文2-2：关于将×××同志进行入党积极分子备案的报告.doc">见参考例文2-2</a>)</Checkbox>
                <Checkbox label="check7">7.上级党委备案同意的文件</Checkbox>
                <Checkbox label="check5">8.入党积极分子培训证书</Checkbox>
                <Checkbox label="check9">9.入党积极分子培养考察表(
                  <a href="http://www.kingtelo.com/partyAffairs/2/表2-3：入党积极分子培养考察登记表.doc">见表2-3</a>)</Checkbox>
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
