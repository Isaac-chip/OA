<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>系统日志</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
             <Row class="header">
               <Form :label-width="90">
                   <Row>
                    <Col span="8">
                            <FormItem label="用户名:">
                            <Input v-model="params.username"  @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                            <FormItem label="创建时间:">
                                <DatePicker type="daterange" @on-clear="dateClearSearch" @on-change="onDateSearch" split-panels placeholder="选择查询的时间区间" ></DatePicker>
                            </FormItem>
                    </Col>

                    <Col span="8"> 
                            <Button @click="searchByQuery"  icon="ios-search">搜索</Button>
                    </Col>
                   </Row>
               </Form>
            </Row>
            <Table border ref="selection" :columns="sysLogCloumns" :data="sysLogDatas" :min-height="200">
            </Table>
            <Page :total="dataCount" :page-size="params.size" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
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

export default {
    data() {
        return {
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            current:1,
            size:15,
            queryStr:'',
            sysLogCloumns:[{
                type: 'index',
                width: 70,
                title:'序号',
                align: 'center'
            },{
                title: '日志标题',
                key: 'title',
                width: 200,
            },{
                title: '操作人',
                key: 'createBy'
            },{
                title: '创建时间',
                key: 'createTime'
            },{
                 title: '远程访问地址',
                key: 'remoteAddr'
            },{
                 title: '请求URI',
                key: 'requestUri'
            },{
                 title: '执行时间',
                key: 'time'
            }],
            sysLogDatas:[],
            params:{
                current:1,
                size:15,
                username:'',
                startTime:'',
                endTime:''
            }
        }
    },
    methods:{
        onSeach:function(){
            this.params.current = 1;
            this.loadSysLogByQuery();
        },
        changepage:function(value){
            this.params.current = value;
            this.loadSysLogByQuery();
        },
        onChangePageSize:function(value){
            this.params.size = value;
            this.loadSysLogByQuery();
        },
        searchByQuery:function(){
            this.loadSysLogByQuery();
        },
        onDateSearch:function(value){
            this.params.startTime = value[0];
            this.params.endTime = value[1];
            this.loadSysLogByQuery();
        },
        loadSysLogByQuery:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/log/list',
                method:'get',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.sysLogDatas = data.data.records;
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
        this.loadSysLogByQuery();
    }
}
</script>
