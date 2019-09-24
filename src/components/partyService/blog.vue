<template>
  <div class="blog">
    <Modal
      v-model="addModalVisible"
      title="填写主题"
      @on-ok="editCat"
      @on-visible-change="changeVisible"
    >
      <Form ref="Editform" :model="Editform" :label-width="100" label-position="left">
        <FormItem label="板块名称" >
          <Input v-model="Editform.plateName" />
        </FormItem>
        <FormItem label="备注">
          <Input v-model="Editform.memo" type="textarea" />
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="addTopicModalVisible"
      title="填写话题"
      @on-ok="editTopic"
      @on-visible-change="changeVisible"
    >
      <Form ref="topicForm" :model="topicForm" :label-width="100" label-position="left">
        <FormItem label="标题" >
          <Input v-model="topicForm.title" />
        </FormItem>
        <!-- <FormItem label="服务内容">
          <Input v-model="Editform.memo" type="textarea" />
        </FormItem> -->
      </Form>
    </Modal>

    <Modal
      width="70%"
      v-model="topicModalVisible"
      title="话题详情"
      @on-ok="editCat"
      @on-visible-change="changeVisible"
    >
      <div class="operation-bar">
        <Button type="success" @click="openAddTopicModal">新增话题</Button>
        <div class="search-box">
          <Input v-model="searchTopicVal" placeholder="输入主题关键字查找" style="width: 150px" />
          <Button type="success" @click="changeTopicQuery">查询</Button>
        </div>
      </div>
      <div class="bi-container">
        <Table ref="catTableData" :columns="topicTableColumns" :data="topicTableData" highlight-row/>
        <Page :total="topicCount" :page-size="pageTopicSize" style="float:right;margin-top:20px;" @on-change="changeTopicPage"/>
      </div>
    </Modal>

    <Modal
      v-model="detailModalVisible"
      width="60%"
      title="查看详情"
    >
      <Table ref="catTableData" :columns="detailTableColumns" :data="detailTableData" highlight-row/>
    </Modal>

    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem>党群服务</BreadcrumbItem>
      <BreadcrumbItem>互动交流</BreadcrumbItem>
    </Breadcrumb>
    <div class="operation-bar">
      <Button type="success" @click="openAddModal">新建主题</Button>
      <div class="search-box">
        <Input v-model="searchCatVal" placeholder="输入主题关键字查找" style="width: 150px" />
        <Button type="success" @click="changeCatQuery">查询</Button>
      </div>
    </div>
    <div class="bi-container">
      <Table ref="catTableData" :columns="catTableColumns" :data="catTableData" highlight-row/>
      <Page :total="totalCount" :page-size="pageCatSize" style="float:right;margin-top:20px;" @on-change="changeCatPage"/>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: "Blog",
  data () {
    return {
      currentCatPage: 1,
      currentTopicPage: 1,
      
      pageCatSize: 10,
      pageTopicSize: 10,

      totalCount: 1,
      topicCount: 1,

      searchCatVal: '',
      searchTopicVal: '',

      addModalVisible: false,
      topicModalVisible: false,
      addTopicModalVisible: false,

      Editform: new Object(),
      topicForm: new Object(),

      catTableData: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      catTableColumns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号"
        },
        {
          title: "主题名称",
          key: "plateName"
        },
        {
          title: "创建时间",
          key: "createdDate",
          render: (h,params) => {
            return h('p',
            params.row.createdDate == null? '':dayjs(params.row.createdDate).format("YYYY-MM-DD HH:MM"))
          }
        },
        {
          title: "备注",
          key: "memo"
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div',
              {},
              [
                h('Button',
                  {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                            this.openEditCat(params)
                        }
                    }
                  }, '修改'),
                  h('Button',
                    {
                      props: {
                          type: 'error',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                              this.delCat(params.row.id)
                          }
                      }
                    }, '删除'),
                  h('Button',
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
                              this.openTopicModal(params.row.id,params.row.plateName)
                          }
                      }
                    }, '查看话题')
              ]
            )
          }
        }
      ],
      

      topicTableData: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      topicTableColumns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "创建时间",
          key: "createdDate",
          render: (h,params) => {
            return h('p',
            params.row.createdDate == null? '':dayjs(params.row.createdDate).format("YYYY-MM-DD HH:MM"))
          }
        },
        {
          title: "备注",
          key: "memo"
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div',
              {},
              [
                h('Button',
                  {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                            this.openEditTopicModal(params)
                        }
                    }
                  }, '修改'),
                  h('Button',
                    {
                      props: {
                          type: 'error',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                              this.delTopic(params.row.id)
                          }
                      }
                    }, '删除'),
                  h('Button',
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
                              this.checkStatus(params.row.id)
                          }
                      }
                    }, '查看详情')
              ]
            )
          }
        }
      ],

      detailModalVisible: false,
      detailTableData: [],
      detailTableColumns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "创建人",
          key: "creatorName"
        },
        {
          title: "创建时间",
          key: "createdDate",
          render: (h,params) => {
            return h('p',
            params.row.createdDate == null? '':dayjs(params.row.createdDate).format("YYYY-MM-DD HH:MM"))
          }
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "备注",
          key: "memo"
        },
        {
          title: "点赞数量",
          key: "likeNum"
        },
        {
          title: "阅读数量",
          key: "readNum"
        },
        {
          title: "回复数量",
          key: "replyNum"
        }
      ],
      
    }
  },
  created () {
    this.initCatlog()
  },
  methods: {
    initCatlog () {
      this.$http({
        // url:self.$constants.BIURL+'/volunteer/service/list',
        url: `${this.$constants.BIURL}/blog/catalog/list`,
        method:'GET',
        params:{
          pageNo: this.currentCatPage,
          pageSize: this.pageCatSize,
          query: this.searchCatVal
        }
      }).then(res => {
        this.totalCount = res.data.data.total
        this.catTableData = res.data.data.records
        // console.log('/blog/catalog/list',this.catTableData,this.totalCount);
      }).catch(err => {

      })
    },
    openAddModal () {
      this.addModalVisible = true
    },
    openAddTopicModal () {
      this.addTopicModalVisible = true
    },
    openEditTopicModal (params) {
      // this.topicForm.catlogId = params.row.id
      // this.topicForm.plateName = params.row.plateName
      this.topicForm.topicId = params.row.id
      this.topicForm.title = params.row.title
      this.addTopicModalVisible = true
    },
    changeCatQuery () {
      this.currentCatPage = 1
      this.initTable()
    },
    changeTopicQuery () {
      this.currentTopicPage = 1
      // this.initTable()
      this.openTopicModal(this.topicForm.catlogId,this.topicForm.plateName)
    },
    checkStatus (id) {
      this.detailModalVisible = true
      this.$http({
        url: `${this.$constants.BIURL}/blog/topic/${id}`,
        method:'GET',
      }).then(res => {
        this.detailTableData = res.data.data.records
      })
    },
    editCat () {
      let queryParams = {
        plateName: this.Editform.plateName,
        memo: this.Editform.memo
      }
      if (this.Editform.catlogId) {
        queryParams.id = this.Editform.catlogId
      }
      this.$http({
        url: `${this.$constants.BIURL}/blog/catalog`,
        method:this.Editform.catlogId? 'PUT' : 'POST',
        dataType: 'json',
        data: queryParams
      }).then(res => {
        console.log('/blog/catalog',res);
        this.$Message.success('编辑成功')
        this.initCatlog()
      }).catch(err => {

      })
    },
    editTopic () {
      let queryParams = {
        plateName: this.topicForm.plateName,
        title: this.topicForm.title,
        plateId: this.topicForm.catlogId
      }
      if (this.topicForm.topicId) {
        queryParams.id = this.topicForm.topicId
      }
      this.$http({
        url: `${this.$constants.BIURL}/blog/topic`,
        method:this.topicForm.topicId? 'PUT' : 'POST',
        dataType: 'json',
        data: queryParams
      }).then(res => {
        // this.topicModalVisible = false
        // this.addTopicModalVisible = false
        // this.initCatlog()
        console.log(queryParams.plateId);
        
        this.openTopicModal(queryParams.plateId,this.topicForm.plateName)
      }).catch(err => {

      })
    },
    changeCatPage (currentPage) {
      this.currentCatPage = currentPage
      this.initCatlog()
    },
    changeTopicPage (currentPage) {
      this.currentTopicPage = currentPage
      this.openTopicModal(this.topicForm.catlogId,this.topicForm.plateName)
    },
    openEditCat (params) {
      this.Editform.catlogId = params.row.id
      this.Editform.plateName = params.row.plateName
      this.Editform.memo = params.row.memo
      this.addModalVisible = true
    },
    changeVisible (visible) {
      if (visible == false) {
        console.log('modalclosed');
        this.Editform = new Object()
        this.topicForm = new Object()
      }
    },
    delCat (id) {
      this.$http({
        url: `${this.$constants.BIURL}/blog/catalog/${id}`,
        method: 'DELETE',
      }).then(res => {
        this.$Message.success('删除成功');
        this.initCatlog()
      }).catch(err => {

      })
    },
    delTopic (id) {
      this.$http({
        url: `${this.$constants.BIURL}/blog/topic/${id}`,
        method: 'DELETE',
      }).then(res => {
        this.$Message.success('删除成功');
        this.openTopicModal(this.topicForm.catlogId,this.topicForm.plateName)
      }).catch(err => {

      })
    },
    openTopicModal (id,plateName) {
      this.topicModalVisible = true
      this.$http({
        url: `${this.$constants.BIURL}/blog/topic/list`,
        method:'GET',
        params:{
          pageNo: this.currentTopicPage,
          pageSize: this.pageTopicSize,
          query: this.searchTopicVal,
          catalogId: id
        }
      }).then(res => {
        // console.log();
        this.topicForm.catlogId = id
        this.topicForm.plateName = plateName
        this.topicCount = res.data.data.total
        this.topicTableData = res.data.data.records
        console.log('this.topicForm',this.topicForm);
        
      }).catch(err => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../css/app.css';

.blog {
  position: relative;
  padding-top: 40px;


}
  .operation-bar {
    padding: 10px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
