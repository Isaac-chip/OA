<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>党建考核</BreadcrumbItem>
      <BreadcrumbItem>考核责任项</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">
      <Row class="header">
        <Col span="2">
          <Button @click="addPartyAm=true;isUpdate = false">新增</Button>
        </Col>
        <Col span="5" style="margin-right:10px;">
          <Select v-model="query.xtype" placeholder="请选择考核类型">
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

      <Table border ref="selection" :columns="partyAmCloumns" :data="partyAmDatas" :min-height="200">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">修改</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>

      </Table>
      <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage"
            @on-page-size-change="onChangePageSize" class="pageView"></Page>
    </div>

    <!-- 新增内容 -->
    <Modal v-model="addPartyAm" title="新增考核责任项" :footer-hide="true" :mask-closable="false">
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入标题..."/>
          </FormItem>
          <FormItem label="考核类型" prop="xtype">
            <Select v-model="formValidate.xtype">
              <Option value='0'>专项考核</Option>
              <Option value='1'>三会一课考核</Option>
              <Option value='2'>一把手考核</Option>
            </Select>
          </FormItem>
          <FormItem label="考核年度" prop="yearly">
            <Select v-model="formValidate.yearly">
              <Option v-for="item in years" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注说明" prop="memo">
            <Input v-model="formValidate.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入描述..."/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button style="margin-left: 8px" @click="hideModel('formValidate')">关闭</Button>
          </FormItem>
        </Form>
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
  export default {
    data () {
      return {
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 10,
        current: 1,
        addPartyAm: false,
        query: {
          title: '',
          xtype: -1
        },
        partyAmCloumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '考核责任项',
            key: 'title'
          },
          {
            title: '考核年度',
            key: 'yearly'
          },
          {
            title: '考核类型',
            key: 'xtype',
            render: (h, params) => {
              const row = params.row
              var text = '专项考核'
              switch (row.xtype) {
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
            title: '创建人',
            key: 'age'
          },
          {
            title: '创建时间',
            key: 'createTime'
          }, {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        partyAmDatas: [],
        formValidate: {
          title: '',
          userId: '',
          yearly: '',
          xtype: '',
          memo: ''
        },
        isUpdate: false,
        years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
        ruleValidate: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          yearly: [
            {required: true, type: 'number', message: '考核年度不能为空', trigger: 'change'}
          ],
          xtype: [
            {required: true, type: 'string', message: '考核类型不能为空', trigger: 'change'}
          ]
        },
        _self: null
      }
    },
    methods: {
      onSeach: function () {
        this.current = 1
        this.loadPartyAmDatas()
      },
      handleDateChange: function (year) {
        this.formValidate.yearly = year
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
            var url = ''
            if (self.isUpdate) {
              url = self.$constants.BIURL + '/partyAm/updateRm'
            } else {
              self.formValidate.createTime = ''
              url = self.$constants.BIURL + '/partyAm/saveRm'
            }
            self.formValidate.userId = 1
            self.$http({
              url: url,
              method: 'post',
              data: self.$qs.stringify(self.formValidate)
            })
              .then(function (response) {
                if (response.status == 200) {
                  self.current = 1
                  self.addPartyAm = false
                  self.$refs.formValidate.resetFields()
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
      update: function (index) {
        this.formValidate = Object.assign({}, this.partyAmDatas[index])
        this.formValidate.xtype = this.formValidate.xtype + ''
        console.log(this.formValidate)
        this.addPartyAm = true
        this.isUpdate = true
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
          url: self.$constants.BIURL + '/partyAm/deleteRm',
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
          url: self.$constants.BIURL + '/partyAm/findAllPartyAssessment',
          method: 'get',
          dataType: 'json',
          params: {
            current: self.current,
            size: self.pageSize,
            title: self.query.title,
            xType: self.query.xtype
          }
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
      }
    },
    mounted: function () {
      this.loadPartyAmDatas()
    }
  }
</script>
