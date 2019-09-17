<template>
  <div class="voice">
    <Modal
      v-model="showCheckModal"
      title="处理意见反馈"
      @on-ok="submitCheck"
    >
      <p>处理意见：</p>
      <br/>
      <Input v-model="checkForm.memo" type="textarea" />
    </Modal>
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>党群服务</BreadcrumbItem>
      <BreadcrumbItem>党群心声</BreadcrumbItem>
    </Breadcrumb>
    <div class="operation-bar">
      <!-- <Button type="success" @click="openModal">新增服务</Button> -->
      <div class="search-box">
        <Input v-model="searchVal" placeholder="输入主题关键字查找" style="width: 150px" />
        <Button type="success" @click="changeQuery">查询</Button>
      </div>
    </div>
    <div class="bi-container">
      <Table ref="tableData" :columns="tableColumns" :data="tableData" highlight-row/>
      <Page :total="totalCount" :page-size="pageSize" style="float:right;margin-top:20px;" @on-change="changePage"/>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: "voice",
  data () {
    return {
      tableColumns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号"
        },
        {
          title: "创建人",
          key: "creator"
        },
        {
          title: "创建时间",
          key: "createTime",
          render: (h,params) => {
            return h('p',
            params.row.createTime == null? '':dayjs(params.row.createTime).format("YYYY-MM-DD HH:MM"))
          }
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "修改人",
          key: "modifier"
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return  h('Button',
                      {
                        props: {
                            type: 'success',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.showCheck(params)
                            }
                        }
                      }, '处理反馈')
          } 
        }

      ],
      tableData: [],
      currentPage: 1,
      totalCount: 1,
      pageSize: 10,
      searchVal: '',
      showCheckModal: false,
      checkForm: new Object()
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http({
        // url:self.$constants.BIURL+'/volunteer/service/list',
        url: `${this.$constants.BIURL}/voice/list`,
        method:'GET',
        params:{
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          query: this.searchVal
        }
      }).then(res => {
        this.tableData = res.data.data.records
      })
    },
    showCheck (params) {
      this.checkForm.id = params.row.id
      this.showCheckModal = true
    },
    changeQuery () {
      this.currentPage = 1
      this.initData()
    },
    changePage () {
      this.currentPage = currentPage
      this.initTable()
    },
    submitCheck () {
      this.$http({
        // url:self.$constants.BIURL+'/volunteer/service/list',
        url: `${this.$constants.BIURL}/voice/deal/${this.checkForm.id}`,
        method: 'POST',
        dataType: 'json',
        data: {
          memo: this.checkForm.memo
        }
      }).then(
        res => {
          this.$Message.success('处理成功')
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .voice {
    position: relative;
    padding-top: 40px;

    .operation-bar {
      padding: 10px 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
}
</style>