<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>党讯管理</BreadcrumbItem>
      <BreadcrumbItem>内容发布</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">
      <Row class="header">
        <Button @click="addContent = true">新增</Button>
      </Row>
    </div>

    <Modal v-model="addContent" title="新增内容">
      <div>
        <Col>
          <Tabs type="card">
            <TabPane label="基本信息"></TabPane>
          </Tabs>
          所属栏目：
          <Select></Select>
          主标题：
          <Input v-model="formValidate.title" placeholder="请输入标题..."/>
          标题图片/资料：
          <Row>
            <Input type="" placeholder="请插入图片" style="width: 80%"/>
            <Button @click="choosePic">选择图片</Button>
          </Row>
          <p>创建时间：</p>
          <DatePicker type="datetime" placeholder="选择创建时间" style="width: 100%"></DatePicker>
          有效时间：
          <DatePicker type="datetime" placeholder="选择有效时间" style="width: 100%"></DatePicker>
          序号：
          <Input v-model="formValidate.number" placeholder=""/>
          <Row>
            发布状态：
            <RadioGroup v-model="formValidate.published">
              <Radio label="已发布"></Radio>
              <Radio label="未发布"></Radio>
            </RadioGroup>
          </Row>
          <Row>
            是否置顶：
            <Checkbox v-model="formValidate.isTop">置顶</Checkbox>
          </Row>
          <Row>
            每日推送：
            <Checkbox v-model="formValidate.isEverydayPush">每日推送</Checkbox>
          </Row>
        </Col>


      </div>
    </Modal>

  </div>

</template>

<script>
  export default {
    name: 'contentPublish',
    data(){
      return {
        addContent:false,
        formValidate:{
          column:'',
          title:'',
          pic:'',
          createTime:'',
          endTime:'',
          number:'',
          published:'已发布',
          isTop:false,
          isEverydayPush:false,
        },
        method:{
          choosePic:{

          },
        }
      }
    }

  }
</script>

<style scoped>

</style>
