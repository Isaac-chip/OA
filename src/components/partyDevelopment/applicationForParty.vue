<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem>党员发展</BreadcrumbItem>
      <BreadcrumbItem>入党申请</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">

      <i-form inline :label-width="100">
        <Form-item label="开始时间:">
          <Date-picker type="date" placeholder="年-月-日" style="width: 200px"></Date-picker>
        </Form-item>
        <Form-item label="结束时间:">
          <Date-picker type="date" placeholder="年-月-日" style="width: 200px"></Date-picker>
        </Form-item>
        <Form-item label="所处阶段:">
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in stageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Form-item>
      </i-form>

      <i-form inline :label-width="100">
        <Form-item label="完成状态：">
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Form-item label="党支部:">
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Form-item label="姓名：">
          <Input placeholder="输入姓名查找" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="searchByName"></Button>
        </Form-item>
      </i-form>

      <i-form :label-width="30">
        <Form-item>
          <i-button type="primary" @click="addApplyPartyDialog.show=true">新增申请</i-button>
          <i-button type="primary">导出</i-button>
          <i-button type="primary" @click="export2Excel">导出EXCEL</i-button>
          <i-button type="primary">导出word</i-button>
        </Form-item>
      </i-form>

      <Table height="600" border :columns="columns1" :data="data2"></Table>
      <Page :total="100" show-sizer show-elevator show-total style="margin-top: 10px"></Page>

      <div style="margin-top: 10px">
        状态颜色说明：
        <img src="@/assets/images/cr5.png" style="width: 24px; height:24px"> 已期满
        <img src="@/assets/images/cr1.png" style="width: 24px; height:24px;"> 即将期满
        <img src="@/assets/images/cr2.png" style="width: 24px; height:24px"> 正常
      </div>

    </div>
    <Modal v-model="addApplyPartyDialog.show" width="750" title="新增申请" :scrollable='true'>
      <Tabs type="card" :style="`height:${tabHeight}`" v-model="tabName" @on-click="_tabClick">
        <TabPane class="step1" name="step1" label="第一阶段">
          <step-one></step-one>
        </TabPane>
        <TabPane class="step2" name="step2" label="第二阶段">
          <step-two></step-two>
        </TabPane>
        <TabPane class="step3" name="step3" label="第三阶段">
          <step-three></step-three>
        </TabPane>
        <TabPane class="step4" name="step4" label="第四阶段">
          <step-four></step-four>
        </TabPane>
        <TabPane class="step5" name="step5" label="第五阶段">
          <step-five></step-five>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
import cr1Img from '@/assets/images/cr1.png'
import cr2Img from '@/assets/images/cr2.png'
import cr5Img from '@/assets/images/cr5.png'
import StepOne from './subpage/step_1.vue'
import StepTwo from './subpage/step_2.vue'
import StepThree from './subpage/step_3.vue'
import StepFour from './subpage/step_4.vue'
import StepFive from './subpage/step_5.vue'
export default {
  name: 'applicationForParty',
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive
  },
  data() {
    return {
      tabs: 5,
      tabName: 'step1',
      tabHeight: '500px',
      // stageList: [
      //   {
      //     value: '请选择',
      //     label: '请选择'
      //   },
      //   {
      //     value: '申请入党',
      //     label: '申请入党'
      //   },
      //   {
      //     value: '入党积极分子的确定和培养教育',
      //     label: '入党积极分子的确定和培养教育'
      //   },
      //   {
      //     value: '发展对象的确定和考察',
      //     label: '发展对象的确定和考察'
      //   },
      //   {
      //     value: '预备党员的接受阶段',
      //     label: '预备党员的接受阶段'
      //   },
      //   {
      //     value: '预备党员的转正',
      //     label: '预备党员的转正'
      //   }
      // ],
      // stateList: [
      //   {
      //     value: '请选择',
      //     label: '请选择'
      //   },
      //   {
      //     value: '已完成',
      //     label: '已完成'
      //   },
      //   {
      //     value: '未完成',
      //     label: '未完成'
      //   }
      // ],
      // columns1: [
      //   {
      //     width: 60,
      //     align: 'center',
      //     key: 'no'
      //   },
      //   {
      //     type: 'selection',
      //     width: 60,
      //     align: 'center'
      //   },
      //   {
      //     title: '状态',
      //     width: 100,
      //     align: 'center',
      //     key: 'dateState',
      //     render: (h, params) => {
      //       let state = params.row.dateState
      //       let img = ''
      //       if (state === 2) {
      //         img = cr2Img
      //       } else if (state === 3) {
      //         img = cr5Img
      //       } else {
      //         img = cr1Img
      //       }
      //       return h('div', [
      //         h('img', {
      //           attrs: {
      //             src: img
      //           },
      //           style: {
      //             width: '24px',
      //             height: '24px'
      //           }
      //         })
      //       ])
      stageList: [
        {
          value: '请选择',
          label: '请选择'
        },
        {
          value: '申请入党',
          label: '申请入党'
        },
        {
          value: '入党积极分子的确定和培养教育',
          label: '入党积极分子的确定和培养教育'
        },
        {
          value: '发展对象的确定和考察',
          label: '发展对象的确定和考察'
        },
        {
          value: '预备党员的接受阶段',
          label: '预备党员的接受阶段'
        },
        {
          value: '预备党员的转正',
          label: '预备党员的转正'
        }
      ],
      stateList: [
        {
          value: '请选择',
          label: '请选择'
        },
        {
          value: '已完成',
          label: '已完成'
        },
        {
          value: '未完成',
          label: '未完成'
        }
      ],
      columns1: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          key: 'no'
        },
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '状态',
          width: 100,
          align: 'center',
          key: 'dateState',
          render: (h, params) => {
            let state = params.row.dateState
            let img = ''
            if (state === 3) {
              img = cr1Img
            } else if (state === 2) {
              img = cr5Img
            } else {
              img = cr2Img
            }
            return h('div', [
              h('img', {
                attrs: {
                  src: img
                },
                style: {
                  width: '24px',
                  height: '24px'
                }
              })
            ])
          }
        },
        {
          title: '姓名',
          width: 100,
          align: 'center',
          key: 'userName'
        },
        {
          title: '性别',
          width: 100,
          align: 'center',
          key: 'sex'
        },
        {
          title: '民族',
          width: 100,
          align: 'center',
          key: 'nation'
        },
        {
          title: '出生日期',
          width: 100,
          align: 'center',
          key: 'birthday'
        },
        {
          title: '所处阶段',
          width: 230,
          align: 'center',
          key: 'stage'
        },
        {
          title: '联系电话',
          width: 130,
          align: 'center',
          key: 'phoneNo'
        },
        {
          title: '申请入党时间',
          width: 120,
          align: 'center',
          key: 'firstDay'
        },
        {
          title: '成为积极分子时间',
          width: 150,
          align: 'center',
          key: 'partyDay'
        },
        {
          title: '成为发展对象时间',
          width: 150,
          align: 'center',
          key: 'becomeAnObjectTime'
        },
        {
          title: '成为预备党员时间',
          width: 150,
          align: 'center',
          key: 'becomeReservePartyTime'
        },
        {
          title: '申请转正时间',
          width: 150,
          align: 'center',
          key: 'applyForCorrectionTime'
        },
        {
          title: '编入党支部名称',
          width: 200,
          align: 'center',
          key: 'branchName'
        },
        {
          title: '成为正式党员时间',
          width: 200,
          align: 'center',
          key: 'becomeFormalPartyTime'
        },
        {
          title: '创建时间',
          width: 200,
          align: 'center',
          key: 'ts'
        },
        {
          title: '用户名',
          align: 'center',
          width: 200,
          key: 'creatorName'
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
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
                      this.show(params.index)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '系统提示',
                        content:
                          '您确定要删除【' +
                          this.data2[params.index].userName +
                          '】的用户信息吗？',
                        onOk: () => {
                          this.$Message.info('Clicked ok')
                        },
                        onCancel: () => {
                          this.$Message.info('Clicked cancel')
                        }
                      })
                      // this.remove(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data2: [
        {
          no: 1,
          id: 277,
          userName: '王莉莉',
          birthday: '1983-11-22',
          birthPlace: '公馆镇下乘马村',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '13367895131',
          cardNo: '450521198311222161',
          firstDay: '2017-06-02',
          ts: '2019-06-26 17:45:25',
          state: 0,
          creatorName: '管理员',
          partyDay: '2019-06-28',
          discDay: '',
          meetingDay: '',
          dateState: 0,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 2,
          id: 276,
          userName: '徐玉彦',
          birthday: '1981-04-16',
          birthPlace: '公馆镇绕城路82号',
          stage: '申请入党',
          phoneNo: '13367595988',
          cardNo: '450521198104164843',
          firstDay: '2017-05-10',
          ts: '2019-06-26 17:41:29',
          state: 0,
          creatorName: '公馆教育站公馆中心校支部',
          partyDay: '',
          discDay: '',
          meetingDay: '',
          dateState: 0,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 3,
          id: 275,
          userName: '黄俊杰',
          birthday: '1995-01-25',
          birthPlace: '合浦县廉州镇还珠东路133号',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '13557896682',
          cardNo: '450521199501259031',
          firstDay: '2017-11-20',
          ts: '2019-06-26 10:41:23',
          state: 0,
          creatorName: '廉州镇平田社区委员会还珠东支部',
          partyDay: '2018-07-01',
          discDay: '',
          meetingDay: '',
          dateState: 2,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 4,
          id: 274,
          userName: '李四',
          birthday: '1990-12-10',
          birthPlace: '合浦县廉州镇还珠中路2号',
          stage: '申请入党',
          phoneNo: '19977916946',
          cardNo: '45052119901210053X',
          firstDay: '2015-01-16',
          ts: '2019-06-26 10:27:23',
          state: 0,
          creatorName: '组织部支部',
          partyDay: '',
          discDay: '',
          meetingDay: '',
          dateState: 0,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 5,
          id: 273,
          userName: '沈锡义',
          birthday: '1968-01-18',
          birthPlace: '白沙那潭村委',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '18107892319',
          cardNo: '450521196801185536',
          firstDay: '2014-06-01',
          ts: '2019-06-25 18:50:25',
          state: 0,
          creatorName: '白沙镇宏德片小学党支部',
          partyDay: '2015-02-05',
          discDay: '',
          meetingDay: '',
          dateState: 2,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 6,
          id: 272,
          userName: '郭世锋',
          birthday: '1980-09-16',
          birthPlace: '白沙镇东海村委',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '18107892319',
          cardNo: '432901198009162035',
          firstDay: '2014-07-01',
          ts: '2019-06-25 18:42:50',
          state: 0,
          creatorName: '白沙镇宏德片小学党支部',
          partyDay: '2015-02-05',
          discDay: '',
          meetingDay: '',
          dateState: 2,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 7,
          id: 271,
          userName: '甘如松',
          birthday: '1982-08-18',
          birthPlace: '合浦县白沙镇西坎村委西路坑村',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '18107892319',
          cardNo: '450521198208185577',
          firstDay: '2014-07-10',
          ts: '2019-06-25 18:32:58',
          state: 0,
          creatorName: '白沙镇宏德片小学党支部',
          partyDay: '2015-01-29',
          discDay: '',
          meetingDay: '',
          dateState: 2,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 8,
          id: 270,
          userName: '曹永全',
          birthday: '1980-12-21',
          birthPlace: '白沙镇侨联小学',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '18107892319',
          cardNo: '45052119801221003X',
          firstDay: '2015-01-03',
          ts: '2019-06-25 18:28:53',
          state: 0,
          creatorName: '白沙镇宏德片小学党支部',
          partyDay: '2015-02-05',
          discDay: '',
          meetingDay: '',
          dateState: 2,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 9,
          id: 269,
          userName: '庞小丽',
          birthday: '1984-11-20',
          birthPlace: '石康镇鲤鱼村委',
          stage: '申请入党',
          phoneNo: '15278924795',
          cardNo: '45052119841120362X',
          firstDay: '2017-11-02',
          ts: '2019-06-25 11:44:01',
          state: 0,
          creatorName: '石康镇鲤鱼村支部',
          partyDay: '',
          discDay: '',
          meetingDay: '',
          dateState: 0,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 10,
          id: 268,
          userName: '钟其安',
          birthday: '1996-12-24',
          birthPlace: '广西北海市合浦县白沙镇充美村',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '15207803964',
          cardNo: '450521199612245599',
          firstDay: '2018-05-18',
          ts: '2019-06-24 11:52:30',
          state: 0,
          creatorName: '白沙镇文广交通联合支部',
          partyDay: '2019-01-31',
          discDay: '',
          meetingDay: '',
          dateState: 0,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 11,
          id: 268,
          userName: '钟其安',
          birthday: '1996-12-24',
          birthPlace: '广西北海市合浦县白沙镇充美村',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '15207803964',
          cardNo: '450521199612245599',
          firstDay: '2018-05-18',
          ts: '2019-06-24 11:52:30',
          state: 0,
          creatorName: '白沙镇文广交通联合支部',
          partyDay: '2019-01-31',
          discDay: '',
          meetingDay: '',
          dateState: 0,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 12,
          id: 268,
          userName: '钟其安',
          birthday: '1996-12-24',
          birthPlace: '广西北海市合浦县白沙镇充美村',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '15207803964',
          cardNo: '450521199612245599',
          firstDay: '2018-05-18',
          ts: '2019-06-24 11:52:30',
          state: 0,
          creatorName: '白沙镇文广交通联合支部',
          partyDay: '2019-01-31',
          discDay: '',
          meetingDay: '',
          dateState: 0,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        },
        {
          no: 13,
          id: 268,
          userName: '钟其安',
          birthday: '1996-12-24',
          birthPlace: '广西北海市合浦县白沙镇充美村',
          stage: '入党积极分子的确定和培养教育',
          phoneNo: '15207803964',
          cardNo: '450521199612245599',
          firstDay: '2018-05-18',
          ts: '2019-06-24 11:52:30',
          state: 0,
          creatorName: '白沙镇文广交通联合支部',
          partyDay: '2019-01-31',
          discDay: '',
          meetingDay: '',
          dateState: 0,
          becomeDay: '',
          branchName: '',
          partyStartDay: '',
          resolution: ''
        }
      ],
      model1: '',
      inputName: '',
      addApplyPartyDialog: {
        show: false
      }
    }
  },
  methods: {
    searchByName() {},
    show(index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data2[index].userName}<br>Age：${
          this.data2[index].creatorName
        }<br>Address：${this.data2[index].birthday}`
      })
    },
    remove(index) {
      this.data2.splice(index, 1)
    },

    // 显示弹框
    showAddApplyPartyDialog(val) {
      this.addApplyPartyDialog.show = true
    },
    hideAddApplyPartyDialog() {
      this.addApplyPartyDialog.show = false
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = []
        const filterVal = []
        this.columns1.forEach(function(column) {
          tHeader.push(column.title)
          filterVal.push(column.key)
        })

        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.data2 //把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel')
      })
    },
    _tabClick(item) {
      // console.log(item)
      const cName = `.${item}>.step`
      const $dom = document.querySelector(cName)
      this.tabHeight = $dom.offsetHeight + 40 + 'px'
    }
  },
  mounted() {},
  watch: {
    'addApplyPartyDialog.show': {
      handler(nVal) {
        if (nVal) {
          this.$nextTick(() => {
            this.tabName = 'step1'
            this._tabClick(this.tabName)
          })
        }
      },
      immediate: true
    }
  }
}
</script>


<style lang="less">
.step {
  .step_head {
    text-align: center;
    margin-bottom: 10px;
  }
  .step_contant {
    .ivu-form .ivu-form-item-label {
      padding: 3px 0px;
    }
    .ivu-form-item {
      margin-bottom: 5px;
      &.ivu-form-item-required {
        margin-bottom: 24px;
      }
    }
    .ivu-date-picker {
      width: 100%;
    }
    .tips {
      .ivu-form-item {
        margin-bottom: 0px;
      }
    }
  }
}
</style>
