<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>村社区管理</BreadcrumbItem>
            <BreadcrumbItem>第一书记</BreadcrumbItem>
            <BreadcrumbItem>双签到</BreadcrumbItem>
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
                            <Input v-model="signParams.query"  @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
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
                <Button  icon="ios-cloud-upload">导出</Button>
                </Col>
            </Row>
            <Table border ref="selection" :columns="doubleSignCloumns" :data="doubleSignDatas" :min-height="200">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="detailDoubleSign(index)">查看</Button>
                    <Button  size="small" style="margin-right: 5px" @click="deleteDoubleSign(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>

        <Drawer :closable="false" width="540" v-model="isDetail">
            <div class="tableTitle"> 双签到记录表</div>
              <table width="100%" class="gridtable">
                  <tr>
                      <td> {{signFrom.createTime}}</td>
                      <td>{{signFrom.week}}</td>
                      <td>天气</td>
                      <td colspan="2">{{signFrom.weather}}</td>
                  </tr>
                  <tr>
                      <td>工作地点</td>
                      <td colspan="2">{{signFrom.workingAddress}}</td>
                      <td>工作组长签字</td>
                      <td colspan="2">{{signFrom.groupLeaderSign}}</td>
                  </tr>
                  <tr>
                      <td colspan="6">
                          工作内容:<br>
                        {{signFrom.jobContent}}
                      </td>
                  </tr>
                  <tr>
                      <td colspan="2">
                          派出单位负责人<br>
                          签字:{{signFrom.personChargeSign}}<br>
                          <div style="text-align:right">{{signFrom.pcsTime}}</div>
                      </td>
                      <td colspan="3">
                           所驻村"两委"负责人<br>
                          (或联系户)签字:{{signFrom.villagePersonCharge}}<br>
                          <div style="text-align:right">{{signFrom.vpcTime}}</div>
                      </td>
                  </tr>
              </table>
        </Drawer>
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
.tableTitle{
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
}
table.gridtable {
	font-size:12px;
	color:#333333;
	border-width: 2px;
	border-color: #666666;
	border-collapse: collapse;
}
table.gridtable th {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #dedede;
}
table.gridtable td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #ffffff;
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
            userModal:false,
            isUpdate:false,
            queryStr:'',
            isDetail:false,
            doubleSignCloumns:[{
                type: 'index',
                width: 70,
                title:'序号',
                align: 'center'
            },{
                title: '姓名',
                key: 'name'
            },{
                title: '工作地点',
                key: 'workingAddress'
            },{
                 title: '组长签字',
                key: 'groupLeaderSign'
            },{
                 title: '负责人签字',
                key: 'personChargeSign'
            },{
                 title: '负责人签字日期',
                key: 'pcsTime'
            },{
                 title: '两委签字',
                key: 'villagePersonCharge'
            },{
                 title: '两委签字日期',
                key: 'vpcTime'
            },{
                title: '操作',
                slot: 'action',
                width: 140,
                align: 'center'
            }],
            doubleSignDatas:[],
            departments:[],
            signParams:{
                current:1,
                size:15,
                tenantId:'cddkjfdkdeeeiruei8888',
                startTime:null,
                endTime:null,
                query:'',
                deptId:null,
                deptCode:-1
            },
            signFrom:{
                week:'',
                weather:'',
                workingAddress:'',
                groupLeaderSign:'',
                villagePersonCharge:'',
                personChargeSign:'',
                jobContent:'',
                groupLeaderSign:'',
                pcsTime:'',
                vpcTime:'',
                createTime:''
            }
        }
    },
    methods:{
        onSeach:function(){
            this.signParams.current = 1;
            this.loadDoubleSign();
        },
        changepage:function(value){
            this.signParams.current = value;
            this.loadDoubleSign();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadDoubleSign();
        },
        searchByQuery:function(){
            this.loadDoubleSign();
        },
        dateClearSearch:function(){
            this.signParams.startTime = null;
            this.signParams.endTime = null;
            this.loadDoubleSign();
        },
        orgSelect:function(node){
            this.signParams.deptId = node.did;
            this.signParams.deptCode = node.deptCode;
        },
        onDateSearch:function(value){
            this.signParams.startTime  = getLocalTime(value[0]);
            this.signParams.endTime = getLocalTime(value[1]);
            this.loadDoubleSign();
        },
        getLocalTime: function (nS) {     
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
        },
        orgSearchSelect:function(node){
            this.signParams.deptCode = node.deptCode;
            this.loadDoubleSign();
        },
        detailDoubleSign:function(index){
            this.signFrom = Object.assign({},this.doubleSignDatas[index]);
            this.signFrom.pcsTime = this.getFormatTime(this.signFrom.pcsTime);
            this.signFrom.vpcTime = this.getFormatTime(this.signFrom.vpcTime);
            this.signFrom.createTime = this.getFormatTime(this.signFrom.createTime);
            this.isDetail = true;
        },
        getFormatTime:function(nS) {     
            let date = new Date(nS); 
            let y = date.getFullYear(); 
            let m = date.getMonth() + 1; 
            m = m < 10 ? ('0' + m) : m; 
            let d = date.getDate(); 
            d = d < 10 ? ('0' + d) : d; 
            let h = date.getHours(); 
            h = h < 10 ? ('0' + h) : h; 
            return y + '年' + m + '月' + d + '日' ; 
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
        loadDoubleSign:function(){
            var self = this;
            if(!self.signParams.deptId || self.signParams.deptId == null){
                self.signParams.deptCode = '';
            }
            self.$http({
                url:self.$constants.BIURL+'/double/sign/list',
                method:'GET',
                params:self.signParams
            }) .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.doubleSignDatas = data.data.records;
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
            const data = this.doubleSignDatas[index];
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
                url:self.$constants.BIURL+'/double/sign/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadVillagePeople();
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
        this.loadDepartment();
        this.loadDoubleSign();
    }
}
</script>
