<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem>党建考核</BreadcrumbItem>
      <BreadcrumbItem>三会一课考核结果</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">
      <Row class="header">
        <Col span="9">
          上报时间：
          <DatePicker type="daterange" @on-clear="dateClearSearch" @on-change="onDateSearch" placeholder="上报时间" style="width: 250px"></DatePicker>
        </Col>
        <Col span="9">
          <Input v-model="params.query" search enter-button @on-search="onSeach" placeholder="输入需要查找的内容"/>
        </Col>
        <Col span="6" style="text-align:right">
          <Button @click="exportExcel">导出到Excel</Button>
          <Divider type="vertical"/>
          <Button @click="exportDoc">导出到Word</Button>
        </Col>
      </Row>

      <Table border ref="selection" :columns="partyAmCloumns" :data="partyAmDatas" :min-height="200">
        <template slot-scope="{ row, index }" slot="action">
          <Button  size="small" style="margin-right: 5px" @click="showDetail(index)">查看</Button>
          <Button  size="small" @click="remove(index)">删除</Button>
        </template>

      </Table>
      <Page :total="dataCount" :page-size="params.size" show-total show-sizer @on-change="changepage"
            @on-page-size-change="onChangePageSize" class="pageView"></Page>
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
</style>

<script>

import exportUtils from '@/vendor/export.js'

  export default {
    data () {
      return {
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 10,
        current: 1,
        addPartyAm: false,
        partyAmCloumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'name'
          },
          {
            title: '所属组织',
            key: 'deptName'
          },
          {
            title: '考核清单',
            key: 'topicTitle'
          },
          {
            title: '填报标题',
            key: 'object'
          },
          {
            title: '考核得分',
            key: 'totalScore'
          },
          {
            title: '上报时间',
            key: 'reportTime'
          }, {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        partyAmDatas: [],
        isUpdate: false,
        params:{
          current :1,
          size:10,
          startDate:'',
          endDate:'',
          query:'',
          deptCode:''
        }
      }
    },
    methods: {
      onSeach: function () {
        this.params.current = 1
        this.loadPartyAmDatas()
      },
      changepage: function (value) {
        this.params.current = value
        this.loadPartyAmDatas()
      },
      onChangePageSize: function (value) {
        this.params.size = value
        this.loadPartyAmDatas()
      },
      dateClearSearch:function(){
            this.params.startDate = '';
            this.params.endDate = '';
        },
        onDateSearch:function(value){
            this.params.startDate = value[0];
            this.params.endDate = value[1];
        },
      showDetail: function (index) {
        //this.
        console.log(index)
        var data = this.partyAmDatas[index]
        console.log(data)
        this.$router.push({
          'name': 'partyThreeAndOneResultDetail',
          'path': '/partyAm/partyThreeAndOneResultDetail',
          query: {'id': data.id}
        })
      },
      remove: function (index) {
        var self = this
        const data = this.partyAmDatas[index]

        this.$Modal.confirm({
          title: '系统提示',
          content: '确定要删除该记录吗?',
          okText: '确定',
          cancelText: '取消',
          onOk: function () {
            self.handleDelete(data)
          }
        })

      },
      handleDelete: function (data) {
        var self = this
        self.$http({
          url: self.$constants.BIURL + '/threeAndOne/'+data.id,
          method: 'DELETE'
        }).then(function (response) {
            if (response.data.code == 0) {
              self.$Message.success({
                content: '数据删除成功!',
                duration: 2
              })
              self.loadPartyAmDatas()
            }
          })
      },
      loadPartyAmDatas: function () {
        var self = this
        this.$Loading.start()
        self.params.deptCode = self.$constants.userInfo.deptCode;
        self.$http({
          url: self.$constants.BIURL + '/threeAndOne/searchDetailByMonthAndUserId',
          method: 'get',
          dataType: 'json',
          params: self.params
        })
          .then(function (response) {
            self.$Loading.finish()
            if (response.status == 200) {
              var data = response.data.data
              self.partyAmDatas = data.records
              self.dataCount = data.total
            }
          }).catch(function (error) {
          self.$Loading.error()
          console.log(error)
        })
      },
      exportExcel:function(){
        exportUtils.exportExcel(this.$constants.BIURL+'/threeAndOne/exportExcel',self.params);
      },
      exportDoc:function(){
        exportUtils.exportExcel(this.$constants.BIURL+'/threeAndOne/exportWord',self.params);
      }
    },
    mounted: function () {
      this.loadPartyAmDatas()
    }
  }
</script>
