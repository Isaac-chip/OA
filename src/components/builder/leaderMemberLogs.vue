<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>村社区管理</BreadcrumbItem>
            <BreadcrumbItem>工作队长</BreadcrumbItem>
            <BreadcrumbItem>工作日志</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
             <Row class="header">
               <Form :label-width="90">
                   <Row>
                    <Col span="8">
                            <FormItem label="所属村社区:">
                                <treeselect
                                        v-model="WorkLogDto.villageId"
                                        :options="villageDatas"
                                        :max-height="200"
                                        noResultsText="没有找到匹配结果"
                                        placeholder="请选择村(社区)..." />
                            </FormItem>
                    </Col>
                    <Col span="8">
                            <FormItem label="用户名:">
                            <Input v-model="WorkLogDto.query"  @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                            <FormItem label="创建时间:">
                                <DatePicker type="daterange" @on-clear="dateClearSearch" @on-change="onDateSearch" split-panels placeholder="选择查询的时间区间" ></DatePicker>
                            </FormItem>
                    </Col>
                   </Row>
               </Form>
               <Col  span="24" style="text-align:right">
                <Button @click="searchByQuery"  icon="ios-search">搜索</Button>
                <Divider type="vertical"/>
                <Button  icon="ios-cloud-download">导入</Button>
                <Divider type="vertical"/>
                <Button icon="ios-cloud-upload">导出</Button>
                </Col>
            </Row>
            <Table border ref="selection" :columns="workLogCloumns" :data="workLogDatas" :min-height="200">
                <template slot-scope="{ row, index }" slot="action">
                   <Dropdown trigger="click" :transfer="true" @on-click="oparHandler">
                        <a href="javascript:void(0)">
                            更多操作
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="del" ref="del" :data-index="index">删除</DropdownItem>
                            <DropdownItem name="detail" ref="detail" :data-index="index">查看详情</DropdownItem>
                            <DropdownItem name="push" ref="push" :data-index="index">优秀日志推送</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>

            <Drawer :closable="false" width="540" v-model="isDetail">
                <p :style="pStyle">日志详细信息</p>
                 <Divider />
                <div class="demo-drawer-profile">
                    <Row>
                        <Col span="3" class="title">日志标题:</Col>
                        <Col span="19" class="content">{{workLogForm.logTitle}}</Col>
                    </Row>
                    <Row>
                        <Col span="3" class="title">填报人:</Col>
                        <Col span="19" class="content">{{workLogForm.name}}</Col>
                    </Row>
                    <Row>
                        <Col span="3" class="title">村(社区):</Col>
                        <Col span="19" class="content">{{workLogForm.villageName}}</Col>
                    </Row>
                    <Row>
                        <Col span="3" class="title">填报时间:</Col>
                        <Col span="19" class="content">{{workLogForm.createTime}}</Col>
                    </Row>
                    <Row>
                        <Col span="3" class="title">日志内容:</Col>
                        <Col span="19" class="content">{{workLogForm.logContent}}</Col>
                    </Row>
                    <Divider />
                    <div class="attView" v-if="workLogForm.images !=null && workLogForm.images.length>0">
                        <img v-for="item in images" :key="item.id" :src="item.attPath" />
                    </div>
                </div>
            </Drawer>        
        </div>
    </div>
</template>
<style  scoped>
.header{
    margin-bottom: 5px;
}

.pageView{
    text-align: right;
    margin-top: 10px;
}

.userFrom .ivu-modal{
    width: 620px !important;
}

.demo-drawer-profile{
    font-size: 14px;
}

.demo-drawer-profile .title{
    text-align: right;
}

.demo-drawer-profile .content{
    padding-left: 10px;
    color: #666
}

.demo-drawer-profile .ivu-col{
    margin-bottom: 12px;
}

 .attView {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .attView img {
    width: 120px;
    height: 120px;
    margin: 5px;
  }
</style>
<script>

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    components: { Treeselect },
    data() {
        return {
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            current:1,
            size:15,
            villageId:null,
            type:2,
            queryStr:'',
            isDetail:false,
            pStyle: {
                fontSize: '16px',
                color: 'rgba(0,0,0,0.85)',
                lineHeight: '24px',
                display: 'block',
                marginBottom: '16px'
            },
            workLogCloumns:[{
                type: 'index',
                width: 70,
                title:'序号',
                align: 'center'
            },{
                title: '日志标题',
                key: 'logTitle',
                width: 200,
            },{
                title: '用户名',
                key: 'name'
            },{
                title: '所属组织',
                key: 'deptName'
            },{
                 title: '所属村社区',
                key: 'villageName'
            },{
                 title: '推荐数量',
                key: 'recommendNum'
            },{
                 title: '填报日期',
                key: 'createTime'
            },{
                title: '操作',
                slot: 'action',
                width: 120,
                align: 'center'
            }],
            workLogDatas:[],
            villageDatas:[],
            WorkLogDto:{
                current:1,
                size:15,
                type:1,
                logType:2,
                villageId:null,
                query:'',
                tenantId:'',
                startDate:'',
                endDate:''
            },
            workLogForm:{
                createTime:'',
                deptName:'',
                logContent:'',
                logTitle:'',
                name:'',
                villageName:'',
                images:[]
            }
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadWorkLogByQuery();
        },
        changepage:function(value){
            this.current = value;
            this.loadVillagePeople();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadVillagePeople();
        },
        orgSearchSelect:function(node){
            this.WorkLogDto.villageId = node.id;
            this.loadWorkLogByQuery();
        },
        searchByQuery:function(){
            this.loadWorkLogByQuery();
        },
        dateClearSearch:function(){
            this.WorkLogDto.startDate = '';
            this.WorkLogDto.endDate = '';
            this.loadWorkLogByQuery();
        },
        onDateSearch:function(value){
            this.WorkLogDto.startDate = value[0];
            this.WorkLogDto.endDate = value[1];
            this.loadWorkLogByQuery();
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
        oparHandler:function(name){
           const self = this;
           var index = this.$refs[name].$el.dataset.index;
           var data = this.workLogDatas[index];
           switch(name){
               case 'del':
                   self.deleteWorkLog(index);
                   break;
                case 'detail':
                   self.loadWorkLogById(data.id);
                   self.isDetail = true;
                    break;
                case 'push':
                    break;
           }
        },
        deleteWorkLog:function(index){
            var self = this;
            const data = this.workLogDatas[index];
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
                url:self.$constants.BIURL+'/worklog/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadWorkLogByQuery();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        loadWorkLogById:function(id){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/worklog/findById',
                method:'GET',
                dataType:'json',
                params:{
                    id:id,
                    type:self.type
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.workLogForm = data.data;
                    console.log(data);
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        loadWorkLogByQuery:function(){
            var self = this;
            self.WorkLogDto.current = self.current;
            self.WorkLogDto.size = self.size;
            self.WorkLogDto.tenantId = self.$constants.userInfo.tenantId;
            self.$http({
                url:self.$constants.BIURL+'/worklog/findWorkLogByQuery',
                method:'POST',
                dataType:'json',
                data:self.WorkLogDto
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.workLogDatas = data.data.records;
                    self.dataCount = data.data.total;
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
        this.loadVillage();
        this.loadWorkLogByQuery();
    }
}
</script>
