<template>
    <div class="dictionaries_main">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem to="/system/dictionaries">数据字典</BreadcrumbItem>
        </Breadcrumb>
        <div class="layout">
            <Row :gutter="7">
                <Col span="12">
                <div class="left">
                    <Card>
                        <p slot="title" style="color:rgb(107, 107, 107);">字典分类</p>
                        <div class="left_content" style="display:flex;">
                            <div style="display:flex;width:200px;">
                                <span class="i-icon i-icon-add"></span>
                                <span class="i-icon i-icon-edit"></span>
                                <span class="i-icon i-icon-delete"></span>
                                <span class="i-icon i-icon-refresh"></span>
                            </div>
                            <div class="search" style="position: relative;left: 27%;">
                                <Input v-model="queryStr" search enter-button placeholder="请输入分类名称" />
                            </div>
                        </div>
                        <!-- 表格部分 -->
                        <div id="table">
                            <Table border ref="selection" :columns="partyUserCloumns" :data="partyUserDatas">

                            </Table>
                            <Page :total="dataCount" :page-size="params.size" show-total @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
                        </div>
                    </Card>
                </div>
                </Col>
                <Col span="12">
                <div class="right">col-6</div>
                </Col>

            </Row>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            queryStr: "",
            params: {
                current: 1
            },
            partyUserCloumns: [
                {
                    type: "index",
                    // width: 50,
                    title: "序号",
                    align: "center"
                },
                {
                    title: "分类名称",
                    key: "dictName",
                    // width: "50"
                },
                {
                    title: "分类代码",
                    key: "dictCode",
                    // width: "50"
                },
                {
                    title: "显示类型",
                    key: "showType",
                    //    width: "50"
                },
                {
                    title: "状态",
                    key: "disabled",
                    // width: "50"
                },
                {
                    title: "备注",
                    key: "memo",
                    // width: "50",
                    render: (h, params) => {
                        let value = params.row.sex;
                        switch (value) {
                            case 0:
                                return h("span", "男");
                                break;
                            case 1:
                                return h("span", "女");
                                break;
                        }
                    }
                },
               
            ],
            partyUserDatas:[]

        };
    },
    methods:{
         load_list:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/biDictType/list',
                method:'GET',
                dataType:'json',
                params:self.params
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data)
                    self.partyUserDatas = data.data.records;
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
    },
     mounted:function(){
        this.load_list()
    }
};
</script>
<style>
/* .ivu-card-body {
    display: flex!important;
} */
</style>

<style scoped>
.dictionaries_main .layout {
    padding: 20px;
    margin-top: 20px;
}
.dictionaries_main .layout .left {
    width: 100%;
    height: 100%;
    background-color: red;
}
.dictionaries_main .layout .right {
    width: 100%;
    height: 100%;
    background-color: blue;
}
.dictionaries_main #table {
    margin-top:20px;
}
#icon {
    display: flex;
}
#icon .i-icon {
}

.pageView {
    text-align: right;
    margin-top:20px;
}
</style>