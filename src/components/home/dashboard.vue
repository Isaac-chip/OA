<template>
    <div class="dashboardView">
        <Row :gutter="16" class="firstRowView">
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">机关事业单位</div>
                    <div class="content"><countTo :startVal='5209' :endVal='5678' :duration='2000'></countTo></div>
                </Card>
            </Col>
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">村社区</div>
                    <div class="content"><countTo :startVal='23145' :endVal='24531' :duration='2000'></countTo></div>
                </Card>
            </Col>
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">国企</div>
                    <div class="content"><countTo :startVal='678' :endVal='690' :duration='2000'></countTo></div>
                </Card>
            </Col>
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">非公有制经济和社会组织</div>
                    <div class="content"><countTo :startVal='1100' :endVal='1232' :duration='2000'></countTo></div>
                </Card>
            </Col>
        </Row>
        <Card dis-hover class="middleView">
            <Row class="headerView">
                <Col span="8" class="tabsView">
                    <div class="tabItem active" data-value="0">专项考核</div>
                    <div class="tabItem" data-value="1">三会一课考核</div>
                    <div class="tabItem" data-value="2">一把手考核</div>
                </Col>
                <Col span="8" class="headerView-item date-range">
                    <a class="active" href="#" data-value="0">今日</a>
                    <a href="#" data-value="1">本周</a>
                    <a href="#" data-value="2">本月</a>
                    <a href="#" data-value="3">全年</a>
                </Col>
                <Col span="8">
                    <DatePicker :value="rangeData" type="daterange" show-week-numbers placement="bottom-end" placeholder="输入日期查询" style="width:100%" ></DatePicker>
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
                    <div class="bs-table-content">
                        <div class="col-1"><Badge :count="1" type="warning"></Badge></div>
                        <div class="col-2">直属机关工委</div>
                        <div class="col-3">82</div>
                    </div>
                    <div class="bs-table-content">
                        <div class="col-1"><Badge :count="2" type="warning"></Badge></div>
                        <div class="col-2">直属机关工委</div>
                        <div class="col-3">82</div>
                    </div>
                    <div class="bs-table-content">
                        <div class="col-1"><Badge :count="3" type="warning"></Badge></div>
                        <div class="col-2">直属机关工委</div>
                        <div class="col-3">82</div>
                    </div>
                    <div class="bs-table-content">
                        <div class="col-1">4</div>
                        <div class="col-2">直属机关工委</div>
                        <div class="col-3">82</div>
                    </div>
                    <div class="bs-table-content">
                        <div class="col-1">5</div>
                        <div class="col-2">直属机关工委</div>
                        <div class="col-3">82</div>
                    </div>
                    <div class="bs-table-content">
                        <div class="col-1">6</div>
                        <div class="col-2">直属机关工委</div>
                        <div class="col-3">82</div>
                    </div>
                    <div class="bs-table-content">
                        <div class="col-1">7</div>
                        <div class="col-2">直属机关工委</div>
                        <div class="col-3">82</div>
                    </div>
                    <div class="bs-table-content">
                        <div class="col-1">8</div>
                        <div class="col-2">直属机关工委</div>
                        <div class="col-3">82</div>
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
    position: relative;
    display: flex;
    flex-wrap: nowrap;
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
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    height: 350px;
}

.charView .leftchart{
    position: relative;
    width: 70%;
    height: 100%;
}

.bs-table{
    position: relative;
    width: 30% ;
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
    width:100px;
    text-align: center;
    height: 38px;
    line-height: 38px;
}

.bs-table .col-2{
    width: auto;
    height: 38px;
    line-height: 38px;
    text-align: left;
    padding-left: 10px;
    text-align: center;
    height: 38px;
    line-height: 38px;
}

.bs-table .col-3{
    width: 100px;
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
export default {
    name:'dash_borad',
    components:{countTo},
    data(){
        return {
            firstChart:null,
            partyScoreDatas:[],
            ruleLoading:false,
            rangeData:[],
            partyColumn:[{
                type: 'index',
                width: 70,
                title:'序号',
                align: 'center',
                render: (h,params) => {
                    var index = params.index + (this.pages.current-1)*this.pages.size + 1 ;
                    console.log(index);
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
            }
        }
    },
    updated:function(){
        if(this.firstChart){
            this.firstChart.resize();
        }
    },
    methods:{
        pageChange :function(current) {
            this.pages.current = current;
            this.fetchRuleList();
        },
        initChatView : function(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title:{
                    textVerticalAlign:'top',
                    textAlign :'left',
                    text:'专项考核排名',
                    textStyle : {
                        fontSize:13,
                        color:'rgba(0, 0, 0, 0.85)'
                    },
                    padding:[20,0,0,20]
                },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
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
                    barWidth: '40%',
                    color:'#ff6a00',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
            myChart.resize();
            window.addEventListener('resize',function() {myChart.resize()});
        },
        initBusinessPre:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/operating/score/statistic/',
                method:'GET'
            })
            .then(function (response) {
                var data = response.data;
                if(response.status ==200){
                    console.log(data);
                    let preChart = echarts.init(document.getElementById('preChart'));
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
                    self.initPreOption(preChart,preData);
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
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
                    self.rangeData.push(new Date());
                    self.rangeData.push(new Date());
                    break;
                case 1:
                    self.rangeData[0] ='2019-09-16 00:00:00';
                    self.rangeData[1] ='2019-09-19 00:00:00';
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        }
    },
    mounted:function(){
        this.initChatView();
        this.initBusinessPre();
        this.fetchRuleList();
        var self = this;
        $(".tabsView").on('click',function(e){
            $(".tabsView").find(".tabItem").removeClass('active');
            var value = $(e.target).data('value');
             $(e.target).addClass('active');
            console.log(value);
        });

        $('.headerView-item').find('a').on('click',function(e){
             $('.headerView-item').find('a').removeClass('active');
             $(e.target).addClass('active');
             var type = $(e.target).data('value');
             self.changeData(type);
        });
    }
}
</script>
