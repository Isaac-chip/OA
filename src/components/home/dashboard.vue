<template>
    <div class="dashboardView">
        <Row :gutter="16" class="firstRowView">
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">机关事业单位</div>
                    <div class="content">8846</div>
                </Card>
            </Col>
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">村社区</div>
                    <div class="content">21960</div>
                </Card>
            </Col>
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">国企</div>
                    <div class="content">760</div>
                </Card>
            </Col>
            <Col span="6">
                <Card dis-hover class="headerView">
                    <div class="title">非公有制经济和社会组织</div>
                    <div class="content">6560</div>
                </Card>
            </Col>
        </Row>
        <Card dis-hover class="middleView">
            <div >
                <Row class="headerView">
                    <Col span="8">fdsfdsfsdfds</Col>
                    <Col span="8" class="headerView-item date-range">
                        <a class="active" href="#">今日</a>
                        <a href="#">本周</a>
                        <a href="#">本月</a>
                        <a href="#">全年</a>
                    </Col>
                    <Col span="8">
                        <DatePicker type="daterange" show-week-numbers placement="bottom-end" placeholder="输入日期查询" style="width:100%" ></DatePicker>
                    </Col>
                </Row>
            </div>
        </Card>
    </div>
</template>

<style>
.dashboardView{
    width: 100%;
    height: 100%;
    background: #f0f2f5;
    box-sizing: border-box;
    position: relative;
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

.middleView{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: auto;
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
</style>

<script>
export default {
    name:'dash_borad',
    data(){
        return {

        }
    }
}
</script>
