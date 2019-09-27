<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem>党建考核</BreadcrumbItem>
      <BreadcrumbItem>考核清单</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">
      <Row class="header">
        <Col span="2">
          <Button @click="addPartyAm=true;isUpdate = false">新增</Button>
        </Col>
        <Col span="5" style="margin-right:10px;">
          <Select v-model="query.fixedType" placeholder="请选择考核类型">
            <Option value="-1">全部</Option>
            <Option value="0">专项考核</Option>
            <Option value="1">三会一课考核</Option>
            <Option value="2">一把手考核</Option>
          </Select>
        </Col>
        <Col span="7">
          <Input v-model="query.title" search enter-button @on-search="onSeach" placeholder="输入需要查找的内容"/>
        </Col>
      </Row>

      <Table border ref="selection" :columns="partyAmListCloumns" :data="partyAmListDatas" :min-height="200">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="success" size="small" style="margin-right: 5px" @click="amObject(index)">考核对象</Button>
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">修改</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>

      </Table>
      <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage"
            @on-page-size-change="onChangePageSize" class="pageView"></Page>
    </div>

    <!-- 新增内容 -->
    <Modal v-model="addPartyAm" title="考核清单" width="600" :footer-hide="true" :mask-closable="false">
      <div>
        <Form ref="amListfromValidate" :model="amListfromValidate" :rules="ruleValidate" :label-width="90">
          <FormItem label="标题" prop="title">
            <Input v-model="amListfromValidate.title" placeholder="请输入标题..."/>
          </FormItem>
          <Row>
            <Col span="10">
              <FormItem label="考核类型" prop="fixedType">
                <Select v-model="amListfromValidate.fixedType" @on-change="onSearchPartyAm">
                  <Option value='0'>专项考核</Option>
                  <Option value='1'>三会一课考核</Option>
                  <Option value='2'>一把手考核</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="14">
              <FormItem label="考核责任项" prop="tpId">
                <Select v-model="amListfromValidate.tpId">
                  <Option v-for="item in partyAmDatas" :value="item.id" :key="item.id">{{ item.title }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="开始时间" prop="startTime">
                <DatePicker v-model="amListfromValidate.startTime" type="date" placeholder="请选择开始时间"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结束时间" prop="endTime">
                <DatePicker v-model="amListfromValidate.endTime" type="date" placeholder="请选择结束时间"></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="基础分" prop="score">
                <Input v-model="amListfromValidate.score" placeholder="请输入基础分"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="附加分" prop="extraScore">
                <Input v-model="amListfromValidate.extraScore" type="number" placeholder="请输入附加分"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="考核频率" prop="khpl">
                <Select v-model="amListfromValidate.khpl">
                  <Option value='0'>每年</Option>
                  <Option value='1'>每季</Option>
                  <Option value='2'>每月</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="考核次数" prop="khcs">
                <Input v-model="amListfromValidate.khcs" placeholder="请输入考核次数"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="提醒周期" prop="txzq">
                <Select v-model="amListfromValidate.txzq">
                  <Option value='0'>每年</Option>
                  <Option value='1'>每季</Option>
                  <Option value='2'>每月</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="提醒次数" prop="txcs">
                <Input v-model="amListfromValidate.txcs"  placeholder="请输入提醒次数"/>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="通知方式">
                <RadioGroup v-model="amListfromValidate.toNotice">
                  <Radio label="0">系统通知</Radio>
                  <Radio label="1">短信通知</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="预警天数" prop="priorDays">
                <Input v-model="amListfromValidate.priorDays" placeholder="请输入提前预警天数"></Input>
              </FormItem>
            </Col>
          </Row>

          <FormItem label="目标要求" prop="target">
            <Input v-model="amListfromValidate.target" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入描述..."/>
          </FormItem>
          <FormItem label="备注说明" prop="memo">
            <Input v-model="amListfromValidate.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入描述..."/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('amListfromValidate')">提交</Button>
            <Button style="margin-left: 8px" @click="hideModel('amListfromValidate')">关闭</Button>
          </FormItem>
        </Form>

      </div>
    </Modal>

    <Modal v-model="modalPartyAmPeople" title="考核对象" width="600" :footer-hide="true" :mask-closable="false">
      <div style="min-height:250px;">
        <Form :label-width="90">
          <FormItem label="考核对象">
            <RadioGroup v-model="partyAmType" @on-change="typeChange">
              <Radio label="0">党委一级</Radio>
              <Radio label="1">党支部</Radio>
              <Radio label="2">个人</Radio>
            </RadioGroup>
          </FormItem>
          <!-- 党委一级 -->
          <div v-show="partyCom">
            <div style="margin:0px 28px">
              <div style="margin-bottom:10px">不参加考核党委</div>
              <select-dept
                :deptType="2"
                :defaultDatas="partyOutOrgs"
                :resultSelectDatas ="resultDangWDatas"
              ></select-dept>
            </div>
          </div>
          <!-- 支部 -->
          <div v-show="partyZb">
            <FormItem label="支部">
              <CheckboxGroup v-model="partyGroups">
                <Checkbox v-for="(item,index) in deptTypeDatas" :label="item.subKey" :key="index">{{item.subVal}}</Checkbox>
              </CheckboxGroup>
            </FormItem>

            <div style="margin:0px 28px">
              <div style="margin-bottom:10px">不参加考核支部</div>
              <select-dept
                :deptType="1"
                :resultSelectDatas="resultZhiBDatas"
                :partyType="partyGroups"
                :defaultDatas="partyOutBranchs"
              ></select-dept>
            </div>
          </div>
          <!-- 个人-->
          <div v-show="partyPeople">
            <FormItem label="角色分类">
              <CheckboxGroup v-model="roleGroups">
                <Checkbox v-for="item in roleLists" :key="item.rid" :label="item.rid">{{item.roleName}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <div style="margin:0px 28px">
              <div style="margin-bottom:10px">不参加考核用户</div>
              <select-user
                :resultSelectDatas="resultPeopleDatas"
                :defaultDatas="partyOutPeoples"></select-user>
            </div>
          </div>
        </Form>
        <div style="text-align:center;margin-top:80px">
          <Button type="primary" @click="saveAmObject">保存</Button>
          <Button style="margin-left: 8px" @click="modalPartyAmPeople=false">关闭</Button>
        </div>
      </div>
    </Modal>
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
  import SelectDept from '../public/selectDept'
  import SelectUser from '../public/selectUser'

  const validateSequence = (rule, value, callback) => {
      if (value === '') {
            callback(new Error('必填项，不能为空'));
      } else if (!Number.isInteger(+value)) {
            callback(new Error('只能输入数字'));
      }  else {
            callback();
      }
};

  export default {
    components:{SelectDept,SelectUser},
    data () {
      return {
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 10,
        current: 1,
        addPartyAm: false,
        modalPartyAmPeople: false,
        query: {
          title: '',
          fixedType: -1
        },
        deptTypeDatas:[],
        partyGroups:[],
        roleGroups:[],
        partyAmListCloumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '考核责任项',
            key: 'amTitle',
            render: (h, params) => {
              const row = params.row
              var text = row.partyAssessmentVo.title
              return h('span', text)
            }
          },
          {
            title: '考核年度',
            key: 'yearly',
            render: (h, params) => {
              const row = params.row
              var text = row.partyAssessmentVo.yearly
              return h('span', text)
            }
          },
          {
            title: '考核类型',
            key: 'xtype',
            render: (h, params) => {
              const row = params.row
              var text = '专项考核'
              switch (row.partyAssessmentVo.xtype) {
                case 0:
                  text = '专项考核'
                  break
                case 1:
                  text = '三会一课考核'
                  break
                case 2:
                  text = '一把手考核'
                  break
              }

              return h('span', text)
            }
          },
          {
            title: '清单标题',
            key: 'title'
          },
          {
            title: '基础分',
            key: 'score'
          },
          {
            title: '目标要求',
            key: 'target'
          }, {
            title: '操作',
            slot: 'action',
            width: 200,
            align: 'center'
          }
        ],
        roleLists:[],
        partyAmListDatas: [],
        partyAmDatas: [],
        amListfromValidate: {
          title: '',
          tpId: 0,
          score: '',
          extraScore: '',
          target: '',
          scoreDecide: '',
          yearly: '',
          fixedType: '',
          startTime: '',
          endTime: '',
          khpl: '',
          khcs: '',
          txzq: '',
          txcs: '',
          toNotice: '',
          priorDays: '',
          memo: '',
          toPeoples: {
            type: '0'
          }
        },
        isUpdate: false,
        years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
        ruleValidate: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          fixedType: [
            {required: true, message: '考核类型不能为空', trigger: 'change'}
          ],
          tpId: [
            {required: true, type: 'number', message: '考核项不能为空', trigger: 'change'}
          ],
          startTime: [
            {required: true, type: 'date', message: '开始时间不能为空', trigger: 'change'}
          ],
          endTime: [
            {required: true, type: 'date', message: '结束时间不能为空', trigger: 'change'}
          ],
          score: [
            {required: true, validator: validateSequence, trigger: 'blur'}
          ],
          khpl: [
            {required: true, message: '考核评率不能为空', trigger: 'change'}
          ],
          khcs: [
            {required: true, validator: validateSequence, message: '考核次数不能为空', trigger: 'blur'}
          ],
          txzq: [
            {required: true, message: '提醒周期不能为空', trigger: 'change'}
          ],
          txcs: [
            {required: true, validator: validateSequence, message: '提醒次数不能为空', trigger: 'blur'}
          ],
          priorDays: [
            {required: true, validator: validateSequence, message: '预警天数不能为空', trigger: 'blur'}
          ]
        },
        _modal: {},
        partyCom: true,
        partyZb: false,
        partyPeople: false,
        checkGroups: ['0'],
        partyOutOrgs: [], //不参加考核的党委
        partyOutBranchs: [], //不参加考核的支部
        partyOutPeoples: [], //不参加考核的用户
        partyAmType: '0' // 考核类型  0 党委  1 支部  2 个人
      }
    },
    methods: {
      /**
       * 考核对象类型选择
       */
      typeChange: function (value) {
        var self = this
        self.partyAmType = value
        switch (parseInt(value)) {
          case 0:
            self.partyCom = true
            self.partyZb = false
            self.partyPeople = false
            break
          case 1:
            self.partyCom = false
            self.partyZb = true
            self.partyPeople = false
            self.findDeptType();
            break
          case 2:
            self.partyCom = false
            self.partyZb = false
            self.partyPeople = true
            self.loadRoles();
            break
        }
      },
      /**
       * 不参加考核党委返回结果
       */
      resultDangWDatas:function(data){
          this.partyOutOrgs = data;
      },
      resultZhiBDatas:function(data){
          this.partyOutBranchs = data;
      },
      resultPeopleDatas:function(data){
        this.partyOutPeoples = data;
      },
      /**
       * 根据考核类型查找考核项
       */
      onSearchPartyAm: function (value) {
        if(value){
          var self = this
          this.$http({
            url: this.$constants.BIURL + '/partyAm/findPartyAmByxType?xtype=' + value,
            method: 'get'
          }).then(function (response) {
            if (response.status == 200) {
              if (response.data.data && response.data.data.length > 0) {
                self.partyAmDatas = response.data.data
                if(self.isUpdate){
                  self.amListfromValidate.tpId = self.amListfromValidate.tpId;
                }
              } else {
                self.partyAmDatas = []
              }
            }
          })
        }
      },
      onSeach: function () {
        this.current = 1
        this.loadPartyAmDatas()
      },
      changepage: function (value) {
        this.current = value
        this.loadPartyAmDatas()
      },
      onChangePageSize: function (value) {
        this.pageSize = value
        this.loadPartyAmDatas()
      },
      handleSubmit (name) {
        var self = this
        this.$refs[name].validate((valid) => {
          if (valid) {
            self.amListfromValidate.startTime = self.$convertDate(self.amListfromValidate.startTime)
            self.amListfromValidate.endTime = self.$convertDate(self.amListfromValidate.endTime)
            var url = ''
            if (self.isUpdate) {
              url = self.$constants.BIURL + '/partyAmList/updateRmList'
            } else {
              self.amListfromValidate.createTime = ''
              url = self.$constants.BIURL + '/partyAmList/saveRmList'
            }
            self.amListfromValidate.userId = 1
            self.$http({
              url: url,
              method: 'post',
              data: self.$qs.stringify(self.amListfromValidate)
            })
              .then(function (response) {
                if (response.status == 200) {
                  self.current = 1
                  self.addPartyAm = false
                  self.$refs.amListfromValidate.resetFields()
                  if (self.isUpdate) {
                    self.$Message.success({
                      content: '数据修改成功!',
                      duration: 2
                    })
                  } else {
                    self.$Message.success({
                      content: '数据添加成功!',
                      duration: 2
                    })
                  }
                  self.loadPartyAmDatas()
                }
              }).catch(function (error) {
              self.$Message.error({
                content: error.message,
                duration: 2
              })
              console.log(error)
            })
          } else {
            this.$Message.error('表单校验失败，请输入必填项!')
          }
        })
      },
      amObject: function (index) {
        this.modalPartyAmPeople = true;
        //初始化数据
        this.partyAmType = '0';
        this.roleGroups = [];
        this.partyGroups = [];
        this.partyOutOrgs = [];
        this.partyOutBranchs = [];
        this.partyOutPeoples = [];
        this._modal = this.partyAmListDatas[index];
        
        this.loadPartyAmObjectByTopicId(this._modal.tpId, this._modal.id)
      },
      /**
       * 加载考核对象
       */
      loadPartyAmObjectByTopicId: function (oid, topicId) {
        var self = this
        this.$Loading.start()
        self.$http({
          url: self.$constants.BIURL + '/partyAmObject/loadPartyAmObjectByTopicId',
          method: 'get',
          dataType: 'json',
          params: {
            oId: oid,  //考核责任项ID
            topicId: topicId, //考核明细项ID
          }
        }).then(function (response) {
            self.$Loading.finish()
            if (response.data.code == 0) {
              var data = response.data.data
              if (data) {
                if (data.joinObjects) {
                  if(data.type == 1){
                      self.partyGroups = data.joinObjects.split(',');
                  }

                  if(data.typ == 2 ){
                      self.roleGroups =  data.joinObjects.split(',');
                  }
                  
                }
                self.typeChange(data.type)
                self.partyAmType = data.type + ''
                console.log(data)
                if (data.outObjects) {
                  switch (parseInt(self.partyAmType)) {
                    case 0:
                      //不参加考核的党委
                      self.partyOutOrgs = JSON.parse(data.outObjects)
                      break
                    case 1:
                      //不参加考核的支部
                      self.partyOutBranchs = JSON.parse(data.outObjects)
                      break
                    case 2:
                      //不参加考核的用户
                      self.partyOutPeoples = JSON.parse(data.outObjects)
                      break
                  }
                }
              }
            }
          })
      },
      update: function (index) {
        this.amListfromValidate = Object.assign({}, this.partyAmListDatas[index])
        console.log(this.amListfromValidate);
        //this.amListfromValidate.xtype = this.amListfromValidate.xtype + ''
        this.amListfromValidate.khpl = this.amListfromValidate.khpl +'';
        this.amListfromValidate.txzq = this.amListfromValidate.txzq +'';
        this.amListfromValidate.toNotice = this.amListfromValidate.toNotice+'';
        this.amListfromValidate.fixedType = this.amListfromValidate.fixedType+'';
        this.onSearchPartyAm(this.amListfromValidate.fixedType);
        delete this.amListfromValidate['partyAssessmentVo'];
        this.addPartyAm = true
        this.isUpdate = true
      },
      remove: function (index) {
        var self = this
        const data = this.partyAmListDatas[index]

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
          url: self.$constants.BIURL + '/partyAmList/deleteRmList',
          method: 'post',
          data: self.$qs.stringify({id: data.id})
        })
          .then(function (response) {
            if (response.status == 200) {
              self.$Message.success({
                content: '数据删除成功!',
                duration: 2
              })
              self.loadPartyAmDatas()
            }
          }).catch(function (error) {
          self.$Message.error({
            content: error.message,
            duration: 2
          })
          console.log(error)
        })
      },
      hideModel: function (name) {
        this.$refs[name].resetFields()
        this.addPartyAm = false
      },
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status)
      },
      loadPartyAmDatas: function () {
        var self = this
        this.$Loading.start()
        self.$http({
          url: self.$constants.BIURL + '/partyAmList/findAllPartyAmList',
          method: 'get',
          dataType: 'json',
          params: {
            current: self.current,
            size: self.pageSize,
            title: self.query.title,
            fixedType: self.query.fixedType
          }
        }).then(function (response) {
            self.$Loading.finish()
            if (response.status == 200) {
              var data = response.data.data
              self.partyAmListDatas = data.records
              self.dataCount = data.total
            }
          })
      },
      /**
       * 查找部门
       * @param type 部门类型
       * @param size 每页显示记录数
       * @param query 关键字
       * @param items 接收的返回对象
       */
      findDepartment: function (type,size, query, items) {
        var self = this
        this.$Loading.start()
        self.$http({
          url: self.$constants.BIURL + '/political/department/findDepartmentByType',
          method: 'get',
          dataType: 'json',
          params: {
            current:1,
            size:size,
            deptType: type,
            deptName: query
          }
        })
          .then(function (response) {
            self.$Loading.finish()
            if (response.status == 200) {
              var data = response.data.data
              items = data.records
            }
          }).catch(function (error) {
          self.$Loading.error();
        })
      },
      //保存考核对象
      saveAmObject: function () {
        var self = this
        //要求考核的支部 或者 角色
        var arrIds = [];
        //不参加考核的党委、支部、或者个人
        var outArrIds = []
        //处理考核对象
        switch (parseInt(self.partyAmType)) {
          case 0:
            arrIds = []
            outArrIds = self.partyOutOrgs
            break
          case 1:
            arrIds = self.partyGroups;
            outArrIds = self.partyOutBranchs
            break
          case 2:
            arrIds = self.roleGroups;
            outArrIds = self.partyOutPeoples
            break
        }

        var outObjects = ''
        var joinObjects = ''
        if (arrIds && arrIds.length > 0) {
          joinObjects = arrIds.join(',')
        }

        if (outArrIds && outArrIds.length > 0) {
          outObjects = JSON.stringify(outArrIds)
        }

        console.log(outObjects);
        //保存数据
        this.$Loading.start()
        self.$http({
          url: self.$constants.BIURL + '/partyAmObject/saveRmObj',
          method: 'post',
          dataType: 'json',
          data: {
            oid: self._modal.partyAssessmentVo.id,  //考核责任项ID
            topicId: self._modal.id, //考核明细项ID
            type: self.partyAmType, //考核类型
            joinObjects: joinObjects, //考核对象
            outObjects: outObjects //不参加考核对象
          }
        })
          .then(function (response) {
            self.$Loading.finish()
            if (response.status == 200) {
              //关闭窗体
              self.modalPartyAmPeople = false
              //提示消息
              self.$Message.success({
                content: '考核对象添加成功!',
                duration: 3
              })
              //清空双向绑定的数据
              self.partyAmType = '0'
              self.checkGroups = []
              self.partyOutOrgs = []
              self.partyOutBranchs = []
              self.partyOutPeoples = []
              self.partyCom = true
              self.partyZb = false
              self.partyPeople = false
            }
          }).catch(function (error) {
          self.$Loading.error()
          console.log(error)
        })
      },
      /**查找党组织类型 */
      findDeptType:function(){
        var self = this;
          this.$http({
              url:self.$constants.BIURL+'/biDictType/findPartyType',
              method:'GET',
              dataType:'json'
          }).then(function (response) {
             var data = response.data;
             if(data.code == 0){
               console.log(data);
                self.deptTypeDatas = data.data;
                
              }
            })
      },
      loadRoles:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/role/list',
                method:'GET',
                dataType:'json',
                params:{
                    current:1,
                    size:100,
                    tenantId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data);
                    self.roleLists = data.data.records;
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        }
    },
    mounted: function () {
      this.loadPartyAmDatas()
    }
  }
</script>
