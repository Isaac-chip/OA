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
                                <template slot-scope="{ row, index }" slot="disabled">
                                   {{ row.disabled | status }}
                                </template>
                            </Table>
                            <Page :page-size="params.size" show-total class="pageView"></Page>
                        </div>
                    </Card>
                </div>
                </Col>
                <Col span="12">
                <div class="right">
                    <Table border :columns="columns6" :data="data5"></Table>
                </div>
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
                    key: "dictName"
                    // width: "50"
                },
                {
                    title: "分类代码",
                    key: "dictCode"
                    // width: "50"
                },
                {
                    title: "显示类型",
                    key: "showType"
                    //    width: "50"
                },
                {
                    title: "状态",
                    key: "disabled",
                    slot:"disabled",
                    // width: "50"
                    filters: [
                        {
                            label: "启用",
                            value: 1
                        },
                        {
                            label: "禁用",
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        if (value === 1) {
                            return row.disabled == false;
                        }
                        if (value === 2) {
                            return row.disabled == true;
                        }
                    }
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
                }
            ],
            partyUserDatas: [],
            columns6: [
                {
                    title: "Date",
                    key: "date"
                },
                {
                    title: "Name",
                    key: "name"
                },
                {
                    title: "Age",
                    key: "age",
                    filters: [
                        {
                            label: "Greater than 25",
                            value: 1
                        },
                        {
                            label: "Less than 25",
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        if (value === 1) {
                            return row.age > 25;
                        } else if (value === 2) {
                            return row.age < 25;
                        }
                    }
                },
                {
                    title: "Address",
                    key: "address",
                    filters: [
                        {
                            label: "New York",
                            value: "New York"
                        },
                        {
                            label: "London",
                            value: "London"
                        },
                        {
                            label: "Sydney",
                            value: "Sydney"
                        }
                    ],
                    filterMethod(value, row) {
                        return row.address.indexOf(value) > -1;
                    }
                }
            ],
            data5: [
                {
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03"
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01"
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                }
            ]
        };
    },
    methods: {
        load_list: function() {
            var self = this;
            self
                .$http({
                    url: self.$constants.BIURL + "/biDictType/list",
                    method: "GET",
                    dataType: "json",
                    params: self.params
                })
                .then(function(response) {
                    if (response.status == 200) {
                        var data = response.data;
                        console.log(data);
                        self.partyUserDatas = data.data.records;
                    }
                })
                .catch(function(error) {
                    self.$Message.error({
                        content: error.message,
                        duration: 2
                    });
                    console.log(error);
                });
        }
    },
    mounted: function() {
        this.load_list();
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
    margin-top: 20px;
}
#icon {
    display: flex;
}
#icon .i-icon {
}

.pageView {
    text-align: right;
    margin-top: 20px;
}
</style>