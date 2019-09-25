<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem>党建考核</BreadcrumbItem>
      <BreadcrumbItem to="/partyAm/partyThreeAndOneResult">三会一课考核</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">
      <div class="back-view amback">
        <router-link to="/partyAm/partyThreeAndOneResult">
          <img src="@/assets/images/back.png"/>
          <span>返回专项考核</span>
        </router-link>
      </div>
      <div class="bi_custom_title">考核上报内容</div>
      <div class="bi_custom_table">
        <Row>
          <Col span="16">
            <div class="tableView"> 
                <table class="datatable" border="1" cellspacing="0" cellpadding="0">
                  <tr class="title">
                    <td colspan="4">{{resultDetail.topicTitle}}</td>
                  </tr>
                  <tr>
                    <td class="left w20">时间:</td>
                    <td class="w30">{{resultDetail.meetingTime}}</td>
                     <td class="left w20">地点:</td>
                    <td class="w30">{{resultDetail.meetingAddress}}</td>
                  </tr>
                  <tr>
                    <td class="left w20">主持:</td>
                    <td class="w30">{{resultDetail.host}}</td>
                     <td class="left w20">记录:</td>
                    <td class="w30">{{resultDetail.deptName}}</td>
                  </tr>
                  <tr>
                    <td class="left">出席:</td>
                    <td colspan="3">{{resultDetail.attends}}</td>
                  </tr>
                  <tr>
                    <td class="left">列席:</td>
                    <td colspan="3">{{resultDetail.participantIds}}</td>
                  </tr>
                  <tr>
                    <td class="left">缺席:</td>
                    <td colspan="3">{{resultDetail.absents}}</td>
                  </tr>
                  <tr>
                    <td class="left">会议主题:</td>
                    <td colspan="3">{{resultDetail.object}}</td>
                  </tr>
                  <tr>
                    <td class="left">会议记录:</td>
                    <td colspan="3">{{resultDetail.reportContext}}</td>
                  </tr>
                  <tr>
                    <td class="left">要点摘录:</td>
                    <td colspan="3">{{resultDetail.summary}}</td>
                  </tr>
                  <tr>
                    <td class="left">会议决议:</td>
                    <td colspan="3">{{resultDetail.resolution}}</td>
                  </tr>
                  <tr>
                    <td class="left">不同意见:</td>
                    <td colspan="3">{{resultDetail.different}}</td>
                  </tr>
                </table>
            </div>
            <Row style="margin-left:250px;margin-top:20px;">
              <Button type="error" to="/partyAm/partyThreeAndOneResult">关闭</Button>
            </Row>
          </Col>
          <Col span="8">
            <Card dis-hover>
              <p slot="title">相关附件</p>
              <div class="attView">
                <div v-for="(item,index) in resultDetail.enclosures" :key="index">
                    <img v-if="item.attType == 1"  :src="fileServer + item.attPath"/>
                </div>
              </div>
              <Row v-for="(item,index) in resultDetail.enclosures" :key="index">
                  <a  v-if ="item.attType !=1" :href="fileServer + item.attPath">{{item.attName}}</a>
              </Row>
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
    top: 30px;
  }

  .w20{
    width: 20%;
  }

  .w30{
    width: 30%;
  }

  .bi_custom_title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    font-weight: 500;
    color: #ff6a00;
    padding-left: 8px;
    border-bottom: 1px solid #ff6a00
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
    color: #333;
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
  .tableView{
    padding: 0px 10px;
  }
  .datatable{
    position: relative;
    width: 100%;
    height: auto;
    border-top: 1px solid #000000;
    border-left: 1px solid #000000;
    border-collapse: collapse; /*设置单元格的边框合并为1*/

  }

    .datatable .title{
      font-size: 18px;
      text-align: center;
    }

.datatable .left{
  text-align: right;
  padding-right: 8px;
}
  .datatable tr{
    width: 100%;
    min-height: 44px;
    font-size: 13px;
    padding: 3px;
    border-bottom: 1px solid #000000;
    border-right: 1px solid #000000;
  }

  .datatable tr td{
    padding: 5px;
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
          reportTitle: '',
          enclosures:[]
        }
      }
    },
    created:function(){
        this.fileServer = this.$constants.PREPATH;
    },
    methods: {
      loadDetail: function () {
        var id = this.$route.query.id
        var self = this
        self.$http({
          url: self.$constants.BIURL + '/threeAndOne/findById?id=' + id,
          method: 'GET'
        }).then(function (response) {
          if (response.data.code == 0) {
            var data = response.data.data
            console.log(data)
            self.resultDetail = data
          }
        })
      }

    },
    mounted: function () {
      this.loadDetail()
    }
  }
</script>
