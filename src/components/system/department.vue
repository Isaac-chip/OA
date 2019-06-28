<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem >党务信息</BreadcrumbItem>
            <BreadcrumbItem to="/system/dept">党组织管理</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
            <Row style="height:100%;">
                <Col span="6" style="height:100%;">
                    <Card dis-hover class="card-view">
                        <div slot="title">
                             <div class="dept_title">
                                <div>党组织管理</div>
                                <div class="dept_icon_header">
                                    <div class="i-icon i-icon-add" />
                                    <div class="i-icon i-icon-edit" />
                                    <div class="i-icon i-icon-delete" />
                                    <div class="i-icon i-icon-refresh" />
                                </div>
                             </div>
                        </div>
                        <div > <Input v-model="deptQueryStr" search @on-search="deptSearch" placeholder="按名称搜索..." /></div>
                        <Tree @on-select-change="treeNodeClick" style="margin-top:10px;" class="dept_tree" :data="departmentDatas"></Tree>
                    </Card>
                </Col>
                <Col span="18" style="height:100%;overflow-y:scroll">
                    <div class="userView">
                         <Row class="header">
                            <Col  span="8">
                                <Input v-model="queryStr" search enter-button @on-search="onSeach" placeholder="输入用户名或者姓名查找" />
                            </Col>
                        </Row>
                        <Table border :columns="usersCloumns" :data="usersDatas" :min-height="200">
                        </Table>
                        <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>

export default{
    name: 'departmentView',
    data (){
        return {
             // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            current:1,
            size:15,
            queryStr:'',
            deptQueryStr:'',
            deptCode:'--',
            departmentDatas:[],
            usersDatas:[],
            usersCloumns:[{
                type: 'index',
                width: 60,
                align: 'center'
            },{
                title: '姓名',
                key: 'userName'
            },{
                title: '所属部门',
                width:300,
                key: 'deptName'
            },{
                 title: '手机号码',
                key: 'mobilePhone'
            },{
                 title: '政治面貌',
                key: 'politics'
            }]
        }
    },
    methods:{
        onSeach:function(){
            this.current = 1;
            this.loadUser();
        },
        changepage:function(value){
            this.current = value;
            this.loadUser();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadUser();
        },
        //部门选择时间
        treeNodeClick:function(obj,item){
            console.log(item);
            this.deptCode = item.deptCode;
            this.loadUser();

        },
        loadUser:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/user/list',
                method:'GET',
                params:{
                    current:self.current,
                    size:self.pageSize,
                    deptCode:self.deptCode,
                    query:self.queryStr
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data);
                    if(data.code == 0){
                        self.usersDatas = data.data.records;
                        self.dataCount = data.data.total;
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
        deptSearch:function(value){
            this.loadDepartment();
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
                    self.departmentDatas = data;
                }
            }).catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        }
    },
    mounted:function(){
       // console.log('...');
        this.loadDepartment();
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
    cursor: hand !important;
}

.userView{
    margin-left: 10px;
}

.pageView{
    margin-top: 10px;
    text-align: right;
}
</style>
