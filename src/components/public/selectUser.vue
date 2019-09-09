<template>
    <div class="selectUser">
        <Row class="searchview">
             <AutoComplete
                :data="userResults"
                placeholder="搜索人员">
            </AutoComplete>
        </Row>
        <Row class="selectHeader" :gutter="16">
            <Col span="12">
                <div class="orgview">
                    <Tree show-checkbox @on-check-change="treeCheckClick" class="dept_tree" :data="departmentDatas"></Tree>
                </div>
            </Col>
            <Col span="12">
                <Scroll class="userview" :on-reach-bottom="handleReachBottom">
                    <div class="userItem" @on-change="userSelect" @click="userItemClick">
                        <Checkbox></Checkbox>
                        <img :src="userIcon"/>
                        <span>张三</span>
                    </div>
                    <Checkbox class="userItem">
                        <img :src="userIcon"/>
                        <span>张三</span>
                    </Checkbox>
                    <Checkbox class="userItem">
                        <img :src="userIcon"/>
                        <span>张三</span>
                    </Checkbox>
                    <Checkbox class="userItem">
                        <img :src="userIcon"/>
                        <span>张三</span>
                    </Checkbox>
                    <Checkbox class="userItem">
                        <img :src="userIcon"/>
                        <span>张三</span>
                    </Checkbox>
                    <Checkbox class="userItem">
                        <img :src="userIcon"/>
                        <span>张三</span>
                    </Checkbox>
                </Scroll>
            </Col>
        </Row>
        <Row>已选择（{{resultDatas.length}}）</Row>
        <Row class="resultview">
            <Tag v-for="item in resultDatas" :key="item.userId" type="dot" closable
                    @on-close="deleteResultDatas(item)">{{item.name}}
            </Tag>
        </Row>
    </div>
</template>
<style>
.selectUser{
    position: relative;
    width: 100%;
    height: auto;
}

.selectHeader{
    margin-top: 10px;
    height: 200px;
}

.orgview{
    position: relative;
    height: 200px;
    overflow: scroll;
    border: 1px solid #dcdee2;
}

.userview{
    position: relative;
    height: 200px;
    overflow: scroll;
    border: 1px solid #dcdee2;
}

.resultview{
    margin-top: 5px;
    border: 1px solid #dcdee2;
    min-height: 44px;
    margin-bottom: 10px;
}
.userItem{
    display: flex;
    height: 38px;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items:center;
    padding:0 5px;
}

.userItem:hover{
    background: #f2f2f2;
    cursor: pointer;
}

.userItem img{
    width: 28px;
    height: 28px;
    margin: 0px 6px;
    border-radius: 50%;
}
</style>
<script>
import User from '@/assets/icons/user.png'
export default {
    name:'selectUser',
    data(){
        return {
            current:1,
            userIcon:User,
            userResults:[],
            departmentDatas:[],
            resultDatas:[]
        }
    },
    methods:{
        treeCheckClick:function(obj,item){
           this.loadUserByDept(item.deptCode);
        },
        loadDepartment:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/education/exam/student/department/list',
                method:'GET',
                params:{
                    objId:self.examSubjectId,
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
                self.departmentDatas = data;
                }
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        loadUserByDept:function(deptCode){
            var self = this;
            var tenantId = this.$constants.userInfo.tenantId;
            self.$http({
                url:self.$constants.BIURL+'/user/list',
                method:'GET',
                params:{
                    current:self.current,
                    size:15,
                    tenantId:tenantId,
                    querys:'',
                    deptCode:deptCode
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.resultDatas = data.data.records;
                    console.log(self.resultDatas);
                }
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        deleteResultDatas:function(item){

        },
        handleReachBottom:function(){
            console.log('......scroll');
        },
        userSelect:function(value){
            console.log(value);
        },
        userItemClick:function(){
            console.log('......');
        }
    },
    mounted:function(){
        this.loadDepartment();
    }
}
</script>