<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem >营商环境</BreadcrumbItem>
            <BreadcrumbItem >服务评分</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
             <Row class="header">
                 <Form :label-width="90">
                <Col span="7">
                    <FormItem label="所属办事窗口">
                        <Select v-model="params.winId" clearable >
                            <Option v-for="(item,index) in windowDatas" :value="item.id" :key="index">{{ item.winName }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col  span="6">
                    <FormItem label="事项名称">
                        <Input v-model="params.query"  placeholder="输入事项名称" />
                    </FormItem>
                </Col>
                 <Col  span="6">
                    <FormItem label="上报时间">
                        <DatePicker type="daterange" @on-clear="dateClearSearch" @on-change="onDateSearch" split-panels placeholder="选择查询的时间区间" ></DatePicker>
                    </FormItem>
                </Col>
                </Form>
                <Col  span="2" style="padding-left:15px;"><Button @click="onSeach" type="primary" icon="ios-search"></Button></Col>
                <Col  span="2" style="padding-left:15px;"><Button @click="exportExcel" icon="ios-cloud-upload">导出Excel</Button></Col>
            </Row>
             <Table border ref="selection" :columns="matterCloumns" :data="scoreDatas">
                <template slot-scope="{ row, index }" slot="action">
                    <Button  size="small" style="margin-right: 5px" @click="deleteMatter(index)">删除</Button>
                </template>
            </Table>
            <Page :total="dataCount" :page-size="params.size" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
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
import exportUtils from '@/vendor/export.js'
export default {
    data () {
        return {
            dataCount:0,
            params:{
                size:15,
                current:1,
                winId:-1,
                startDate:'',
                endDate:'',
                query:''
            },
            matterCloumns:[
                {
                    type: 'index',
                    width: 70,
                    title:'序号',
                    align: 'center'
                },{
                    title: '窗口名称',
                    key: 'winName',
                    width:'160'
                },{
                    title: '事项名称',
                    key: 'matterName',
                    width:'200'
                },{
                    title: '窗口办事员',
                    key: 'operatingUserName'
                },{
                    title: '满意度',
                    key: 'scoreType'
                },{
                    title: '评分',
                    key: 'score'
                },{
                    title: '评分人',
                    key: 'rater'
                },{
                    title: '备注',
                    key: 'memo'
                },{
                    title: '操作',
                    slot: 'action',
                    width: 120,
                    align: 'center'
                }
            ],
            windowDatas:[],
            scoreDatas:[]
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadOperatingScore();
        },
        changepage:function(value){
            this.params.current = value;
            this.loadOperatingScore();
        },
        onChangePageSize:function(value){
            this.params.size = value;
            this.loadOperatingScore();
        },
        dateClearSearch:function(){
            this.params.startDate = '';
            this.params.endDate = '';
            this.loadOperatingScore();
        },
        onDateSearch:function(value){
            this.params.startDate = value[0];
            this.params.endDate = value[1];
            this.loadOperatingScore();
        },
        loadOperatingScore:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/operating/score/list',
                method:'GET',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.scoreDatas = data.data.records;
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
        findAllWindow:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/operating/window/list',
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
                    self.windowDatas = data.data.records;
                }
            }) .catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        deleteMatter:function(index){
            var self = this;
            const data = this.windowDatas[index];
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
                url:self.$constants.BIURL+'/operating/window/'+data.id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadOperatingScore();
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
            var self = this;
            exportUtils.exportExcel(this.$constants.BIURL+'/operating/score/export',this.params,function(){
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        }
    },
    mounted:function(){
        this.findAllWindow();
        this.loadOperatingScore();
    }
}
</script>
