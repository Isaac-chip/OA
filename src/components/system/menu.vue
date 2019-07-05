<template lang="html">
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>系统管理</BreadcrumbItem>
      <BreadcrumbItem>菜单管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="bi-container">
    <Row>
      <Col span="8">
        <Button @click="menuModal = true;isUpdate = false">新增菜单</Button>
      </Col>
      <Col span="8" style="margin-bottom:25px;">
        <CheckboxGroup >
          <Checkbox label="twitter">
              <Icon type="logo-twitter"></Icon>
              <span>PC端菜单</span>
          </Checkbox>
          <Checkbox label="facebook">
              <Icon type="logo-facebook"></Icon>
              <span>手机端菜单</span>
          </Checkbox>
      </CheckboxGroup>
    </Col>
      <Col span="8">
          <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入菜单名称查找" />
      </Col>
    </Row>
    <zk-table
      ref="table"
      sum-text="sum"
      index-text="序号"
      :data="meunDatas"
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
      <template slot="menuType" scope="scope">
        <span v-if="scope.row.menuType == 0">PC端菜单</span>
        <span v-if="scope.row.menuType == 1">手机端菜单</span>
      </template>
      <template scope="scope" slot="action">
          <Button  size="small" style="margin-right: 5px" @click="updateMenu(scope.row)">修改</Button>
          <Button  size="small" style="margin-right: 5px" @click="deleteMenu(scope.row)">删除</Button>
      </template>
    </zk-table>
    </div>

    <Modal  v-model="menuModal" title="新增\修改菜单" :footer-hide="true" :mask-closable="false" class="userFrom">
        <Form ref="menuForm" :model="menuForm" :rules="menuRuleValidate" :label-width="80"  >
            <Row>
                <Col span="12">
                    <FormItem label="父级菜单">
                        <treeselect 
                            :options="meunTreeDatas"
                            :max-height="200"
                            @select="menuSelect"
                            noResultsText="没有找到匹配结果"
                            placeholder="请选择所属父级菜单..." />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="菜单类型" prop="menuType">
                        <Select v-model="menuForm.menuType">
                            <Option value="0">PC端菜单</Option>
                            <Option value="1">手机端菜单</Option>
                            <Option value="2">手机端工具</Option>
                            <Option value="3">手机端栏目</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span="12">
                    <FormItem label="菜单名称" prop="menuName">
                        <Input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="菜单模式" prop="menuMode">
                        <Select v-model="menuForm.menuMode">
                            <Option value="0">内链路径</Option>
                            <Option value="1">外链路径</Option>
                            <Option value="2">执行脚本</Option>
                            <Option value="3">内置模块</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="菜单路径" prop="menuUrl">
                        <Input v-model="menuForm.menuUrl" placeholder="请输入菜单路径" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="模块入口类" prop="menuClass">
                        <Input v-model="menuForm.menuClass" placeholder="请输入模块入口类" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="模块关键字" prop="modelKey">
                        <Input v-model="menuForm.modelKey" placeholder="请输入模块关键字" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="序号" prop="sortNo">
                        <Input v-model="menuForm.sortNo" type="number" placeholder="请输入序号" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="菜单图标" prop="menuIcon">
                        <Input v-model="menuForm.menuUrl" placeholder="请输入菜单图标" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="描述" prop="memo">
                    <Input v-model="menuForm.memo" placeholder="请输入描述" />
                </FormItem>
            </Row>
            <Row>
              <div style="text-align:center">
                  <Button type="primary" @click="addOrUpdate('menuForm')">提交</Button>
                  <Button style="margin-left: 8px" @click="hideMenuModel('menuForm')">关闭</Button>
              </div>
            </Row>
        </Form>
    </Modal>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

  export default {
    name: 'menuView',
    components: { Treeselect },
    name: 'example',
    data () {
      return {
        queryStr:'',
        menuModal:false,
        isUpdate:false,
        menuForm:{
          menuName:'',
          menuUrl:'',
          menuType:'',
          menuMode:'',
          parentId:-1,
          menuIcon:'',
          sortNo:1,
          modelKey:'',
          mainClass:'',
          memo:'',
          tenantId:''
        },
        menuRuleValidate:{},
        meunTreeDatas:[],
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
        meunDatas: [],
        columns: [
          {
            label: '菜单名称',
            prop: 'menuName',
            width: '200px',
          },
          {
            label: '菜单路径',
            prop: 'menuUrl',
            minWidth: '50px',
          },
          {
            label: '菜单类型',
            prop: 'menuType',
            type: 'template',
            template: 'menuType',
          },
          {
            label: '菜单描述',
            prop: 'memo',
          },
          {
            label: '操作',
            slot: 'action',
            width: '130px',
            type: 'template',
            template: 'action',
          },
        ],
      }
    },
    computed: {
      propList () {
        return Object.keys(this.props).map(item => ({
          name: item,
        }))
      },
    },
    methods: {
      onSeach:function(val){
        this.queryStr = val;
        this.loadMenus();
      },
      loadMenus:function(){
        var self = this;
        self.$http({
            url:self.$constants.BIURL+'/menu/list',
            method:'GET',
            dataType:'json',
            params:{
                menuName:self.queryStr,
                tenantId:self.$constants.userInfo.tenantId
            }
        })
        .then(function (response) {
            if(response.status ==200){
                var data = response.data;
                //console.log(data.length);
                self.meunDatas = data;
                //处理树形结构数据输出格式

                const arrChange = function(datas){
                  console.log(datas);
                    for(var i =0; i<datas.length;i++){
                      var item = datas[i];
                      console.log(item.children);
                      if(item.children && item.children.length == 0){
                           delete item.children ;
                        }else{
                            if(item.children !=null){
                              arrChange(item.children);
                            }
                        }
                    }
                };
                arrChange(data);
                self.meunTreeDatas = data;
                if(self.isUpdate){
                    self.menuForm.parentId = self.menuForm.parentId;
                }
            }
        }) .catch(function (error) {
            self.$Message.error({
                content: error.message,
                duration: 2
            });
            console.log(error);
        });
      },
      menuSelect:function(node){
         this.menuForm.deptId = node.mId;
      },
      addOrUpdate:function(name){
          var self = this;
          this.$refs[name].validate((valid) => {
              if(valid){
                  if(self.menuForm.parentId == -1) {
                        this.$Message.error('请选择所属父菜单!');
                        return;
                  }
                  self.menuForm.tenantId = self.$constants.userInfo.tenantId;
                  var url = self.$constants.BIURL+'/menu';
                  var method = 'POST';
                  if(self.isUpdate){
                      url = self.$constants.BIURL+'/menu';
                      method='PUT';
                  }
                  self.$http({
                      url:url,
                      method:method,
                      dataType:'json',
                      data:self.menuForm
                  })
                  .then(function (response) {
                      if(response.status ==200){
                          var data = response.data;
                          self.menuForm.parentId = -1;
                          if(data.code == 1){
                              self.$Message.error({
                                  content: data.data,
                                  duration: 2
                              }); 
                          }else{
                              self.current = 1;
                              self.menuModal = false;
                              self.$refs['menuForm'].resetFields();
                              self.loadMenus();
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
      hideMenuModel:function(name){
          this.$refs[name].resetFields();
          this.menuModal = false;
          this.menuForm.parentId = -1;
      },
      /**修改用户 */
      updateMenu:function(data){
          this.isUpdate = true;
          this.menuForm = Object.assign({}, data);
          this.menuForm.menuType = this.menuForm.menuType+'';
          this.menuForm.menuMode = this.menuForm.menuMode+'';
          this.userModal = true;
      },
      deleteMenu:function(data){
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
      handleDelete:function(data){
          var self = this;
          self.$http({
              url:self.$constants.BIURL+'/menu/'+data.mid,
              method:'DELETE'
          })
          .then(function (response) {
              if(response.status ==200){
                  self.$Message.success({
                      content: '数据删除成功!',
                      duration: 2
                  });
                  self.loadMenus();
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
    mounted:function(){
      this.loadMenus();
    }
  };
