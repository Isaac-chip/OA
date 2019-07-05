<template>
  <div class="step step_1">
    <h3 class="step_head">入党申请</h3>
    <section class="step_contant">
      <Form ref="" :model="formValidate" :rules="ruleValidate">
        <!-- <Form ref="" :model="formValidate" :rules="ruleValidate" :label-width="140"> -->
        <Row type="flex" justify="space-between">
          <!-- <Row> -->
          <Col span="11">
          <section>
            <FormItem label="姓名:" required prop="name">
              <Input type="text" v-model="formValidate.name">
              </Input>
            </FormItem>
            <FormItem label="民族：" required prop="nation">
              <Select v-model="formValidate.nation">
                <Option v-for="(item,index) in nationOption" :key="index" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem label="学历学位:" required prop="education">
              <Select v-model="formValidate.education">
                <Option v-for="(item,index) in educationOption" :key="index" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem label="身份证:" required prop="idCard">
              <Input type="number" v-model="formValidate.idCard">
              </Input>
            </FormItem>
            <FormItem label="联系电话:" required prop="phone">
              <Input type="tel" v-model="formValidate.phone">
              </Input>
            </FormItem>
            <FormItem label="申请入党时间:" required prop="startDate">
              <DatePicker type="date" v-model="formValidate.startDate"></DatePicker>
            </FormItem>
            <FormItem label="支部派人谈话时间:" required prop="talkDate">
              <DatePicker type="date" v-model="formValidate.talkDate"></DatePicker>
            </FormItem>
          </section>
          </Col>
          <Col span="11">
          <section>
            <FormItem label="性别:" required prop="sex">
              <Select v-model="formValidate.sex">
                <Option v-for="(item,index) in sexOption" :key="index" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem label="出生日期:" required prop="bornDate">
              <DatePicker type="date" v-model="formValidate.bornDate"></DatePicker>
            </FormItem>
            <FormItem label="籍贯:" required prop="native">
              <Input type="text" v-model="formValidate.native">
              </Input>
            </FormItem>
            <FormItem label="入党申请书接收人:（单位、职务、签名" required prop="receiver">
              <Input type="text" v-model="formValidate.receiver">
              </Input>
            </FormItem>
            <FormItem label="谈话人:（单位、职务、签名" required prop="talker">
              <Input type="text" v-model="formValidate.talker">
              </Input>
            </FormItem>
          </section>
          </Col>
        </Row>
        <Row>
          <col>
          <section>
            <FormItem label="家庭详细住址:" required prop="address">
              <Input type="text" v-model="formValidate.address">
              </Input>
            </FormItem>
          </section>
          </col>
        </Row>
        <Row>
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
                <!-- <Checkbox label="check1">1.入党申请书(见参考例文1-1)</Checkbox>
                <Checkbox label="check2">2.党组织派人谈话的记录材料(见参考例文1-2)</Checkbox> -->
                <Checkbox label="check1">1.入党申请书 (
                  <a href="http://www.kingtelo.com/partyAffairs/1/参考例文1-1：入党申请书.doc">见参考例文1-1</a>)</Checkbox>
                <Checkbox label="check2">2.党组织派人谈话的记录材料(
                  <a href="http://www.kingtelo.com/partyAffairs/1/参考例文1-2：同入党申请人的谈话记录.doc">见参考例文1-2</a>)</Checkbox>
              </CheckboxGroup>
              <!-- <Checkbox v-model="all">全选</Checkbox>
              <Checkbox v-model="formValidate.application">1.入党申请书(见参考例文1-1)</Checkbox>
              <Checkbox v-model="formValidate.record">2.党组织派人谈话的记录材料(见参考例文1-2)</Checkbox> -->
            </FormItem>
          </section>
          </Col>
        </Row>
      </Form>
    </section>
  </div>
</template>
<script>
import CheckIdentityCode from '@/libs/id_card_help.js'
export default {
  name: 'StepOne',
  data() {
    return {
      nationOption: ['汉', '回'],
      educationOption: ['小学', '高中'],
      sexOption: ['男', '女'],
      ruleValidate: {
        name: [],
        nation: [],
        education: [],
        idCard: [],
        phone: [],
        startDate: [],
        talkDate: [],
        sex: [],
        bornDate: [],
        native: [],
        receiver: [],
        talker: [],
        address: []
      },
      formValidate: {
        name: '',
        nation: '',
        education: '',
        idCard: '',
        phone: '',
        startDate: '',
        talkDate: '',
        sex: '',
        bornDate: '',
        native: '',
        receiver: '',
        talker: '',
        address: '',
        application: false,
        record: false
      },
      indeterminate: false,
      checkAll: false,
      checkAllGroup: []
    }
  },
  mounted() {},
  methods: {
    _handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.checkAllGroup = ['check1', 'check2']
      } else {
        this.checkAllGroup = []
      }
    },
    _checkAllGroupChange(data) {
      if (data.length === 2) {
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

