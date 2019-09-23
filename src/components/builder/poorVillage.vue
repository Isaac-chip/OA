<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem >村(社区)管理</BreadcrumbItem>
      <BreadcrumbItem >基本信息</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">
      <Row style="margin-bottom:10px">
        <Col span="3">
            <Button @click="showDeptModal">新增村(社区)</Button>
        </Col>
        <Col span="8">
            <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入村社区名称查找" />
        </Col>
        </Row>
        <zk-table
        ref="table"
        sum-text="sum"
        index-text="序号"
        :data="villageDatas"
        :columns="columns"
        :stripe="props.stripe"
        :border="props.border"
        :show-header="props.showHeader"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType">
        <template slot-scope="scope" slot="action">
            <Button  size="small" style="margin-right: 5px" @click="updateVillage(scope.row)">修改</Button>
            <Button  size="small" style="margin-right: 5px" @click="deleteVillage(scope.row)">删除</Button>
        </template>
        </zk-table>
    </div>

    <Modal v-model="villageFormModal" title="新增/修改村(社区)" :footer-hide="true" :mask-closable="false" width="600">
      <Form ref="villageForm" :model="villageForm" :rules="villageRuleValidate" :label-width="100" >
        <FormItem label="村(社区)名称" prop="villageName">
            <Input v-model="villageForm.villageName" placeholder="请输入村(社区)名称" />
        </FormItem>
        <FormItem label="村(社区)编号" prop="villageCode">
            <Input v-model="villageForm.villageCode" placeholder="请输入村(社区)编号" />
        </FormItem>
        <Row>
          <FormItem label="所属村社区">
            <treeselect
              v-model="villageForm.parentId"
              :options="villageDatas"
              :max-height="200"
              @select="orgSelect"
              noResultsText="没有找到匹配结果"
              placeholder="请选择所属村社区..." />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="党委、支部">
            <treeselect
              :multiple="true"
              :default-expand-level="1"
              v-model="villagePartys"
              :options="departmentDatas"
              :max-height="200"
              noResultsText="没有找到匹配结果"
              placeholder="请选择下属党委、支部..." />
          </FormItem>
        </Row>
        <Row>
            <FormItem label="图片资料" >
                <div class="demo-upload-list" :key="item.url" v-for="item in uploadList">
                    <img :src="'http://120.24.51.37/group1/'+item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </div>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="http://localhost:9011/file/fileUpload"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>

                <Modal title="图片预览" v-model="visible">
                    <img :src="'http://120.24.51.37/group1/' + imgName + ''" v-if="visible" style="width: 100%">
                </Modal>
            </FormItem>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="经度" prop="lng">
              <Input v-model="villageForm.lng" placeholder="请输入经度" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="纬度" prop="lat">
              <Input v-model="villageForm.lat" placeholder="请输入纬度" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="所在地址" prop="address">
            <Input v-model="villageForm.address" placeholder="所在位置" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="两委班子">
              <Select
                  v-model="twoCommittees"
                  filterable
                  remote
                  multiple 
                  :remote-method="loadUser"
                    placeholder="请输入用户姓名搜索"
                  :loading="false"
                  style="width:300px">
                  <Option v-for="item in peoples" :value="item.userId" :key="item.userId">{{ item.name }}</Option>
              </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="村务监督委员会">
              <Select
                  v-model="supervisoryCommittee"
                  filterable
                  remote
                  multiple 
                  :remote-method="loadUser"
                    placeholder="请输入用户姓名搜索"
                  :loading="false"
                  style="width:300px">
                  <Option v-for="item in peoples" :value="item.userId" :key="item.userId">{{ item.name }}</Option>
              </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="村集体经济收入(单位：万元):" prop="income">
            <Input v-model="villageForm.income" placeholder="村集体经济收入" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="村集体发展模式:" prop="ecomode">
            <Input v-model="villageForm.ecomode" placeholder="村集体发展模式" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="描述" prop="memo">
            <Input v-model="villageForm.memo" placeholder="输入描述" />
          </FormItem>
        </Row>
        <Row>
          <div style="text-align:center">
            <Button type="primary" @click="addVillage('villageForm')">提交</Button>
            <Button style="margin-left: 8px" @click="hideVillageModel('villageForm')">关闭</Button>
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
        villageFormModal:false,
        props: {
          stripe: false,
          border: true,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: true
        },
        columns: [
          {
            label: '村(社区)名称',
            prop: 'villageName',
            width: '200px',
          },
          {
            label: '编号',
            prop: 'villageCode',
            minWidth: '50px',
          },
          {
            label: '所在地址',
            prop: 'address',
          },
          {
            label: '经济输入',
            prop: 'income',
          },{
            label: '发展模式',
            prop: 'ecomode',
          },
          {
            label: '操作',
            slot: 'action',
            width: '130px',
            type: 'template',
            template: 'action',
          },
        ],
        villageForm:{
          villageCode:'',
          villageName:'',
          villageType:'',
          parentId:null,
          orderNo:0,
          lng:'',
          lat:'',
          address:'',
          income:0,
          ecomode:'',
          isPoor:false,
          villagePic:'',
          tenantId:'',
          twoCommittees:'',
          supervisoryCommittee:'',
          departments:''
        },
        peoples:[],
        twoCommittees:[],
        supervisoryCommittee:[],
        villageRuleValidate:{
          villageName: [
            { required: true, message: '村(社区)名称不能为空', trigger: 'blur' }
          ],
          villageCode: [
            { required: true,  message: '村(社区)编码不能为空', trigger: 'blur' }
          ]
        },
        villageDatas:[],
        imgUrl: '',
        visible: false,
        uploadList: [],
        departmentDatas:[],
        villagePartys:[]
      }
    },
    methods:{
      showDeptModal:function(){
        this.villageFormModal = true;
        this.isUpdate = false;
        this.loadDepartment();
      },
      orgSelect:function(node){
        this.villageForm.parentId = node.id;
      },
      onSeach:function(){
        this.loadVillage();
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
              console.log(data);
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
              if(self.isUpdate){
                  self.villageForm.parentId = self.villageForm.parentId;
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
      addVillage:function(name){
        var self = this;
        this.$refs[name].validate((valid) => {
          if(valid){
            if(self.villageForm.parentId == '' || self.villageForm.parentId ==null) {
              this.$Message.error('请选择所属组织!');
              return;
            }

            if(self.villagePartys && self.villagePartys.length > 0 ){
              self.villageForm.departments = self.villagePartys.join(',');
            }

            if(self.twoCommittees && self.twoCommittees.length >0){
              self.villageForm.twoCommittees = self.twoCommittees.join(',');
            }

            if(self.supervisoryCommittee && self.supervisoryCommittee.length >0){
              self.villageForm.supervisoryCommittee = self.supervisoryCommittee.join(',');
            }

            self.villageForm.tenantId = self.$constants.userInfo.tenantId;
            self.$http({
              url:self.$constants.BIURL+'/political/village',
              method:'POST',
              dataType:'json',
              data:self.villageForm
            }).then(function (response) {
                if(response.status ==200){
                  var data = response.data;
                  self.villageForm.parentId = -1;
                  if(data.code == 1){
                    self.$Message.error({
                      content: data.data,
                      duration: 2
                    });
                  }else{
                    self.current = 1;
                    self.villageFormModal = false;
                    self.$refs['villageForm'].resetFields();
                    self.loadVillage();
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
            });
          }else{
            this.$Message.error('表单校验失败，请输入必填项!');
          }
        });
      },
      hideVillageModel:function(name){
        this.$refs[name].resetFields();
        this.villageFormModal = false;
        this.villageForm.parentId = -1;
      },
      loadUser:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/user/list',
                method:'GET',
                dataType:'json',
                params:{
                    current:1,
                    size:20,
                    querys:self.queryStr,
                    tenantId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.peoples = data.data.records;
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
      updateVillage:function(data){
          this.isUpdate = true;
          this.villageForm = Object.assign({}, data);
          if(this.villageForm.parentId == 0){
              this.villageForm.parentId = null;
          }
          this.villageFormModal = true;
      },
      deleteVillage:function(data){
          var self = this;
          this.$Modal.confirm({
              title:'系统提示',
              content:'确定要删除该记录吗?',
              okText:'确定',
              cancelText:'取消',
              onOk:function(){
                  self.handleDelete(data);
              }
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
      handleDelete:function(data){
          var self = this;
          self.$http({
              url:self.$constants.BIURL+'/political/village/'+data.id,
              method:'DELETE'
          })
          .then(function (response) {
              if(response.status ==200){
                  self.$Message.success({
                      content: '数据删除成功!',
                      duration: 2
                  });
                  self.loadVillage();
              }
          }) .catch(function (error) {
                  self.$Message.error({
                  content: error.message,
                  duration: 2
              });
              console.log(error);
          });
      },
      handleSuccess :function(response, file, fileList){
            var data = response.data;
            if(data){
                this.villageForm.villagePic = data.filePath;
                this.uploadList.push({
                    'name':data.name,
                    'url':data.filePath
                });
            }
        },
       handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            this.uploadList.splice(this.uploadList.indexOf(file), 1);
            this.villageForm.villagePic = '';
        },
        handleFormatError (file) {
            this.$Message.warning({
                title: '系统提示',
                comtent: '上传图片格式错误'
            });
        },
        handleMaxSize (file) {
            this.$Message.warning({
                title: '系统提示',
                content: '上传的图片文件不能超过4M.'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 1;
            return check;
        }

    },
    mounted:function(){
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

  .userView{
    margin-left: 10px;
  }

  .pageView{
    margin-top: 10px;
    text-align: right;
  }
</style>
