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
                                <span class="i-icon i-icon-add" @click="add_diag()"></span>
                                <span class="i-icon i-icon-edit" @click="edit_diag()"></span>
                                <span class="i-icon i-icon-delete" @click="del_diag()"></span>
                                <span class="i-icon i-icon-refresh" @click="refresh()"></span>
                            </div>
                            <div class="search" style="position: relative;left: 27%;">
                                <Input v-model="queryStr" search enter-button @on-search="search" placeholder="请输入分类名称" />
                            </div>
                        </div>
                        <!-- 表格部分 -->
                        <div id="table">
                            <Table highlight-row border ref="selection" :columns="partyUserCloumns" :data="partyUserDatas" @on-current-change="get_line_value">
                                <template slot-scope="{ row, index }" slot="disabled">
                                    {{ row.disabled | status }}
                                </template>
                                <template slot-scope="{row}" slot="action">
                                    <div>

                                        <Button :type="row.disabled?'primary':'error'" @click="is_didabled(row)">{{row.disabled?"启用":"禁用"}}</Button>
                                    </div>
                                </template>
                            </Table>
                            <div class="mt-10 d-flex jc-end">
                                <Page @on-page-size-change="changeSize" @on-change="changePage" show-sizer show-total :total="pages.total" :current="pages.current" :page-size="pages.size" />
                            </div>
                        </div>
                    </Card>
                </div>
                </Col>
                <Col span="12">
                <!-- 分类选项表格部分 -->
                <div class="right">
                    <Card>
                        <p slot="title" style="color:rgb(107, 107, 107);">分类选项</p>
                        <div class="left_content" style="display:flex;">
                            <div style="display:flex;width:200px;">
                                <span class="i-icon i-icon-add" @click="add_diag()"></span>
                                <span class="i-icon i-icon-edit" @click="edit_diag()"></span>
                                <span class="i-icon i-icon-delete" @click="del_diag()"></span>
                                <span class="i-icon i-icon-refresh" @click="refresh()"></span>
                            </div>
                            <div class="search" style="position: relative;left: 27%;">
                                <Input v-model="queryStr" search enter-button @on-search="search" placeholder="请输入分类名称" />
                            </div>
                        </div>
                        <!-- 表格部分 -->
                        <div id="table">
                            <Table highlight-row border ref="selection" :columns="partyUserCloumns" :data="partyUserDatas" @on-current-change="get_line_value">
                                <template slot-scope="{ row, index }" slot="disabled">
                                    {{ row.disabled | status }}
                                </template>
                                <template slot-scope="{row}" slot="action">
                                    <div>

                                        <Button :type="row.disabled?'primary':'error'" @click="is_didabled(row)">{{row.disabled?"启用":"禁用"}}</Button>
                                    </div>
                                </template>
                            </Table>
                            <div class="mt-10 d-flex jc-end">
                                <Page @on-page-size-change="changeSize" @on-change="changePage" show-sizer show-total :total="pages.total" :current="pages.current" :page-size="pages.size" />
                            </div>
                        </div>
                    </Card>
                </div>
                </Col>

            </Row>
        </div>
        <!-- 模态框 -->
        <Modal v-model="deptFormModal" title="新增系统参数" :footer-hide="true" :mask-closable="false" style="width:600px">
            <Form ref="deptForm" :model="deptForm" :rules="deptRuleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                    <FormItem label="分类名称" prop="dictName">
                        <Input v-model="deptForm.dictName" placeholder="请输入分类名称" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="分类编码" prop="dictCode">
                        <Input v-model="deptForm.dictCode" placeholder="请输入分类编码" />
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="显示类型" prop="showType">
                        <Select v-model="deptForm.showType" placeholder="请选择显示类型">
                            <Option value='下拉框'>下拉框</Option>
                            <Option value='单选'>单选</Option>
                            <Option value='多选'>多选</Option>
                            <Option value='其他'>其他</Option>

                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <!-- <FormItem label="状态" prop="partyType">
                        <Select v-model="deptForm.partyType" placeholder="请选择状态">
                            <Option value='0'>启用</Option>
                            <Option value='1'>禁用</Option>
                           
                        </Select>
                    </FormItem> -->
                    <FormItem label="状态" prop="orderNo">
                        <Select v-model="deptForm.orderNo" placeholder="请选择状态">
                            <Option value='0'>禁用</Option>
                            <Option value='1'>启用</Option>

                        </Select>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <FormItem label="备注" prop="memo">
                        <!-- <Input v-model="deptForm.memo" placeholder="输入描述" /> -->
                        <textarea name="" id="" cols="65" rows="5" v-model="deptForm.memo" placeholder=""></textarea>
                    </FormItem>
                </Row>
                <Row>
                    <div style="text-align:center">
                        <Button type="primary" @click="add_commit()">提交</Button>
                        <Button style="margin-left: 8px" @click="deptFormModal=false">关闭</Button>
                    </div>
                </Row>

            </Form>
        </Modal>

        <!-- 编辑模态框 -->
        <Modal v-model="edit_deptFormModal" title="修改系统参数" :footer-hide="true" :mask-closable="false" style="width:600px">
            <Form ref="edit_deptForm" :model="edit_deptForm" :rules="edit_deptRuleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                    <FormItem label="分类名称" prop="dictName">
                        <Input v-model="edit_deptForm.dictName" placeholder="请输入分类名称" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="分类编码" prop="dictCode">
                        <Input v-model="edit_deptForm.dictCode" placeholder="请输入分类编码" />
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="显示类型" prop="showType">
                        <Select v-model="edit_deptForm.showType" placeholder="请选择显示类型">
                            <Option value='下拉框'>下拉框</Option>
                            <Option value='单选'>单选</Option>
                            <Option value='多选'>多选</Option>
                            <Option value='其他'>其他</Option>

                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <!-- <FormItem label="状态" prop="partyType">
                        <Select v-model="deptForm.partyType" placeholder="请选择状态">
                            <Option value='0'>启用</Option>
                            <Option value='1'>禁用</Option>
                           
                        </Select>
                    </FormItem> -->
                    <FormItem label="状态" prop="orderNo">
                        <Select v-model="edit_deptForm.orderNo" placeholder="请选择状态">
                            <Option value='0'>禁用</Option>
                            <Option value='1'>启用</Option>

                        </Select>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <FormItem label="备注" prop="memo">
                        <!-- <Input v-model="deptForm.memo" placeholder="输入描述" /> -->
                        <textarea name="" id="" cols="65" rows="5" v-model="edit_deptForm.memo" placeholder=""></textarea>
                    </FormItem>
                </Row>
                <Row>
                    <div style="text-align:center">
                        <Button type="primary" @click="edit_commit()">提交</Button>
                        <Button style="margin-left: 8px" @click="deptFormModal=false">关闭</Button>
                    </div>
                </Row>

            </Form>
        </Modal>

    </div>
</template>

<script>
import qs from "qs";
export default {
    data() {
        return {
            flag: false,
            // 模态框的
            deptQueryStr: "",
            dictCode: "--",
            deptFormModal: false,
            edit_deptFormModal: false,
            table_line_value: "", //选中表格的单元行数据
            deptForm: {
                dictName: "",
                dictCode: "",
                orderNo: "",
                memo: ""
                // tenantId: ""
            },
            edit_deptForm: {
                dictName: "",
                dictCode: "",
                orderNo: "",
                memo: "",
                showType: ""
            },
            edit_deptRuleValidate: {
                dictName: [
                    {
                        required: true,
                        message: "分类名称不能为空",
                        trigger: "blur"
                    }
                ],
                dictCode: [
                    {
                        required: true,
                        message: "分类编码不能为空",
                        trigger: "blur"
                    }
                ],
                showType: [
                    {
                        required: true,
                        message: "显示不能为空",
                        trigger: "change"
                    }
                ],
                orderNo: [
                    {
                        required: true,
                        // type: "string",
                        message: "状态不能为空",
                        trigger: "change"
                    }
                ]
            },
            deptRuleValidate: {
                dictName: [
                    {
                        required: true,
                        message: "分类名称不能为空",
                        trigger: "blur"
                    }
                ],
                dictCode: [
                    {
                        required: true,
                        message: "分类编码不能为空",
                        trigger: "blur"
                    }
                ],
                showType: [
                    {
                        required: true,
                        message: "显示不能为空",
                        trigger: "change"
                    }
                ],
                orderNo: [
                    {
                        required: true,
                        // type: "string",
                        message: "状态不能为空",
                        trigger: "change"
                    }
                ]
            },

            queryStr: "",
            dataCount: 0,

            // 每页显示多少条
            pageSize: 15,
            deptId: null,
            pages: {
                current: 1,
                pages: 1,
                total: 0,
                size: 10
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
                    slot: "disabled",
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
                    key: "memo"
                    // width: "50",
                },
                {
                    title: "操作",
                    slot: "action",
                    width: 150,
                    align: "center"
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
        is_didabled(row) {
            console.log(row);
            if (!row.disabled) {
                this.$Modal.confirm({
                    title: "系统提示",
                    content: "确定要继续此操作吗?",
                    okText: "确定",
                    cancelText: "取消",
                    onOk: () => {
                        this.$http({
                            url:
                                this.$constants.BIURL +
                                `/biDictType/disabled/${row.id}`,
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                            // data: this.edit_deptForm.id
                        })
                            .then(res => {
                                console.log(res);
                                this.load_list();
                                if (res.data.code == 0) {
                                    this.$Message.success(res.data.msg);
                                } else {
                                    this.$Message.error(
                                        res.data.msg || "请求规则列表错误"
                                    );
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
            } else {
            }
        },
        del_diag() {
            if (!this.flag) {
                this.$Message.error("请点击选择一条记录后操作");
            } else {
                // console.log( this.table_line_value)
                // return
                this.edit_deptForm = this.table_line_value;

                this.$Modal.confirm({
                    title: "系统提示",
                    content: "确定要删除选中的数据吗?",
                    okText: "确定",
                    cancelText: "取消",
                    onOk: () => {
                        console.log(this.edit_deptForm);
                        this.$http({
                            url:
                                this.$constants.BIURL +
                                `/biDictType/${this.edit_deptForm.id}`,
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                            // data: this.edit_deptForm.id
                        })
                            .then(res => {
                                console.log(res);
                                this.load_list();
                                if (res.data.code == 0) {
                                    this.$Message.success(res.data.msg);
                                } else {
                                    this.$Message.error(
                                        res.data.msg || "请求规则列表错误"
                                    );
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
            }
        },
        edit_diag() {
            if (!this.flag) {
                this.$Message.error("请点击选择一条记录后操作");
            } else {
                this.edit_deptFormModal = true;
                console.log(this.table_line_value);
                this.edit_deptForm.dictCode = this.table_line_value.dictCode;
                this.edit_deptForm.dictName = this.table_line_value.dictName;
                this.edit_deptForm.memo = this.table_line_value.memo;
                this.edit_deptForm.orderNo = this.table_line_value.orderNo;
                this.edit_deptForm.dictCode = this.table_line_value.dictCode;
                this.edit_deptForm.showType = this.table_line_value.showType;
                this.edit_deptForm.id = this.table_line_value.id;
            }
        },
        search() {
            this.flag = false;
            var self = this;
            self
                .$http({
                    url: self.$constants.BIURL + "/biDictType/list",
                    method: "GET",
                    dataType: "json",
                    params: {
                        pageNo: self.pages.current,
                        pageSize: self.pages.size,
                        dictName: self.queryStr
                    }
                })
                .then(res => {
                    if (res.data.code == 0) {
                        const {
                            records,
                            current,
                            pages,
                            size,
                            total
                        } = res.data.data;
                        self.partyUserDatas = records;
                        self.pages.current = current;
                        self.pages.pages = pages;
                        self.pages.size = size;
                        self.pages.total = total;
                    } else {
                        this.$Message.error(res.data.msg || "请求列表失败");
                    }
                })
                .catch(function(error) {
                    self.$Message.error({
                        content: error.message,
                        duration: 2
                    });
                    console.log(error);
                });
        },
        refresh() {
            this.load_list();
        },
        edit_commit() {
            this.$http({
                url: this.$constants.BIURL + "/biDictType",
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.edit_deptForm
            })
                .then(res => {
                    this.edit_deptFormModal = false;
                    console.log(res);
                    this.load_list();
                    if (res.data.code == 0) {
                        this.$Message.success(res.data.msg);
                    } else {
                        this.$Message.error(res.data.msg || "请求规则列表错误");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        add_commit() {
            console.log(this.deptForm);
            this.$http({
                url: this.$constants.BIURL + "/biDictType",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.deptForm
            })
                .then(res => {
                    this.deptFormModal = false;
                    console.log(res);
                    this.load_list();
                    if (res.data.code == 0) {
                        this.$Message.success(res.data.msg);
                    } else {
                        this.$Message.error(res.data.msg || "请求规则列表错误");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 添加按钮
        add_diag() {
            this.deptFormModal = true;
        },
        load_list() {
            this.flag = false;
            var self = this;
            self
                .$http({
                    url: self.$constants.BIURL + "/biDictType/list",
                    method: "GET",
                    dataType: "json",
                    params: {
                        pageNo: self.pages.current,
                        pageSize: self.pages.size
                    }
                })
                .then(res => {
                    if (res.data.code == 0) {
                        const {
                            records,
                            current,
                            pages,
                            size,
                            total
                        } = res.data.data;
                        self.partyUserDatas = records;
                        self.pages.current = current;
                        self.pages.pages = pages;
                        self.pages.size = size;
                        self.pages.total = total;
                    } else {
                        this.$Message.error(res.data.msg || "请求列表失败");
                    }
                })
                .catch(function(error) {
                    self.$Message.error({
                        content: error.message,
                        duration: 2
                    });
                    console.log(error);
                });
        },
        changePage(current) {
            this.pages.current = current;
            this.load_list();
        },
        changeSize(size) {
            this.pages.size = size;
            this.load_list();
        },
        get_line_value(value, old_value) {
            this.flag = true;
            console.log(value);
            this.table_line_value = value;
        },
        show(index) {
            this.$Modal.info({
                title: "User Info",
                content: `Name：${this.data6[index].name}<br>Age：${
                    this.data6[index].age
                }<br>Address：${this.data6[index].address}`
            });
        },
        remove(index) {
            this.data6.splice(index, 1);
        }
    },
    created() {
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
    /* background-color: red; */
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