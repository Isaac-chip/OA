<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem >日常工作</BreadcrumbItem>
            <BreadcrumbItem >考勤管理</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
             <Row class="header">
               <Form :label-width="90">
                   <Row>
                    <Col span="8">
                        <FormItem label="所属组织:">
                            <treeselect
                                v-model="params.deptId"
                                :options="departments"
                                :max-height="200"
                                @select="orgSelect"
                                noResultsText="没有找到匹配结果"
                                placeholder="请选择组织..." />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="用户名:">
                            <Input v-model="params.query"  @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="创建时间:">
                            <DatePicker type="daterange" @on-clear="dateClearSearch" @on-change="onDateSearch" split-panels placeholder="选择查询的时间区间" ></DatePicker>
                        </FormItem>
                    </Col>
                   </Row>
                   <Row>
                       <Col span="8">
                            <FormItem label="打卡类型:">
                                <Select v-model="params.types">
                                    <Option value="">全部</Option>
                                    <Option value="1">上午上班</Option>
                                    <Option value="2">请假</Option>
                                    <Option value="3">出差</Option>
                                    <Option value="4">上午下班</Option>
                                    <Option value="5">下午上班</Option>
                                    <Option value="6">下午下班</Option>
                                </Select>
                            </FormItem>
                       </Col>
                       <Col  span="14" style="text-align:right">
                            <Button @click="searchByQuery"  icon="ios-search">搜索</Button>
                            <Divider type="vertical"/>
                            <Button @click="exportExcel" icon="ios-cloud-upload">导出Excel</Button>
                        </Col>
                   </Row>
               </Form>
               
            </Row>
             <Table border ref="selection" :columns="userSignCloumns" :data="userSignDatas">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="deleteUserSign(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="params.pageSize" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>
    </div>
</template>
<style>
.header{
    margin-bottom: 15px;
    }
.pageView{
    text-align: right;
    margin-top: 10px;
}
</style>

<script> 

import Treeselect from '@riophae/vue-treeselect';
import exportUtils from '@/vendor/export.js'
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    components: { Treeselect },
    data () {
        return {
            dataCount:0,
            // 每页显示多少条
            params:{
                pageSize:15,
                pageNo:1,
                start:'',
                end:'',
                query:'',
                deptId:null,
                types:''
            },
            userSignCloumns:[
                {
                    type: 'index',
                    width: 70,
                    title:'序号',
                    align: 'center'
                },{
                    title: '用户名',
                    key: 'username'
                },{
                    title: '所属组织',
                    key: 'deptName',
                    width:'200'
                },{
                    title: '定位地址',
                    key: 'address'
                },{
                    title: '打卡类型',
                    key: 'types',
                    render:(h,param) =>{
                        var type = param.row.types;
                        var text = '上午上班';
                        switch(type){
                            case 1:
                                text = '上午上班';
                                break;
                            case 2:
                                text = '请假';
                                break;
                            case 3:
                                text = '出差';
                                break;
                            case 4:
                                text = '下午上班';
                                break;
                            case 5:
                                text = '上午下班';
                                break;
                            case 6:
                                text = '下午下班';
                                break;
                        }

                        return h('span',text);
                    }
                },{
                    title: '上报时间',
                    key: 'reportTime',
                    width:'140',
                    render:(h,param)=>{
                        return h('span',this.$timeToDate(param.row.reportTime));
                    }
                },{
                    title: '备注',
                    key: 'memo'
                },{
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            userSignDatas:[],
            departments:[]
        }
    },
    methods:{
        onSeach:function(){
            this.params.pageNo = 1;
            this.loadUserSign();
        },
        changepage:function(value){
            this.params.pageNo = value;
            this.loadUserSign();
        },
        onChangePageSize:function(value){
            this.params.size = value;
            this.loadUserSign();
        },
        orgSelect:function(node){
            this.params.deptId = node.did;
        },
        dateClearSearch:function(){
            this.params.start = '';
            this.params.end = '';
            this.loadUserSign();
        },
        onDateSearch:function(value){
            this.params.start = value[0];
            this.params.end = value[1];
            this.loadUserSign();
        },
        searchByQuery:function(){
            this.loadUserSign();
        },
        loadUserSign:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/user/sign/list',
                method:'GET',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.userSignDatas = data.data.records;
                    self.dataCount = data.data.total;
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        deleteUserSign:function(index){
            var self = this;
            const data = this.userSignDatas[index];
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
                    self.departments = data;
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
                url:self.$constants.BIURL+'/user/sign/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadUserSign();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        exportExcel:function(){
            exportUtils.exportExcel(this.$constants.BIURL+'/user/sign/export',this.params);
        }
    },
    mounted:function(){
        this.loadUserSign();
        this.loadDepartment();
    }
}
</script>
