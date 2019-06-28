<template>
    <div class="bi-main-container">
      <Breadcrumb class="breadcrumb">
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>党建业务</BreadcrumbItem>
          <BreadcrumbItem>发展党员</BreadcrumbItem>
      </Breadcrumb>
      <div class="bi-container">
      <Steps :current="0">
          <Step title="进行中" content="申请入党"></Step>
          <Step title="待进行" content="入党积极分子的确定和培养教育"></Step>
          <Step title="待进行" content="发展对象的确定和考察"></Step>
          <Step title="待进行" content="预备党员的接收阶段"></Step>
          <Step title="待进行" content="预备党员的转正"></Step>
      </Steps>
      <Form class="partyForm" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
           <Col span="7">
            <FormItem label="姓名" prop="姓名">
              <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
            </FormItem>
           </Col>
           <Col span="7">
            <FormItem label="性别" prop="性别">
              <Select v-model="formValidate.city" placeholder="请选择性别">
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
              </Select>
            </FormItem>
           </Col>
           <Col span="7">
            <FormItem label="民族" prop="民族">
              <Input v-model="formValidate.name" placeholder="请选择名族"></Input>
            </FormItem>
           </Col>
        </Row>
        <Row>
           <Col span="7">
            <FormItem prop="date" label="出生日期">
                <DatePicker type="date" placeholder="出生日期" v-model="formValidate.date"></DatePicker>
            </FormItem>
           </Col>
           <Col span="7">
            <FormItem label="学历学位" prop="学历学位">
              <Input v-model="formValidate.name" placeholder="请选择学历学位"></Input>
            </FormItem>
           </Col>
           <Col span="7">
            <FormItem prop="籍贯" label="籍贯">
                <Input v-model="formValidate.name" placeholder="请输入籍贯"></Input>
            </FormItem>
           </Col>
        </Row>


        <Row>
           <Col span="7">
            <FormItem label="身份证号码" prop="身份证号码">
              <Input v-model="formValidate.name" placeholder="请输入身份证号码"></Input>
            </FormItem>
           </Col>
           <Col span="11">
            <FormItem label="单位、职务或职业" prop="单位、职务或职业">
              <Input v-model="formValidate.name" placeholder="请输入单位、职务或职业"></Input>
            </FormItem>
           </Col>
        </Row>
        <Row>
           <Col span="7">
            <FormItem label="联系电话" prop="联系电话">
              <Input v-model="formValidate.name" placeholder="请输入联系电话"></Input>
            </FormItem>
           </Col>
            <Col span="7">
           <FormItem prop="date" label="入党申请时间">
                <DatePicker type="date" placeholder="入党申请时间" v-model="formValidate.date"></DatePicker>
            </FormItem>
            </Col>
            <Col span="7">
            <FormItem label="支部派人谈话时间:" prop="支部派人谈话时间:">
              <DatePicker type="date" placeholder="谈话时间" v-model="formValidate.date"></DatePicker>
            </FormItem>
           </Col>
        </Row>
       
         <Row>
           <Col span="8">
              <span>入党申请书接收人:（单位、职务、签名） </span>
           </Col>
           <Col span="8" >
              <span :style="{'padding-left':'16px'}">谈话人:（单位、职务、签名） </span>
           </Col>
        </Row>
        <Row>
           <Col span="6">
            <FormItem label="" prop="入党申请书接收人:（单位、职务、签名）" :label-width="0">
              <Input v-model="formValidate.name" placeholder="请输入联系电话"></Input>
            </FormItem>
           </Col>
           <Col span="8">
            <FormItem label="" prop="谈话人:（单位、职务、签名）" :label-width="100">
              <Input v-model="formValidate.name" placeholder="请输入谈话人"></Input>
            </FormItem>
           </Col>
        </Row>
    
        <Row class="partyTip">
          <span>此阶段须准备的材料:(所需材料必须确认全部完成才能进入下一阶段)， </span>
        </Row>
        <Row>
          <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="1.入党申请书"></Checkbox>
                <Checkbox label="2.党组织派人谈话的记录材料"></Checkbox>
           
            </CheckboxGroup>
        </Row>
        <FormItem class="btn">
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
      </div>
    </div>
</template>

<style scoped>
  .partyIn{
    padding: 15px;
  }

  .partyForm{
    padding: 20px;
  }

  .partyTip{
    padding: 10px 5px;
  }

  .btn{
    padding: 10px 0px;
    text-align: center
  }
</style>

<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>