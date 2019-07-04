<template>
  <div>
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>党建考核</BreadcrumbItem>
      <BreadcrumbItem to="/partyAm/partySpecialResult">专项考核</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">
      <div class="back-view amback">
        <router-link to="/partyAm/partySpecialResult">
          <img src="@/assets/images/back.png"/>
          <span>返回专项考核</span>
        </router-link>
      </div>
      <div class="bi_custom_title">考核上报内容</div>
      <div class="bi_custom_table">
        <Row>
          <Col span="16">
            <Row>
              <Col span="4">
                <div class="table_title">用户名:</div>
              </Col>
              <Col span="8">
                <div class="table_content">{{resultDetail.name}}</div>
              </Col>
              <Col span="4">
                <div class="table_title">考核责任项:</div>
              </Col>
              <Col span="8">
                <div class="table_content">{{resultDetail.amTitle}}</div>
              </Col>
            </Row>
            <Row>
              <Col span="4">
                <div class="table_title">考核清单:</div>
              </Col>
              <Col span="8">
                <div class="table_content">{{resultDetail.topicTitle}}</div>
              </Col>
              <Col span="4">
                <div class="table_title">填报标题:</div>
              </Col>
              <Col span="8">
                <div class="table_content">{{resultDetail.reportTitle}}</div>
              </Col>
            </Row>

            <Row>
              <Col span="4">
                <div class="table_title">考核时间:</div>
              </Col>
              <Col span="8">
                <div class="table_content">{{resultDetail.reportTime}}</div>
              </Col>
              <Col span="4">
                <div class="table_title">考核内容:</div>
              </Col>
              <Col span="8">
                <div class="table_content">{{resultDetail.reportContext}}</div>
              </Col>
            </Row>

            <Row>
              <Col span="4">
                <div class="table_title">考核得分:</div>
              </Col>
              <Col span="8">
                <div class="table_content">{{resultDetail.totalScore}}</div>
              </Col>
              <Col span="4">
                <div class="table_title">上报时间:</div>
              </Col>
              <Col span="8">
                <div class="table_content">{{resultDetail.reportTime}}</div>
              </Col>
            </Row>
            <Row>
              <Col span="4">
                <div class="table_title">退回原因:</div>
              </Col>
              <Col span="16">
                <div class="table_content">
                  <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="填写退回原因"></Input>
                </div>
              </Col>
            </Row>
            <Row style="margin-left:250px;margin-top:20px;">
              <Button type="primary" style="margin-right: 5px">退回</Button>
              <Button type="error" to="/partyAm/partySpecialResult">关闭</Button>
            </Row>
          </Col>
          <Col span="8">
            <Card dis-hover>
              <p slot="title">相关附件</p>
              <div class="attView">
                <img src="http://img2.imgtn.bdimg.com/it/u=1739576259,71252231&fm=26&gp=0.jpg"/>
                <img src="http://img2.imgtn.bdimg.com/it/u=1739576259,71252231&fm=26&gp=0.jpg"/>
                <img src="http://img2.imgtn.bdimg.com/it/u=1739576259,71252231&fm=26&gp=0.jpg"/>
              </div>
            </Card>
          </Col>
        </Row>

      </div>
    </div>
  </div>
</template>

<style scoped>
  .header {
    margin-bottom: 15px;
  }

  .pageView {
    text-align: right;
    margin-top: 10px;
  }

  .attView {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .attView img {
    width: 120px;
    height: 120px;
    margin: 5px;
  }

  .amback {
    position: absolute;
    right: 25px;
    top: 60px;
  }

  .bi_custom_title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    font-weight: 500;
    color: #2d8cf0;
    padding-left: 8px;
    border-bottom: 1px solid #2d8cf0
  }

  .bi_custom_table {
    margin-top: 20px;
  }

  .table_title {
    min-height: 44px;
    height: auto;
    text-align: right;
    font-size: 14px;
    padding-right: 10px;
    color: #2d8cf0;
  }

  .table_content {
    min-height: 44px;
    height: auto;
    text-align: left;
    font-size: 14px;
    padding-left: 10px;
    color: #888;
    padding-bottom: 10px;
  }
</style>

<script>
  export default {
    data () {
      return {
        resultDetail: {
          id: 0,
          amTitle: '',
          deptName: '',
          name: '',
          score: '',
          topicTitle: '',
          totalScore: '',
          reportTime: '',
          reportTitle: ''
        }
      }
    },
    methods: {
      loadDetail: function () {
        var id = this.$route.query.id
        var self = this
        self.$http({
          url: self.$constants.BIURL + '/partySpecialResult/fetchPartySpecialResultById?id=' + id,
          method: 'GET'
        })
          .then(function (response) {
            if (response.status == 200) {
              var data = response.data.data
              console.log(data)
              self.resultDetail = data
            }
          }).catch(function (error) {
          self.$Message.error({
            content: error.message,
            duration: 2
          })
          console.log(error)
        })
      }

    },
    mounted: function () {
      this.loadDetail()
    }
  }
</script>
