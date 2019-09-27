<template>
    <div class="selectUser">
        <Row class="searchview">
             <Input prefix="ios-search" search  @on-search="onSearchDeptByName" placeholder="搜索部门名称" style="width: 100%" />
        </Row>
        <Row class="selectHeader" :gutter="16">
            <Col span="12">
                <div class="orgview_org">
                    <Scroll class="scrollView" :on-reach-bottom="handleDeptBottom">
                        <div v-for="(item, index) in deptResults" :key="index" class="userItem" @click="deptItemClick(item)">
                            <Checkbox :true-value ="true" :value="item.disabled"></Checkbox>
                            <span>{{item.deptName}}</span> 
                        </div>
                    </Scroll>
                </div>
            </Col>
            <Col span="12" class="userview" >
                <Scroll class="scrollView">
                    <div v-for="(item, index) in resultDatas" :key="index" class="userItem" @click="deleteResultDatas(item)">
                        <Checkbox :true-value ="true" :value="item.disabled"></Checkbox>
                        <span>{{item.deptName}}</span> 
                    </div>
                </Scroll>
            </Col>
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

.orgview_org{
    position: relative;
    height: 200px;
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
export default {
    name:'selectDept',
    props:{
        resultSelectDatas:{
            type: Function,
            default: function prevToThree() {
          
            }
        },
        defaultDatas:{
            type:[Object,Array],
            default:() =>{}
        },
        deptType:{
            type:Number,
            default : 1
        },
        partyType:{
            type:[Object,Array],
            default:() =>{}
        }
    },
    data(){
        return {
            current:1,
            size:15,
            currentPage:1,
            deptQuery:'',
            dataCount:'',
            deptResults:[],
            resultDatas:[]
        }
    },
    watch:{
        partyType:function(value){
            this.partyType = value;
            this.findDepartment();
        },
        defaultDatas:function(value){
            this.resultDatas = value;
        }
    },
    methods:{
        onSearchDeptByName:function(value){
            this.deptQuery = value;
            this.currentPage = 1;
            this.current = 1;
            this.deptResults = [];
            this.findDepartment();
        },
         /**
       * 查找部门
       * @param type 部门类型
       * @param size 每页显示记录数
       * @param query 关键字
       * @param items 接收的返回对象
       */
      findDepartment: function (resolve) {
            var self = this
            this.$Loading.start()

            var params = {
                current:self.current,
                size:self.size,
                deptType: self.deptType,
                deptName: self.deptQuery
            }
            var url = self.$constants.BIURL + '/political/department/findDepartmentByType';
            if(self.deptType == 1){
                url = self.$constants.BIURL + '/political/department/findDepartmentByTypeAndPartyType';
                if(self.partyType){
                    params.partyType = self.partyType.join(',');
                }
               
            }
            self.$http({
            url: url,
                method: 'get',
                dataType: 'json',
                params: params
            })
            .then(function (response) {
                self.$Loading.finish()
                if (response.status == 200) {
                    var data = response.data.data;
                    if(data.records && data.records.length >0){
                        data.records.forEach(element => {
                            self.deptResults.push(element);
                        });
                    }
                    self.dataCount = data.data.total;
                    self.currentPage = Math.ceil(self.dataCount / self.size);
                    if(resolve){
                        resolve();
                    }
                }
            }).catch(function (error) {
                self.$Loading.error();
            })
        },
        handleDeptBottom:function(){
           var self = this;
           return new Promise(resolve => {
               self.current += 1;
               if(self.currentPage == self.current){
                   return;
               }
               self.findDepartment(resolve);
           });
        },
        deptItemClick:function(item){
            if(item.disabled){
                item.disabled = false;
                let ind = this.resultDatas.findIndex(a=>a.did==item.did);
                this.resultDatas.splice(ind,1);
            }else{
                item.disabled = true;
                this.resultDatas.push(item);
            }
            this.resultSelectDatas(this.resultDatas);
        },
        deleteResultDatas:function(item){
            this.deptItemClick(item);
        }
    },
    mounted:function(){
        this.findDepartment();
    }
}
</script>