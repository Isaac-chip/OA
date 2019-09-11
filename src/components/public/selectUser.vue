<template>
    <div class="selectUser">
        <Row class="searchview">
            
             <AutoComplete
                v-model="userQuery"
                @on-search="findUserByUserName"
                @on-select="userSelectHandle"
                placeholder="搜索人员">
                <Option v-for="(item,index) in userList" :value="item.name" :key="index">{{ item.name }}</Option>
            </AutoComplete>
        </Row>
        <Row class="selectHeader" :gutter="16">
            <Col span="12">
                <div class="orgview">
                    <Tree show-checkbox @on-check-change="treeCheckClick" class="dept_tree" :data="departmentDatas"></Tree>
                </div>
            </Col>
            <Col span="12" class="userview" >
                <Scroll class="scrollView" :on-reach-bottom="handleReachBottom">
                    <div v-for="(item, index) in userResults" :key="index" class="userItem" @click="userItemClick(item)">
                        <Checkbox :true-value ="true" :value="item.disabled"></Checkbox>
                        <img :src="userIcon"/>
                        <span>{{item.name}}</span> 
                    </div>
                </Scroll>
            </Col>
        </Row>
        <Row>已选择（{{resultDatas.length}}）</Row>
        <Row class="resultview">
            <Tag v-for="(item,index) in resultDatas" :key="index" type="dot" closable
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
    overflow: hidden;
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
    margin: 0px 8px;
    border-radius: 50%;
}
.scrollView .ivu-scroll-container{
    height: 200px !important;
}
</style>
<script>
import User from '@/assets/icons/user.png'
export default {
    name:'selectUser',
    props:{
        resultSelectDatas:{
            type: Function,
            default: function prevToThree() {
          
            }
        }
    },
    data(){
        return {
            current:1,
            size:15,
            currentPage:1,
            userIcon:User,
            userQuery:'',
            deptCode:'',
            dataCount:'',
            userList:[],
            userResults:[],
            departmentDatas:[],
            resultDatas:[]
        }
    },
    methods:{
        treeCheckClick:function(obj,item){
            this.current = 1;
            this.deptCode = item.deptCode;
           if(item.checked){
                this.loadUserByDept(item.deptCode);
           }
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
        loadUserByDept:function(deptCode,resolve){
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
                    self.userResults = data.data.records;
                    self.dataCount = data.data.total;
                    self.currentPage = Math.ceil(self.dataCount / self.size);
                    if(resolve){
                        resolve();
                    }
                    console.log(self.userResults);
                }
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        findUserByUserName:function(deptCode,resolve){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/user/findUserByUserName',
                method:'GET',
                params:{
                    current:1,
                    size:15,
                    query:self.userQuery
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.userList = data.data.records;
                }
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        handleReachBottom:function(){
           var self = this;
           return new Promise(resolve => {
               self.current += 1;
               if(self.currentPage = self.current){
                   return;
               }
               self.loadUserByDept(self.deptCode,resolve);
           });
        },
        userSelectHandle:function(value){
            this.userList.forEach(element => {
                if(element.name == value){
                    this.resultDatas.push(element);
                    return;
                }
            });
             
        },
        userItemClick:function(item){
            if(item.disabled){
                item.disabled = false;
                let ind = this.resultDatas.findIndex(a=>a.userId==item.userId);
                this.resultDatas.splice(ind,1);
            }else{
                item.disabled = true;
                this.resultDatas.push(item);
            }
            this.resultSelectDatas(this.resultDatas);
        },
        deleteResultDatas:function(item){
            this.userItemClick(item);
            let ind = this.resultDatas.findIndex(a=>a.userId==item.userId);
            if(ind >= 0){
                this.resultDatas.splice(ind,1);
            }
            
        }
    },
    mounted:function(){
        this.loadDepartment();
    }
}
</script>