<template>
  <div class="bi-main-container">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem >党讯管理</BreadcrumbItem>
      <BreadcrumbItem >栏目管理</BreadcrumbItem>
    </Breadcrumb>

    <div class="bi-container">
      <Row style="height:100%;">
        <Col span="6" style="height:100%;">
          <Card dis-hover class="card-view">
            <div slot="title">
              <div class="catalog_title">
                <div>栏目管理</div>
                <div class="catalog_icon_header">
                  <div class="i-icon i-icon-add" @click="addHandler" />
                  <div class="i-icon i-icon-delete" @click="deleteCatalog"/>
                  <div class="i-icon i-icon-refresh" @click="refreshCatalog"/>
                </div>
              </div>
            </div>
            <div > <Input v-model="queryStr" search @on-search="catalogSearch" placeholder="按名称搜索..." /></div>
            <Tree @on-select-change="treeNodeClick" style="margin-top:10px;" class="catalog_tree" :data="catalogDatas"></Tree>
          </Card>
        </Col>
        <Col span="18" style="height:100%;overflow-y:scroll">
            <Form ref="catalogRefForm" :model="catalogForm" :rules="catalogRuleValidate" :label-width="80" >
                <FormItem label="栏目名称" prop="catalogName">
                    <Input v-model="catalogForm.catalogName" placeholder="请输入栏目名称" />
                </FormItem>
                <FormItem label="栏目图标" prop="catalogIcon">
                    <Input v-model="catalogForm.catalogIcon" placeholder="请输入栏目名称" >
                        <Button @click="showImageView" slot="append" icon="ios-images"></Button>
                    </Input>
                     <image-view ref="imageView"
                        :imageSelect="imageSelect"></image-view>
                </FormItem>
                <FormItem label="链接地址" prop="catalogUrl">
                    <Input v-model="catalogForm.catalogUrl" placeholder="请输入栏目名称" />
                </FormItem>
                <FormItem label="排序号" prop="sortNo">
                    <Input v-model="catalogForm.sortNo" placeholder="请输入栏目名称" />
                </FormItem>
                <FormItem label="显示位置" prop="showPoints">
                    <CheckboxGroup v-model="showPoints">
                        <Checkbox label="PC">PC</Checkbox>
                        <Checkbox label="MOBILE">手机</Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="状态" prop="catalogState">
                   <i-switch v-model="isUsed" size="large">
                        <span slot="open">启用</span>
                        <span slot="close">停用</span>
                    </i-switch>
                </FormItem>
                <Row>
                    <div style="text-align:center">
                        <Button type="primary" @click="addOrUpdateCatalog()">保存</Button>
                        <Button style="margin-left: 8px" @click="resetCatalog()">重置</Button>
                    </div>
                </Row>
            </Form>
        </Col>
      </Row>
    </div>
   </div>
        
</template>

<script>
import ImageView from '../public/imageView';
export default {
    components: {ImageView},
    data () {
        return {
            queryStr:'',
            catalogDatas:[],
            showPoints:[],
            catalogId:-1,
            catalogName:'',
            isUsed:true,
            isUpdate:false,
            catalogForm:{
                catalogName:'',
                catalogType:'',
                parentId:0,
                sortNo:0,
                catalogUrl:'',
                catalogIcon:'',
                catalogState:'',
                creator:''
            },
            catalogRuleValidate:{
                catalogName: [
                    { required: true, message: '栏目名称不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
         showImageView:function(){
            this.$refs['imageView'].showImageModel(true);
            this.$refs['imageView'].setHeaders();
            this.$refs['imageView'].loadImageByUser();
        },
         imageSelect:function(value){
            this.catalogForm.catalogIcon = value;
            this.$refs['imageView'].showImageModel(false);
        },
        catalogSearch:function(value){
            this.queryStr =value;
            this.findAllCatalog();
        },
        addHandler:function(){
            var self = this;
            if(this.catalogId == -1){
                self.$Message.error({
                    content: '请选择上级栏目！',
                    duration: 2
                });
                return;
            }
            this.isUpdate = false;
            const _catalogName = this.catalogName;
            this.$refs.catalogRefForm.resetFields();
            this.catalogForm.parentId = this.catalogId;
            this.catalogName = _catalogName;
        },
        refreshCatalog:function(){
            this.findAllCatalog();
        },
        deleteCatalog:function(){
            var self = this;
            if(this.catalogId == -1){
                self.$Message.error({
                    content: '请选择你要删除的栏目！',
                    duration: 2
                });
                return;
            }
            this.$Modal.confirm({
                title:'系统提示',
                content:'确定要删除该栏目吗?',
                okText:'确定',
                cancelText:'取消',
                onOk:function(){
                    self.deleteHandler();
                }
            });
        },
        deleteHandler:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/catalog/'+self.catalogId,
                method:'DELETE'
            }).then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.findAllCatalog();
                }}).catch(function (error) {
                    self.$Message.error({
                        content: error.message,
                        duration: 2
                    });
            });
        },
        addOrUpdateCatalog :function(){
            var self = this;
            this.$refs['catalogRefForm'].validate((valid) => {
                if(valid){
                   
                    if(self.showPoints && self.showPoints.length >0){
                        for(var i=0; i<self.showPoints.length;i++){
                            if(self.showPoints[i] == 'PC'){
                                self.catalogForm.toPc = 1;
                            }
                            if(self.showPoints[i] == 'MOBILE'){
                                self.catalogForm.toMobile = 1;
                            }
                        }
                    }

                    if(self.isUsed){
                        self.catalogForm.catalogState = 1;
                    }else{
                        self.catalogForm.catalogState = 0;
                    }

                    self.catalogForm.tenantId = self.$constants.userInfo.tenantId;
                    var url = self.$constants.BIURL+'/political/catalog';
                    var method = 'POST';
                    if(self.isUpdate){
                        method='PUT';
                    }
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.catalogForm
                    })
                    .then(function (response) {
                        if(response.status ==200){
                            var data = response.data;
                            self.addHandler();
                            if(data.code == 1){
                                self.$Message.error({
                                    content: data.data,
                                    duration: 2
                                }); 
                            }else{
                                self.refreshCatalog();
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
        resetCatalog :function(){
            this.$refs.catalogRefForm.resetFields();
            this.catalogId = -1;
            this.catalogName ='';
        },
        treeNodeClick:function(node){
           if(node && node.length >0 ){
               const _node = node[0];
                this.catalogForm = Object.assign({}, _node);
                this.catalogId = _node.id;
                this.catalogName = _node.catalogName;
                this.isUpdate = true;
                if(_node.catalogState == 1){
                    this.isUsed = true;
                }else{
                    this.isUsed = false;
                }

                if(this.catalogForm.toPc && this.catalogForm.toPc ==1){
                    this.showPoints.push('PC');
                }

                if(this.catalogForm.toMobile && this.catalogForm.toMobile ==1){
                    this.showPoints.push("MOBILE");
                }

           }else{
               this.catalogId = -1;
               this.catalogName = '';
               this.$refs.catalogRefForm.resetFields();
           }
        },
        findAllCatalog:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/catalog/findAll',
                method:'GET',
                params:{
                queryStr:self.queryStr
                }
            }).then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.catalogDatas = data.data;
                }}).catch(function (error) {
                    self.$Message.error({
                        content: error.message,
                        duration: 2
                    });
                console.log(error);
            });
        }
    },
    mounted:function(){
        this.findAllCatalog();
    }
}
</script>


<style>


  .header{
    margin-bottom: 15px;
  }

  .catalog_title{
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    justify-content:space-between;
    line-height: 28px;
  }

.catalog_icon_header{
    display: flex;
}

.catalog_icon_header div{
    margin-right: 10px;
    cursor: pointer;
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
  .card-view .catalog_tree{
    overflow: scroll;
    height: 100%;
  }
</style>

    