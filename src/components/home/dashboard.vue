<template>
    <div class="dashboardView">
        <Row :gutter="16" class="firstRowView">
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">机关事业单位</div>
                    <div class="content"><countTo :startVal='0' :endVal='partyUserNumber.organsAndInstitutions' :duration='2000'></countTo></div>
                </Card>
            </Col>
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">村社区</div>
                    <div class="content"><countTo :startVal='0' :endVal='partyUserNumber.villageAndCommunity' :duration='2000'></countTo></div>
                </Card>
            </Col>
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">国企</div>
                    <div class="content"><countTo :startVal='0' :endVal='partyUserNumber.ownedAndEnterprise' :duration='2000'></countTo></div>
                </Card>
            </Col>
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">非公有制经济和社会组织</div>
                    <div class="content"><countTo :startVal='0' :endVal='partyUserNumber.privateAndSocial' :duration='2000'></countTo></div>
                </Card>
            </Col>
        </Row>
        <Card dis-hover class="middleView">
            <Spin size="large" fix v-if="middleSpinShow"></Spin>
            <Row class="headerView">
                <Col span="8" class="tabsView">
                    <div class="tabItem active" data-value="0">专项考核</div>
                    <div class="tabItem" data-value="1">三会一课考核</div>
                    <div class="tabItem" data-value="2">一把手考核</div>
                </Col>
                <Col span="8" class="headerView-item date-range">
                    <a class="active" href="#" data-value="2">本月</a>
                    <a  href="#" data-value="3">季度</a>
                    <a href="#" data-value="5">全年</a>
                </Col>
                <Col span="8">
                    <DatePicker :value="rangeData" type="daterange" @on-change="partyDateChange" show-week-numbers placement="bottom-end" placeholder="输入日期查询" style="width:100%" ></DatePicker>
                </Col>
            </Row>
            <Row class="charView">
                <div class="leftchart" id="myChart"></div>
                <div class="bs-table">
                    <div class="bs-table-header">
                        <div class="col-1">排名</div>
                        <div class="col-2">名称</div>
                        <div class="col-3">分数</div>
                    </div>
                    <div class="bs-table-content" v-show="type == 0" v-for="(item,index) in partyAmDatas" >
                        <div class="col-1">
                            <Badge v-if="index <= 2" :count="(index+1)" type="warning"></Badge>
                            <span v-if="index>2">{{index+1}}</span>
                        </div>
                        <div class="col-2">{{item.deptName}}</div>
                        <div class="col-3">{{item.specialScore}}</div>
                    </div>

                    <div class="bs-table-content" v-show="type == 1" v-for="(item,index) in threeOneUnitDatas" >
                        <div class="col-1">
                            <Badge v-if="index <= 2" :count="(index+1)" type="warning"></Badge>
                            <span v-if="index>2">{{index+1}}</span>
                        </div>
                        <div class="col-2">{{item.deptName}}</div>
                        <div class="col-3">{{item.threeSessionsScore}}</div>
                    </div>

                    <div class="bs-table-content" v-show="type == 2" v-for="(item,index) in firstPeopleDatas">
                        <div class="col-1">
                            <Badge v-if="index <= 2" :count="(index+1)" type="warning"></Badge>
                            <span v-if="index>2">{{index+1}}</span>
                        </div>
                        <div class="col-2">{{item.name}}</div>
                        <div class="col-3">{{item.totalScore}}</div>
                    </div>
                </div>
            </Row>
        </Card>

        <Row :gutter="16">
            <Col span="12">
                <Card dis-hover>
                    <div slot="title">党员积分排名</div>
                    <a href="#/score/board" slot="extra">
                        详细排名
                    </a>
                    <div class="partyScore">
                        <Table size="small" :loading="ruleLoading" :columns="partyColumn" :data="partyScoreDatas"></Table>
                        <Page size="small" :total="pages.total"  @on-change="pageChange" class="pageView"></Page>
                    </div>
                </Card>
            </Col>
            <Col span="12">
                <Card dis-hover>
                    <div slot="title">营商环境服务评价</div>
                    <a href="#/business/operatingScore" slot="extra">
                        详情
                    </a>
                    <div class="preChart" id="preChart"></div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<style>
.pageView{
    text-align: right;
    margin: 5px;
}
.dashboardView{
    width: 100%;
    height: auto;
    background: #f0f2f5;
    box-sizing: border-box;
    position: relative;
    padding:10px;
}

.firstRowView{
    margin-bottom: 10px;
}

.headerView{
    position: relative;
}

.headerView .title{
    height: 22px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
}

.headerView .content{
    height: 38px;
    margin-top: 4px;
    margin-bottom: 0;
    overflow: hidden;
    color: rgba(0,0,0,.85);
    font-size: 30px;
    line-height: 38px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
}

.tabsView{
    position: relative !important;
    display: flex !important;
    flex-wrap: nowrap !important;
    justify-content: start;
}

.tabsView .tabItem{
    padding: 0 8px;
    margin-right: 10px;
    color: rgba(0,0,0,.65) !important;
}

.tabsView .tabItem:hover{
    cursor: pointer;
}
.tabsView .active{
     border-bottom: 1px solid #ff6a00;
}

.middleView{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    margin-bottom: 10px;
}

.middleView .ivu-card-body{
    padding: 0px 16px;
}

.middleView .headerView{
    position: relative;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #e8eaec;
}

.middleView .headerView-item{
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
}

.date-range{
    justify-content:flex-end !important;
    padding-right: 10px;
}

.date-range a{
    margin: 0px 8px;
    color: rgba(0,0,0,.65) !important;
}

.date-range a.active{
    color: #ff6a00 !important;
}

.charView{
    position: relative;
    width: 100%;
    display: flex !important;
    flex-wrap: nowrap !important;
    justify-content: start !important;
    height: 350px !important;
}

.charView .leftchart{
    position: relative;
    width: 70% !important;
    height: 100%;
}

.bs-table{
    position: relative;
    width: 30% !important;
    height: 100%;
    overflow: hidden;
}

.bs-table .bs-table-header{
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    font-size: 13px;
    color: rgba(0,0,0,.85);
}

.bs-table .bs-table-content{
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    font-size: 13px;
}

.bs-table .col-1{
    width:15%;
    text-align: center;
    height: 38px;
    line-height: 38px;
}

.bs-table .col-2{
    width: 70%;
    height: 38px;
    line-height: 38px;
    text-align: left;
    padding-left: 10px;
    height: 38px;
    line-height: 38px;
}

.bs-table .col-3{
    width: 15%;
     height: 38px;
    line-height: 38px;
    text-align: center;
}

.bardg{
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: #FFF;
    border-radius: 50%;
    background: #ff6a00;
}

.preChart{
    width: 100%;
    height: 300px;
}

.partyScore{
    width: 100%;
    height: 300px;
}

</style>

<script>
import echarts from 'echarts'
import countTo from 'vue-count-to';
import DateUtils from '../../DateUtils.js'
export default {
    name:'dash_borad',
    components:{countTo},
    data(){
        return {
            firstChart:null,
            rankingChart:null,
            partyScoreDatas:[],
            ruleLoading:false,
            rangeData:[],
            preChart:null,
            middleSpinShow:false,
            type:0,
            partyAmDatas:[],
            threeOneUnitDatas:[],
            firstPeopleDatas:[],
            partyColumn:[{
                type: 'index',
                width: 70,
                title:'序号',
                align: 'center',
                render: (h,params) => {
                    var index = params.index + (this.pages.current-1)*this.pages.size + 1 ;
                    return h('span',index)
                }
            },{
                title: "用户名称",
                key: "userName",
                width:100
            },{
                 title: '所属部门',
                key: 'deptName',
                width:200
            },{
                title: "总评分",
                key: "totalScore",
            }],
            pages: {
                current: 1,
                pages: 1,
                total: 0,
                size: 6
            },
            partyUserNumber:{
                organsAndInstitutions:0,
                villageAndCommunity:0,
                ownedAndEnterprise:0,
                privateAndSocial:0
            }
        }
    },
    updated:function(){
        if(this.firstChart != null){
            this.firstChart.resize();
        }

        if(this.rankingChart != null){
            this.rankingChart.resize();
        }

        if(this.preChart != null){
            this.preChart.resize();
        }
    },
    methods:{
        pageChange :function(current) {
            this.pages.current = current;
            this.fetchRuleList();
        },
        partyDateChange:function(value){
            this.rangeData = value;
            this.switchType();
        },
        initChatView : function(data){
            if(data == null){
                return;
            }
            let axisDatas = [];
            let seriesDatas = [];
            let title = '';
            switch(this.type){
                case 0:
                    title = '专项考核排名';
                    data.forEach(element => {
                        axisDatas.push(element.deptName);
                        seriesDatas.push(element.specialScore);
                    });
                    break;
                case 1:
                    title = '三会一课考核排名';
                    data.forEach(element => {
                        axisDatas.push(element.deptName);
                        seriesDatas.push(element.threeSessionsScore);
                    });
                    break;
                case 2:
                     data.forEach(element => {
                        axisDatas.push(element.name);
                        seriesDatas.push(element.totalScore);
                    });
                    title = '一把手考核排名';
                    break;
            }

            // 基于准备好的dom，初始化echarts实例
            this.rankingChart = echarts.init(document.getElementById('myChart'))
            // 绘制图表
            this.rankingChart.setOption({
                title:{
                    textVerticalAlign:'top',
                    textAlign :'left',
                    text:title,
                    textStyle : {
                        fontSize:13,
                        color:'rgba(0, 0, 0, 0.85)'
                    },
                    padding:[20,0,0,20]
                },
                tooltip: {},
                grid:{//直角坐标系内绘图网格
                    show:false,//是否显示直角坐标系网格。[ default: false ]
                    left:"4%",//grid 组件离容器左侧的距离。
                    right:"30px",
                    borderColor:"#c45455",//网格的边框颜色
                    bottom:"20%" //
                },
                xAxis: {
                    data: axisDatas,
                    axisLabel : {//坐标轴刻度标签的相关设置。
                        interval:0,
                        rotate:"50",
                        formatter : function(params){
                            var newParamsName = "";// 最终拼接成的字符串
                            var paramsNameNumber = params.length;// 实际标签的个数
                            var provideNumber = 5;// 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                            /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = "";// 表示每一次截取的字符串
                                    var start = p * provideNumber;// 开始截取的位置
                                    var end = start + provideNumber;// 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr;// 最终拼成的字符串
                                }

                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        show: true,
                        lineStyle:{
                            type:'dashed'
                        }
                    }
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    barWidth: '20%',
                    color:'#ff6a00',
                    data: seriesDatas
                }]
            });
            this.rankingChart.resize();
            
        },
        initPartyUsers:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/political/user/getCountByPartyType',
                method:'GET'
            })
            .then(function (response) {
                var data = response.data;
                if(data.code == 0){
                    self.partyUserNumber = data.data;
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        initBusinessPre:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/operating/score/statistic/',
                method:'GET'
            })
            .then(function (response) {
                var data = response.data;
                if(data.code == 0){
                    self.preChart = echarts.init(document.getElementById('preChart'));
                    var legendData = [];
                    var seriesData = [];
                    var selected = {};
                    data.data.forEach(element => {
                        legendData.push(element.name);
                        seriesData.push({
                            name:element.name,
                            value:element.count
                        });
                    });
                    const preData = {
                        legendData:legendData,
                        seriesData:seriesData
                    }
                    self.initPreOption(self.preChart,preData);
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        initPreOption:function(pre,data){
            const option = {
                title : {
                    text: '营商环境服务评分统计',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    left: 'center',
                    bottom: 20,
                    data: data.legendData
                },
                series : [
                    {
                        name: '数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: data.seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            pre.setOption(option);
            pre.resize();
        },
        fetchRuleList:function() {
            this.ruleLoading = true;
            this.$http({
                url: this.$constants.BIURL + "/political/score/board/list",
                method: "GET",
                dataType: "json",
                params: {
                current: this.pages.current,
                size: this.pages.size
                }
            })
            .then(res => {
                this.ruleLoading = false;
                if (res.data.code == 0) {
                    const { records, current, pages, total, size } = res.data.data;
                   
                    this.partyScoreDatas = records;
                    this.pages = {
                    current,
                    pages,
                    total,
                    size
                    };
                }
            })
            .catch(err => {
            });
        },
        changeData:function(type){
            var self =this;
            self.rangeData = [];
            switch(type){
                case 0:
                    self.rangeData = [new Date(),new Date()];
                    break;
                case 1:
                    var datas = DateUtils.computTimeHorizon(new Date().getTime(),1);
                    self.rangeData = datas;
                    break;
                case 2:
                    var datas = DateUtils.computTimeHorizon(new Date().getTime(),2);
                    self.rangeData = datas;
                    break;
                case 3:
                    var datas = DateUtils.computTimeHorizon(new Date().getTime(),3);
                    self.rangeData = datas;
                    break;
                case 4:
                    var datas = DateUtils.computTimeHorizon(new Date().getTime(),4);
                    self.rangeData = datas;
                    break;
                case 5:
                    var datas = DateUtils.computTimeHorizon(new Date().getTime(),5);
                    self.rangeData = datas;
                    break;
            }
            this.switchType();
        },
        initPartyAm:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/partyAm/statistics/special',
                method:'GET',
                params:{
                    current:1,
                    size:8,
                    startDate:self.rangeData[0],
                    endDate:self.rangeData[1]
                }
            })
            .then(function (response) {
                var data = response.data;
                if(data.code == 0){
                    var records = data.data.records;
                    self.partyAmDatas = records;
                    self.initChatView(records);
                    
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        initThreeOneUnit:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/partyAm/statistics/threeSessions/',
                method:'GET',
                params:{
                    current:1,
                    size:8,
                    startDate:self.rangeData[0],
                    endDate:self.rangeData[1]
                }
            })
            .then(function (response) {
                var data = response.data;
                if(data.code ==0){
                    var records = data.data.records;
                    self.threeOneUnitDatas = records;
                    self.initChatView(records);
                    
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        initFirstPeople:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/partyAm/statistics/leader',
                method:'GET',
                params:{
                    current:1,
                    size:8,
                    startDate:self.rangeData[0],
                    endDate:self.rangeData[1]
                }
            })
            .then(function (response) {
                var data = response.data;
                if(data.code ==0){
                    var records = data.data.records;
                    self.firstPeopleDatas = records;
                    self.initChatView(records);
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        },
        switchType:function(){
            switch(this.type){
                case 0:  //专项考核
                    this.initPartyAm();
                    break;
                case 1:  //三会一课
                    this.initThreeOneUnit();
                    break;
                case 2:  //一把手
                    this.initFirstPeople();
                    break;
            }
        }
    },
    mounted:function(){
        var self = this;
        //初始化查询日期  默认查询一个月的数据
        var datas = DateUtils.computTimeHorizon(new Date().getTime(),2);
        self.rangeData = datas;
        this.initPartyUsers();
        this.initBusinessPre();
        this.fetchRuleList();
        
        //默认读取专项考核
        this.initPartyAm();

        $(".tabsView").on('click',function(e){
            $(".tabsView").find(".tabItem").removeClass('active');
            var value = $(e.target).data('value');
            $(e.target).addClass('active');
            self.type = value;
            self.switchType();
        });

        $('.headerView-item').find('a').on('click',function(e){
             $('.headerView-item').find('a').removeClass('active');
             $(e.target).addClass('active');
             var type = $(e.target).data('value');
             self.changeData(type);
        });

        window.addEventListener('resize',function() {
            if(self.rankingChart){
                self.rankingChart.resize();
            }

            if(self.preChart){
                self.preChart.resize();
            }
        });
    }
}
</script>
