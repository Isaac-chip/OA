<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>党建考核</BreadcrumbItem>
            <BreadcrumbItem>专项考核结果</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
            <Row class="header">
            <Col  span="9">
                上报时间：<DatePicker type="daterange" placeholder="上报时间" style="width: 250px"></DatePicker>
            </Col >
            <Col  span="9">
                <Input v-model="query.title" search enter-button @on-search="onSeach" placeholder="输入需要查找的内容" />
            </Col >
            <Col span="6" style="text-align:right"><Button>导出到Excel</Button></Col>
        </Row>
         
        <Table border ref="selection" :columns="partyAmCloumns" :data="partyAmDatas" :min-height="200">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="showDetail(index)">查看</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
           
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
        </div>
    </div>
</template>

<style  scoped>
    .header{
        margin-bottom: 15px;
    }

    .pageView{
        text-align: right;
        margin-top: 10px;
    }
</style>

<script>
    export default {
        data () {
            return {
                // 初始化信息总条数
                dataCount:0,
                // 每页显示多少条
                pageSize:10,
                current:1,
                addPartyAm:false,
                query:{
                    title:'',
                    xtype:-1
                },
                partyAmCloumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '所属组织',
                        key: 'deptName'
                    },
                    {
                        title: '考核责任项',
                        key: 'amTitle'
                    },
                    {
                        title: '考核清单',
                        key: 'topicTitle'
                    },
                    {
                        title: '填报标题',
                        key: 'reportTitle'
                    },
                    {
                        title: '考核得分',
                        key: 'score'
                    },
                    {
                        title: '上报时间',
                        key: 'reportTime'
                    },{
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                partyAmDatas: [],
                isUpdate:false,
            }
        },
        methods: {
            onSeach:function(){
                this.current = 1;
                this.loadPartyAmDatas();
            },
            changepage:function(value){
                this.current = value;
                this.loadPartyAmDatas();
            },
            onChangePageSize:function(value){
                this.pageSize = value;
                this.loadPartyAmDatas();
            },
            showDetail:function(index){
                //this.
                console.log(index);
                var data = this.partyAmDatas[index];
                console.log(data);
                this.$router.push({'name':'partySpecialResultDetail','path':'/partyAm/partySpecialResultDetail',query:{'id':data.id}});
            },
            remove:function(index){
                var self = this;
                const data = this.partyAmDatas[index];

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
                    url:self.$constants.BIURL+'/partyAm/deleteRm',
                    method:'post',
                    data:self.$qs.stringify({id:data.id})
                })
                .then(function (response) {
                    if(response.status ==200){
                        self.$Message.success({
                            content: '数据删除成功!',
                            duration: 2
                        });
                        self.loadPartyAmDatas();
                    }
                }) .catch(function (error) {
                     self.$Message.error({
                        content: error.message,
                        duration: 2
                    });
                    console.log(error);
                });
            },
            loadPartyAmDatas:function(){
                var self = this;
                this.$Loading.start();
                self.$http({
                    url:self.$constants.BIURL+'/partySpecialResult/findPartySpecialResultByRole',
                    method:'get',
                    dataType:'json',
                    params:{
                        current:self.current,
                        size:self.pageSize,
                        title:self.query.title,
                        deptCode:self.$constants.userInfo.deptCode
                    }
                })
                .then(function (response) {
                    self.$Loading.finish();
                    if(response.status ==200){
                        var data = response.data.data;
                        self.partyAmDatas = data.records;
                        self.dataCount = data.total;
                    }
                }) .catch(function (error) {
                    self.$Loading.error();
                    console.log(error);
                });
            }
        },
        mounted:function(){
            this.loadPartyAmDatas();
        }
    }
</script>