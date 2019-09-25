<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem >党务信息</BreadcrumbItem>
      <BreadcrumbItem to="/system/dept">党组织管理</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">
      <Row style="height:100%;">
        <Col span="6" style="height:100%;">
          <Card dis-hover class="card-view">
            <div slot="title">
              <div class="dept_title">
                <div>党组织管理</div>
                <div class="dept_icon_header">
                  <div class="i-icon i-icon-add" @click="showDeptModal" />
                  <div class="i-icon i-icon-edit" @click="updateDept" />
                  <div class="i-icon i-icon-delete" @click="deleteDept"/>
                  <div class="i-icon i-icon-refresh" @click="refreshDept" />
                </div>
              </div>
            </div>
            <div > <Input v-model="deptQueryStr" search @on-search="deptSearch" placeholder="按名称搜索..." /></div>
            <Tree @on-select-change="treeNodeClick" style="margin-top:10px;" class="dept_tree" :data="departmentDatas"></Tree>
          </Card>
        </Col>
        <Col span="18" style="height:100%;overflow-y:scroll">
          <div class="userView">
            <Row class="header">
              <Col  span="8">
                <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
              </Col>
            </Row>
            <Table border :columns="usersCloumns" :data="usersDatas" :min-height="200">
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
          </div>
        </Col>
      </Row>
    </div>

    <Modal v-model="deptFormModal" @on-cancel="hidedeptModel('deptForm')" :title="modalTitle" :footer-hide="true" :mask-closable="false" width="600px">
      <Form ref="deptForm" :model="deptForm" :rules="deptRuleValidate" :label-width="90" >
        <Row>
          <Col span="12">
            <FormItem label="组织名称" prop="deptName">
              <Input v-model="deptForm.deptName" placeholder="请输入组织名称" />
            </FormItem>
          </Col>
          <Col span="12">
               <FormItem label="所属行政区域">
                  <treeselect
                          v-model="deptForm.villageId"
                          :options="villageDatas"
                          :max-height="200"
                          noResultsText="没有找到匹配结果"
                          placeholder="请选择行政区域" />
              </FormItem>
          </Col>
        </Row>

        <Row>
          <FormItem label="所属组织" prop="parentId">
            <treeselect
              v-model="deptForm.parentId"
              :options="departmentDatas"
              :max-height="200"
              @select="orgSelect"
              noResultsText="没有找到匹配结果"
              placeholder="请选择所属组织..." />
          </FormItem>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="组织级别" prop="deptType">
              <Select v-model="deptForm.deptType" placeholder="请选择组织级别">
                <Option value='0'>省委组织</Option>
                <Option value='1'>市委组织</Option>
                <Option value='2'>县委组织</Option>
                <Option value='3'>党工委组织</Option>
                <Option value='4'>党总支</Option>
                <Option value='5'>党支部</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="组织类型" prop="partyType">
              <Select v-model="deptForm.partyType" placeholder="请选择组织类型">
                <Option value='0'>村(社区)党组织</Option>
                <Option value='1'>机关事业单位党组织</Option>
                <Option value='2'>国企企业党组织</Option>
                <Option value='3'>非公有经济和社会党组织</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="(位置)经度" prop="lat">
              <Input type="number" v-model="deptForm.lat" placeholder="请输入经度" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="(位置)纬度" prop="lng">
              <Input  type="number" v-model="deptForm.lng" placeholder="请输入纬度" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="所在地址" prop="address">
            <Input v-model="deptForm.address" placeholder="所在位置" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="描述" prop="memo">
            <Input v-model="deptForm.memo" placeholder="输入描述" />
          </FormItem>
        </Row>
        <Row>
          <div style="text-align:center">
            <Button type="primary" @click="addDept('deptForm')">提交</Button>
            <Button style="margin-left: 8px" @click="hidedeptModel('deptForm')">关闭</Button>
          </div>
        </Row>

      </Form>
    </Modal>
  </div>
</template>

<script>

  import Treeselect from '@riophae/vue-treeselect';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';

  export default{
    name: 'departmentView',
    components: { Treeselect },
    data (){
      return {
        // 初始化信息总条数
        dataCount:0,
        // 每页显示多少条
        pageSize:10,
        current:1,
        size:15,
        queryStr:'',
        deptQueryStr:'',
        deptCode:'--',
        villageDatas:[],
        selectedDeptId:-1,
        deptFormModal:false,
        isUpdate:false,
        modalTitle:'新增组织',
        deptForm:{
          did:'',
          villageId:null,
          deptName:'',
          deptCode:'',
          partyType:'',
          parentId:null,
          deptType:'',
          memo:'',
          tenantId:'',
          lat:'',
          lng:'',
          address:''
        },
        deptRuleValidate:{
          parentId:[
            { required: true, message: '所属组织不能为空', trigger: 'blur' }
          ],
          deptName: [
            { required: true, message: '部门名称不能为空', trigger: 'blur' }
          ],
          deptCode: [
            { required: true,  message: '部门编码不能为空', trigger: 'blur' }
          ],
          partyTypeVal: [
            { required: true,  message: '组织级别不能为空', trigger: 'change' }
          ],
          deptType: [
            { required: true,type: 'string', message: '组织类型不能为空', trigger: 'change' }
          ]
        },
        departmentDatas:[],
        usersDatas:[],
        usersCloumns:[{
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: '姓名',
          key: 'userName'
        },{
          title: '所属部门',
          width:300,
          key: 'deptName'
        },{
          title: '手机号码',
          key: 'mobilePhone'
        },{
          title: '政治面貌',
          key: 'politics'
        }]
      }
    },
    methods:{
      showDeptModal:function(){
        this.deptFormModal = true;
        this.modalTitle = '新增组织';
      },
      orgSelect:function(node){
        this.deptForm.parentId = node.did;
      },
      onSeach:function(){
        this.current = 1;
        this.loadUser();
      },
      changepage:function(value){
        this.current = value;
        this.loadUser();
      },
      onChangePageSize:function(value){
        this.pageSize = value;
        this.loadUser();
      },
      //部门选择时间
      treeNodeClick:function(obj,item){
        console.log(item);
        this.deptCode = item.deptCode;
        this.selectedDeptId = item.did;
        this.loadUser();

      },
      loadUser:function(){
        var self = this;
        self.$http({
          url:self.$constants.BIURL+'/political/user/list',
          method:'GET',
          params:{
            current:self.current,
            size:self.pageSize,
            deptCode:self.deptCode,
            query:self.queryStr
          }
        })
          .then(function (response) {
            if(response.status ==200){
              var data = response.data;
              console.log(data);
              if(data.code == 0){
                self.usersDatas = data.data.records;
                self.dataCount = data.data.total;
              }
            }
          }).catch(function (error) {
          self.$Message.error({
            content: error.message,
            duration: 2
          });
          console.log(error);
        });
      },
      deptSearch:function(value){
        this.loadDepartment();
      },
      deleteDept:function(){
        if(this.selectedDeptId == -1){
            this.$Message.error('请先选择你要删除的部门!');
            return ;
        }
        var self = this;
        this.$Modal.confirm({
            title:'系统提示',
            content:'确定要删除该记录吗?',
            okText:'确定',
            cancelText:'取消',
            onOk:function(){
                self.handleDelete();
            }
        });
      },
      handleDelete:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/department/'+this.selectedDeptId,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadDepartment();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
      updateDept:function(){
         if(this.selectedDeptId == -1){
            this.$Message.error('请先选择你要修改的部门!');
            return ;
          }
          this.loadDeptById();
          this.deptFormModal = true;
          this.modalTitle = '更新组织';
          this.isUpdate = true;
      },
      loadDeptById:function(){
        var self = this;
        self.$http({
          url:self.$constants.BIURL+'/political/department/'+self.selectedDeptId,
          method:'GET'
        })
          .then(function (response) {
            if(response.status ==200){
              var data = response.data;
              self.deptForm = data.data;
              console.log(self.deptForm.parentId);
              self.deptForm.parentId = self.deptForm.parentId+'';
            }
          }).catch(function (error) {
          self.$Message.error({
            content: error.message,
            duration: 2
          });
        });
      },
      loadDepartment:function(){
        var self = this;
        self.$http({
          url:self.$constants.BIURL+'/political/department/list',
          method:'GET',
          params:{
            query:self.deptQueryStr
          }
        })
          .then(function (response) {
            if(response.status ==200){
              var data = response.data;
              const arrChange = arr => arr.map(item => {
                const res = {};
                if(item.children && item.children.length == 0){
                  delete item.children ;
                }else{
                  arrChange(item.children);
                }
              });
              arrChange(data);
              self.departmentDatas = data;
            }
          }).catch(function (error) {
          self.$Message.error({
            content: error.message,
            duration: 2
          });
          console.log(error);
        });
      },
      loadVillage:function(){
          var self = this;
          self.$http({
            url:self.$constants.BIURL+'/political/village/list',
            method:'GET',
            params:{
                queryStr:self.queryStr
            }
          }) .then(function (response) {
              if(response.status ==200){
                var data = response.data;
                const arrChange = function(datas){
                        for(var i =0; i<datas.length;i++){
                            var item = datas[i];
                            if(item.children && item.children.length == 0){
                                delete item.children ;
                            }else{
                                if(item.children !=null){
                                    arrChange(item.children);
                                }
                            }
                        }
                    };
                arrChange(data.data);
                self.villageDatas = data.data;
              }
          }).catch(function (error) {
          self.$Message.error({
              content: error.message,
              duration: 2
          });
          console.log(error);
          });
      },
      refreshDept:function(){
        this.loadDepartment();
      },
      addDept:function(name){
        var self = this;
        this.$refs[name].validate((valid) => {
          if(valid){
            if(self.deptForm.parentId == '' || self.deptForm.parentId ==null) {
              this.$Message.error('请选择所属组织!');
              return;
            }
            self.deptForm.tenantId = self.$constants.userInfo.tenantId;
            var method = "POST";
            if(self.isUpdate){
                method = "PUT";
            }
            self.$http({
              url:self.$constants.BIURL+'/political/department',
              method:method,
              dataType:'json',
              data:self.deptForm
            })
              .then(function (response) {
                if(response.status ==200){
                  var data = response.data;
                  self.deptForm.parentId = null;
                  self.deptForm.villageId = null;
                  if(data.code == 1){
                    self.$Message.error({
                      content: data.data,
                      duration: 2
                    });
                  }else{
                    self.current = 1;
                    self.deptFormModal = false;
                    self.$refs['deptForm'].resetFields();
                    self.loadDepartment();
                    if(self.isUpdate){
                      self.$Message.success({
                        content: '数据修改成功!',
                        duration: 2
                      });
                    }else{
                      self.$Message.success({
                        content: '数据添加成功!',
                        duration: 2
                      });
                    }
                  }

                }
              }) .catch(function (error) {
              self.$Message.error({
                content: error.message,
                duration: 2
              });
              console.log(error);
            });
          }else{
            this.$Message.error('表单校验失败，请输入必填项!');
          }
        });
      },
      hidedeptModel:function(name){
        this.$refs[name].resetFields();
        this.selectedDeptId = -1;
        this.deptFormModal = false;
        this.deptForm.parentId = null;
      }

    },
    mounted:function(){
      this.loadDepartment();
      this.loadVillage();
    }
  }
</script>

<style>

  .header{
    margin-bottom: 15px;
  }

  .dept_title{
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    justify-content:space-between;
    line-height: 28px;
  }

  .dept_icon_header{
    display: flex;
  }
  .card-view{
    height: 100%;
    position: relative;
  }

  .card-view .ivu-card-head{
    padding: 8px 16px;
  }

  .card-view .ivu-card-body{
    height: 80%;
  }
  .card-view .dept_tree{
    overflow: scroll;
    height: 100%;
  }

  .card-view .ivu-tree-title{
    font-size: 13px;
  }

  .dept_icon_header div{
    margin-right: 10px;
    cursor: pointer;
  }

    .dept_icon_header div:hover{
      width: 25px;
      height: 25px;
    }
  .userView{
    margin-left: 10px;
  }

  .pageView{
    margin-top: 10px;
    text-align: right;
  }
</style>
