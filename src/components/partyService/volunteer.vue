<template>
  <div class="volunteer">
    <Modal
      v-model="showModal"
      title="填写志愿服务"
      @on-ok="editForm"
      @on-cancel="showModal = false"
      @on-visible-change="changeVisible"
    >
      <Form ref="formLeft" :model="formLeft" :label-width="100" :rules="ruleValidate" label-position="left">
        <FormItem label="主题服务" >
          <Input v-model="formLeft.serviceTitle" />
        </FormItem>
        <FormItem label="服务时间">
          <DatePicker v-model="formLeft.serviceTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择服务时间" style="width: 100%" @on-ok="checkStatus"/>
        </FormItem>
        <FormItem label="服务地点">
          <Input v-model="formLeft.servicePlace" />
        </FormItem>
        <FormItem label="服务内容">
          <Input v-model="formLeft.serviceContent" type="textarea" />
        </FormItem>
        <FormItem label="携带物品">
          <Input v-model="formLeft.serviceAticle" />
        </FormItem>
        <Divider size="small">召集人</Divider>
        <FormItem label="召集人职务">
          <Input v-model="formLeft.creatorPost" />
        </FormItem>
        <FormItem label="召集人电话">
          <Input v-model="formLeft.creatorPhone" />
        </FormItem>
        <FormItem label="报名时限">
          <DatePicker v-model="formLeft.registEndtime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择报名时限" style="width: 100%" @on-ok="checkStatus"/>
        </FormItem>
        <FormItem label="活动人数">
          <Input v-model="formLeft.totalUser" />
        </FormItem>
        <!-- <Divider size="small">评分规则</Divider>
            状态：
            <RadioGroup v-model="formLeft.auditStatus" @on-change="checkStatus">
                <Radio label="0">停用</Radio>
                <Radio label="1">启用</Radio>
                <Radio label="2">结束</Radio>
            </RadioGroup> -->
      </Form>
    </Modal>
    <Modal
      v-model="showQrcodeModal"
      title="二维码"
    >
      <div style="height:100%;width:100%;text-align:center;">
        <img :src="qrSrc" >
      </div>
    </Modal>
    <Modal
      v-model="showCheckModal"
      title="审核服务"
      @on-ok="submitCheck"
    >
      <p>审核状态:</p>
      <br/>
      <RadioGroup v-model="checkForm.status" @on-change="checkStatus" style="margin-bottom:10px;">
        <Radio label="1">通过</Radio>
        <Radio label="2">拒绝</Radio>
      </RadioGroup>
      <br/>
      <p>审核意见:</p>
      <br/>
      <Input v-model="checkForm.memo" type="textarea" />
    </Modal>
    <Modal
      v-model="showGradeModal"
      title="志愿服务评分"
      @on-ok="submitGrade"
    >
      <p>当前打分规则:分数在1～10之间 不能超过这个分数区间</p>
      <br/>

      <div class="userScore" 
        v-for="(item,index) in gradeForm"
        :key="index"
        style="margin-bottom:10px;"
      >
        {{item.userName}}：<InputNumber :max="10" :min="1" v-model="item.userScore" />
      </div>
      <!-- <RadioGroup v-model="formLeft.auditStatus" @on-change="checkStatus">
        <Radio label="0">停用</Radio>
        <Radio label="1">启用</Radio>
        <Radio label="2">结束</Radio>
      </RadioGroup> -->
    </Modal>

    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>党群服务</BreadcrumbItem>
      <BreadcrumbItem>志愿服务</BreadcrumbItem>
    </Breadcrumb>
    <div class="operation-bar">
      <Button type="success" @click="openModal">新增服务</Button>
      <div class="search-box">
        <Input v-model="searchVal" placeholder="输入主题关键字查找" style="width: 150px" />
        <Button type="success" @click="changeQuery">查询</Button>
      </div>
    </div>
    <div class="bi-container">
      <Table ref="table" :columns="tableColumns" :data="tableData" highlight-row/>
      <Page :total="totalPage" style="float:right;margin-top:20px;" @on-change="changePage"/>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: "Volunteer",
  data() {
    return {
      searchVal: "",
      tableColumns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号"
        },
        {
          title: "服务主题",
          key: "serviceTitle"
        },
        {
          title: "服务时间",
          width: 140,
          key: "serviceTime",
          render: (h,params) => {
            return h('p',
            params.row.serviceTime == null? '':dayjs(params.row.serviceTime).format("YYYY-MM-DD HH:MM"))
          }
        },
        {
          title: "服务内容",
          key: "serviceContent"
        },
        {
          title: "携带服务物品",
          key: "serviceArticle"
        },
        {
          title: "服务地点",
          key: "servicePlace"
        },
        {
          title: "报名时限",
          key: "registEndtime",
          render: (h,params) => {
            return h('p',
            params.row.registEndtime == null? '':dayjs(params.row.registEndtime).format("YYYY-MM-DD HH:MM"))
          }
        },
        {
          title: "活动总人数",
          key: "totalUser"
        },
        {
          title: "召集人",
          key: "creatorPost"
        },
        {
          title: "状态",
          key: "auditStatus",
          render: (h,params) => {
            // console.log('params',params);
            return h('p',
              params.row.auditStatus == 0? '未审核'
              :params.row.auditStatus == 1? '通过'
              :params.row.auditStatus == 2? '拒绝': '未审核'
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
              return h('div',
                {
                  style: {
                    display: 'flex'
                  }
                },
                [
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
                              this.showCheck(params)
                          }
                      }
                    }, '审核'),
                  h('Dropdown',
                    {
                      props: {
                        placement: 'bottom-end',
                        transfer: true
                      },
                      style: {
                        // width: '40px'
                      },
                      on: {
                            'on-click': (value) => {
                              // console.log('value',value);
                              if (value == 'edit') {
                                this.openEdit(params)
                              }
                              if (value == 'delete') {
                                this.delRecords(params)
                              }
                              if (value == 'grade') {
                                this.showGrade(params.row.id)
                              }
                              if (value == 'qrcode') {
                                this.showQrcode(params.row.qrurl)
                              }
                            }
                        }
                    },
                    [
                      h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        }
                      },[
                        h('span','更多'),
                        h('Icon', {
                          props: {
                            type: 'ios-arrow-down'
                          }
                        })
                      ],),
                      h('DropdownMenu',{
                        // props: {
                        //   slot: 'list'
                        // }
                        slot: 'list'
                      }, [
                        h('DropdownItem',{
                          props: {
                              name: 'edit'
                          }
                        },'修改'),
                        h('DropdownItem',{
                          props: {
                              name: 'delete'
                          }
                        },'删除'),
                        h('DropdownItem',{
                          props: {
                              name: 'grade'
                          }
                        },'评分'),
                        h('DropdownItem',{
                          props: {
                              name: 'qrcode'
                          }
                        },'二维码')
                      ])
                    ])
              ]);
          }
        }
      ],
      tableData: [
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
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,
      showModal: false,
      showEdit: false,
      formLeft: new Object(),
      showQrcodeModal: false,
      qrSrc: '',
      ruleValidate: {
          name: [
              { required: true, message: '该字段不能为空', trigger: 'blur' }
          ],
          number: [
              { required: true, type: 'number', message: '请输入数字', trigger: 'change' }
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
      },
      showGradeModal: false,
      gradeForm: new Object(),
      checkForm: new Object(),
      showCheckModal: false,
    };
  },
  created() {
    this.initTable()
  },
  methods: {
    initTable () {
      this.$http({
        // url:self.$constants.BIURL+'/volunteer/service/list',
        url: `${this.$constants.BIURL}/volunteer/service/list`,
        method:'GET',
        params:{
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          query: this.searchVal
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.records
        this.totalPage = res.data.data.total
        // console.log('totalPage',this.totalPage);

        // this.tableColumns =
      }).catch(err => {

      })
    },
    timeFormat (time, to) {
      if (to == 'string') {
        dayjs(time).format("YYYY-MM-DD HH:MM")
      }
      if (to == 'timestamp') {
        dayjs(time).valueOf()
      }
      if (to == 'newDate') {
        dayjs(time).format()
      }
    },
    checkStatus () {
    //   // console.log(this.formLeft.auditStatus);
    //    // console.log(dayjs(this.formLeft.serviceTime[0]).format("YYYY-MM-DD HH:MM"));
    //   //
    //   // this.$http({
    //   //   // url:self.$constants.BIURL+'/volunteer/service/list',
    //   //   url: `${this.$constants.BIURL}/volunteer/service/members/${id}`,
    //   //   method:'GET'
    //   // }).then(res => {
    //   //   console.log('/volunteer/score/${id}',res);
    //   // }).catch(err => {

    //   // })
    },
    changePage (currentPage) {
      // console.log('this.currentPage',currentPage);
      this.currentPage = currentPage
      this.initTable()
    },
    changeQuery () {
      this.currentPage = 1
      this.initTable()
    },
    openModal () {
      this.showModal = true
    },
    openEdit (params) {
      console.log('openEdit',params.row);
      this.formLeft.serviceTime = params.row.serviceTime
      this.formLeft.registEndtime = params.row.registEndtime
      this.formLeft.serviceTitle = params.row.serviceTitle
      this.formLeft.servicePlace = params.row.servicePlace
      this.formLeft.serviceContent = params.row.serviceContent
      this.formLeft.serviceAticle = params.row.serviceAticle
      this.formLeft.creatorPost = params.row.creatorPost
      this.formLeft.creatorPhone = params.row.creatorPhone
      this.formLeft.totalUser = params.row.totalUser
      // this.formLeft = JSON.parse(JSON.stringify(params.row))
      this.formLeft.serviceTime = dayjs(this.formLeft.serviceTime).format()
      this.formLeft.registEndtime = dayjs(this.formLeft.registEndtime).format()
      console.log('this.formLeft',this.formLeft);

      this.showModal = true
    },
    editForm () {
      const queryParams = JSON.parse(JSON.stringify(this.formLeft))
      // let queryParams = new Object()
      // queryParams.id = 
      if (this.formLeft.id) {
        queryParams.id = this.formLeft.id
      }


      queryParams.serviceTime = dayjs(queryParams.serviceTime).valueOf()
      queryParams.registEndtime = dayjs(queryParams.registEndtime).valueOf()

      console.log('queryParams',queryParams);
      // return
      this.$http({
        // url:self.$constants.BIURL+'/volunteer/service/list',
        url: `${this.$constants.BIURL}/volunteer/service`,
        method: queryParams.id ? 'PUT' : 'POST',
        dataType: 'json',
        data: queryParams
      }).then(res => {
        this.$Message.success('编辑成功');
        console.log('/volunteer/service',res);
        this.initTable()
      }).catch(err => {

      })


      // let queryParams = this.
    },
    changeVisible (visible) {
      if (visible == false) {
        console.log('modalclosed');
        this.formLeft = new Object()
      }
    },
    delRecords (params) {
      console.log('id',params.row.id);
      this.$http({
        // url:self.$constants.BIURL+'/volunteer/service/list',
        url: `${this.$constants.BIURL}/volunteer/service/${params.row.id}`,
        method: 'DELETE'
      }).then(res => {
        // console.log('/volunteer/service/${params.row.id}',res);
        this.$Message.success('删除成功');
        this.initTable()
      }).catch(err => {

      })
    },
    showQrcode (qrurl) {
      this.qrSrc = `${this.$constants.PREPATH + qrurl}`
      console.log('qrSrc',this.qrSrc,qrurl);

      this.showQrcodeModal = true
    },
    showGrade (id) {

      this.showGradeModal = true
      this.$http({
        // url:self.$constants.BIURL+'/volunteer/service/list',
        url: `${this.$constants.BIURL}/volunteer/service/members/${id}`,
        method:'GET'
      }).then(res => {
        this.gradeForm = res.data.data
        console.log('/volunteer/score/${id}',this.gradeForm);
      }).catch(err => {

      })
    },
    submitGrade () {
      let queryParams = []

      queryParams = this.gradeForm.map(
        v => {
          let scoreObj = {
            score: v.userScore,
            userId: v.id
          }
          return scoreObj
        }
      )
      
      this.$http({
        // url:self.$constants.BIURL+'/volunteer/service/list',
        url: `${this.$constants.BIURL}/volunteer/service/score/${this.gradeForm[0].serviceId}`,
        method: 'POST',
        dataType: 'json',
        data: queryParams
      }).then(res => {
        this.initTable()
      })
    },
    showCheck (params) {
      this.checkForm.id = params.row.id
      this.showCheckModal = true
    },
    submitCheck () {
      this.$http({
        // url:self.$constants.BIURL+'/volunteer/service/list',
        url: `${this.$constants.BIURL}/volunteer/service/check/${this.checkForm.id}`,
        method: 'POST',
        dataType: 'json',
        data: {
          op: Number(this.checkForm.status),
          memo: this.checkForm.memo
        }
      }).then(res => {
        this.initTable()
      })
    }
  }
};
</script>

<style lang="less" scoped>
.volunteer {
  position: relative;
  padding-top: 40px;

  .operation-bar {
    padding: 10px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
