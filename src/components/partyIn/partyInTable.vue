<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>党建阵地</BreadcrumbItem>
            <BreadcrumbItem>党员发展</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
             <Row class="header">
               <Form :label-width="90">
                   <Row>
                    <Col span="8">
                        <FormItem label="所属组织:">
                            <treeselect
                                    v-model="signParams.deptId"
                                    :options="departments"
                                    :max-height="200"
                                    @select="orgSelect"
                                    noResultsText="没有找到匹配结果"
                                    placeholder="请选择组织..." />
                        </FormItem>
                    </Col>
                    <Col span="8">
                            <FormItem label="用户名:">
                            <Input v-model="signParams.userName"  @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
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
                            <FormItem label="所处阶段:">
                                <Select  v-model="signParams.currentState">
                                    <Option value="-1">全部</Option>
                                    <Option value="1">申请入党</Option>
                                    <Option value="2">入党积极分子的确定和培养</Option>
                                    <Option value="3">发展对象的确定和考察</Option>
                                    <Option value="4">预备党员的接收阶段</Option>
                                    <Option value="5">预备党员的转正</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="状态:">
                                <Select  v-model="signParams.state">
                                    <Option value="-1">全部</Option>
                                    <Option value="1">
                                        <img class="stateImg" src="@/assets/images/cr2.png">正常</Option>
                                   
                                    <Option value="2">
                                        <img class="stateImg" src="@/assets/images/cr1.png">即将期满</Option>
                                     <Option value="3">
                                        <img class="stateImg" src="@/assets/images/cr3.png">
                                        已期满
                                    </Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" style="padding-left:20px;">
                            <Button @click="searchByQuery"  icon="ios-search">搜索</Button>
                            <Divider type="vertical"/>
                            <Button @click="addPartIn"  icon="ios-cloud-download">新增</Button>
                            <Divider type="vertical"/>
                            <Dropdown @on-click="exportBtnClick">
                                <Button>
                                    导出
                                    <Icon type="ios-cloud-download"></Icon>
                                </Button>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="exp1">导出党员发展表(excel)</DropdownItem>
                                    <DropdownItem name="exp2">发展党员全程纪实表(excel)</DropdownItem>
                                    <DropdownItem name="exp3">发展党员工作全程纪实表(doc)</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                   </Row>
               </Form>
            </Row>
            <Table class="partyInTable" border ref="selection" :columns="partyInCloumns" :data="partyInDatas">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="detailDoubleSign(index)">修改</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deleteDoubleSign(index)">删除</Button>
                </template>

                <template slot-scope="{row}" slot="minority">
                    <div v-for="(option,index) in minoritys" :key="index">
                        <span v-show="option.value == row.minority">{{option.name}}</span>
                    </div>
                </template>
            </Table>
            <Row>
                <Col span="12">
                    状态颜色说明: <img class="stateImg" src="@/assets/images/cr3.png">已期满  &nbsp;&nbsp;
                    <img class="stateImg" src="@/assets/images/cr1.png">即将期满 &nbsp;&nbsp;
                    <img class="stateImg" src="@/assets/images/cr2.png">正常 &nbsp;&nbsp;
                </Col>
                <Col span="12">
                    <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
                </Col>
            </Row>
            
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
.partyInTable{
    width: 100%;
    overflow: scroll;
}

.stateImg{
    width:24px;
    height: 24px;
    vertical-align: middle;
}
</style>
<script>

import cr1Img from '@/assets/images/cr1.png'
import cr2Img from '@/assets/images/cr2.png'
import cr3Img from '@/assets/images/cr3.png'

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import exportUtils from '@/vendor/export.js'
import minoritys from '@/minority.js'

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
            userModal:false,
            minoritys:minoritys,
            isUpdate:false,
            queryStr:'',
            isDetail:false,
            partyInCloumns:[
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },{
                type: 'index',
                width: 70,
                title:'序号',
                align: 'center'
            },{
                title: '状态',
                key: 'state',
                width:'65',
                render : (h,params)=>{
                    var state = params.row.state;
                    if(state == 1){
                        return h('img',{
                            attrs:{
                                src:cr2Img
                            },
                            style: {
                                width: '24px',
                                height:'24px'
                            }
                        }) 
                    }

                    if(state == 2){
                        return h('img',{
                            attrs:{
                                src:cr1Img
                            },
                            style: {
                                width: '24px',
                                height:'24px'
                            }
                        }) 
                    }

                    if(state == 3){
                        return h('img',{
                            attrs:{
                                src:cr3Img
                            },
                            style: {
                                width: '24px',
                                height:'24px'
                            }
                        }) 
                    }

                    return h('img',{
                        attrs:{
                            src:cr2Img
                        },
                        style: {
                                width: '24px',
                                height:'24px'
                            }
                        }) 
                },
            },{
                title: '姓名',
                key: 'userName',
                 width:'150'
            },{
                title: '性别',
                key: 'sex',
                 width:'100',
                 render:(h,params) =>{
                     let value = params.row.sex;
                     switch(value){
                        case 0:
                            return h('span','男');
                            break;
                        case 1:
                            return h('span','女');
                            break;
                    }
                 }
            },{
                title: '民族',
                key: 'minority',
                width:'100',
                slot:'minority'
            },{
                 title: '出生日期',
                key: 'birthday',
                 width:'180'
            },{
                 title: '所处阶段',
                key: 'currentState',
                width:'180',
                render:(h,params) =>{
                    let value = params.row.currentState;
                    switch(value){
                        case 1:
                            return h('span','申请入党');
                            break;
                        case 2:
                            return h('span','入党积极分子的确定和培养教育');
                            break;
                        case 3:
                            return h('span','发展对象的确定和考察');
                            break;
                        case 4:
                            return h('span','预备党员的接收阶段');
                            break;
                        case 5:
                            return h('span','预备党员的转正');
                            break;
                    }
                }
            },{
                 title: '联系电话',
                key: 'phoneNo',
                width:'180'
            },{
                 title: '申请入党时间',
                key: 'firstDay',
                width:'180'
            },{
                 title: '成为积极分子时间',
                key: 'partyDay',
                width:'180'
            },{
                 title: '成为发展对象时间',
                key: 'discDay',
                 width:'180'
            },{
                 title: '成为预备党员时间',
                key: 'meetingDay',
                 width:'180'
            },{
                 title: '申请转正时间',
                key: 'becomeDay',
                 width:'180'
            },{
                 title: '编入党支部名称',
                key: 'branchName',
                 width:'180'
            },{
                 title: '成为正式党员时间',
                key: 'partyStartDay',
                 width:'180'
            },{
                 title: '创建时间',
                key: 'createDate',
                 width:'180'
            },{
                 title: '创建用户',
                key: 'creatorName',
                 width:'180'
            },{
                title: '操作',
                slot: 'action',
                fixed: 'right',
                width: 140,
                align: 'center'
            }],
            partyInDatas:[],
            departments:[],
            signParams:{
                current:1,
                size:10,
                tenantId:'',
                startTime:null,
                endTime:null,
                userName:'',
                deptId:null,
                currentState:-1,
                state:-1,
                deptCode:-1
            }
        }
    },
    methods:{
        onSeach:function(){
            this.signParams.current = 1;
            this.loadPartyInData();
        },
        changepage:function(value){
            this.signParams.current = value;
            this.loadPartyInData();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadPartyInData();
        },
        searchByQuery:function(){
            this.loadPartyInData();
        },
        dateClearSearch:function(){
            this.signParams.startTime = null;
            this.signParams.endTime = null;
            this.loadPartyInData();
        },
        orgSelect:function(node){
            this.signParams.deptId = node.did;
            this.signParams.deptCode = node.deptCode;
        },
        onDateSearch:function(value){
            this.signParams.startTime  = value[0];
            this.signParams.endTime =value[1];
            this.loadPartyInData();
        },
        orgSearchSelect:function(node){
            this.signParams.deptCode = node.deptCode;
            this.loadDoubleSign();
        },
        addPartIn:function(){
            this.$router.push({
                'name': 'partyIn',
                'path': '/partyIn'
            })
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
        loadPartyInData:function(){
            var self = this;
            if(!self.signParams.deptId || self.signParams.deptId == null){
                self.signParams.deptCode = '';
            }
            self.signParams.tenantId = self.$constants.userInfo.tenantId;
            self.$http({
                url:self.$constants.BIURL+'/political/employee/apply/one/list',
                method:'GET',
                params:self.signParams
            }) .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.partyInDatas = data.data.records;
                    self.dataCount = data.data.total;
                }
            }).catch(function (error) {
            self.$Message.error({
                content: error.message,
                duration: 2
            });
            console.log(error);
            });
        },
        deleteDoubleSign:function(index){
            var self = this;
            const data = this.partyInDatas[index];
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
                url:self.$constants.BIURL+'/political/employee/apply/one/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadPartyInData();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        detailDoubleSign:function(index){
            var self = this;
            const data = this.partyInDatas[index];
             this.$router.push({
                'name': 'partyIn',
                'path': '/partyIn',
                query:{
                    mainId :data.id
                }
            })
        },
        exportBtnClick:function(name){
            var tenantId = this.$constants.userInfo.tenantId;
            var deptCode = this.$constants.userInfo.deptCode;
            var selections = this.$refs.selection.getSelection();
            var ids = null;
            if(selections && selections.length >0){
                var _ids = [];
                for(var i=0;i<selections.length;i++){
                    _ids.push(selections[i].id);
                }
                ids = _ids.join(',');
            }
            switch(name){
                case 'exp1':
                    var params = {
                        tenantId:tenantId,
                        deptCode:deptCode,
                        ids:ids
                    }
                    exportUtils.exportExcel(this.$constants.BIURL+'/political/employee/apply/one/exportPartyIn',params);
                    break;
                case 'exp2':
                    var params = {
                        tenantId:tenantId,
                        deptCode:deptCode,
                        ids:ids
                    }
                    exportUtils.exportExcel(this.$constants.BIURL+'/political/employee/apply/one/exportPartyCommit',params);
                    break;
                case 'exp3':
                     var params = {
                        ids:ids
                    }
                    exportUtils.exportExcel(this.$constants.BIURL+'/political/employee/apply/one/exportWord',params);
                    break;
            }
        }
    },
    mounted:function(){
        this.loadDepartment();
        this.loadPartyInData();
    }
}
</script>
