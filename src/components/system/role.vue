<template>
    <div>
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>角色管理</BreadcrumbItem>
        </Breadcrumb>

        <div class="bi-container">
            <Row class="split-view">
                <Col span="8" >
                    <div class="split-pane-left">
                        <Button type="primary">新增角色</Button>
                        <Table border ref="selection" :columns="roleCloumns" :data="roleDatas" :min-height="200" style="margin-top:10px;">
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">修改</Button>
                                <Button type="error" size="small" @click="remove(index)">删除</Button>
                            </template>
                        </Table>
                        <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" class="pageView"></Page>
                    </div>
                </Col>
                <Col span="14" class="split-pane-right"> 
                    <Tabs value="name1">
                        <TabPane label="关联用户" icon="ios-people" name="name1">
                            <AutoComplete
                                v-model="value4"
                                icon="ios-search"
                                placeholder="输入用户名称查找"
                                style="width:300px">
                            </AutoComplete>
                             <Button type="primary">添加用户</Button>
                             <Table border ref="selection" :columns="userCloumns" :data="userDatas" :min-height="200" style="margin-top:10px;">
                                <template slot-scope="{ row, index }" slot="action">
                                    <Button type="error" size="small" @click="remove(index)">移除</Button>
                                </template>
                            </Table>
                        </TabPane>
                        <TabPane label="关联资源" icon="ios-menu" name="name2">关联资源</TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>

export default{
    name: 'roleView',
    data (){
        return {
             split: 0.5,
             roleCloumns:[{
                   type: 'index',
                    width: 60,
                    align: 'center'
             },{
                   title: '角色名称',
                    key: 'roleName'
             },{
                title: '操作',
                slot: 'action',
                width: 150,
                align: 'center'
            }],
             roleDatas:[{
                roleName:"系统管理员"
             },{
                roleName:"支部管理员"
             }],
            userCloumns:[{
                title: '用户名称',
                key: 'nickName'
            },{
                title: '所属组织',
                key: 'orgName'
            },{
                title: '操作',
                slot: 'action',
                width: 100,
                align: 'center'
            }],
            userDatas:[{
                nickName:"张三",
                orgName:'xxx/xxx/xxx/xxx'
            }]

        }
    },
    methods:{

    }
}
</script>

<style>

.split-pane-left{
    width: 380px;
    height: 100%;
    margin: 0 auto;
    padding-right: 20px;
    border-right: 1px solid #f2f2f2;
}
.split-pane-right{
    height: 100%;
    padding-left: 40px;
}
.pageView{
    margin-top: 10px;
}
</style>
