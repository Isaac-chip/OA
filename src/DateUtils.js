//获取指定日期所在周周一
function GetMondayAndSunday(dd) {
    var week = dd.getDay(); //获取时间的星期数
    var minus = week ? week - 1 : 6;
    dd.setDate(dd.getDate() - minus); //获取minus天前的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取月份
    var d = dd.getDate();
    return y + "-" + formatDate(m) + "-" + formatDate(d);
}
 
//格式化月和日为MM、dd
function formatDate(value){
    if(value < 10){
        value = "0" + value;
    }
    return value;
}
 
//获取当前月所在季度的开始月
function getQuarterStartMonth(month){
    var quarterStartMonth = 0;
    if(month<4){
        quarterStartMonth = 1;
    }
    if(3<month && month<7){
        quarterStartMonth = 4;
    }
    if(6<month && month<10){
        quarterStartMonth = 7;
    }
    if(month>9){
        quarterStartMonth = 10;
    }
    return quarterStartMonth;
}

export default{
    computTimeHorizon :function(whereTheTime,type){
        var d = new Date(whereTheTime);
        var year = d.getFullYear();
        var month = parseInt(d.getMonth())+1;
        var beginWhereTheTime,endWhereTheTime;
        switch (type){
            case 1://周
                //获取周一
                beginWhereTheTime = GetMondayAndSunday(d);
                var dd = new Date(beginWhereTheTime);
                //获取周天
                dd.setDate(dd.getDate()+6);
                var monthSunday = parseInt(dd.getMonth())+1;
                endWhereTheTime = dd.getFullYear() + "-" + formatDate(monthSunday) + "-" + formatDate(dd.getDate());
                break;
            case 2://月
                //获取月第一天
                var fristDay= new Date(year,month,1);
                beginWhereTheTime = year + "-" + formatDate(month) + "-" + formatDate(fristDay.getDate());
                //获取月最后一天
                var lastDay= new Date(year,month,0);
                endWhereTheTime = year + "-" + formatDate(month) + "-" + formatDate(lastDay.getDate());
                break;
            case 3://季度
                //获取当前月所在季度
                var quarter = getQuarterStartMonth(month);
                if(quarter != 0){
                    //获取季度第一天
                    var fristDay = new Date(year,quarter,1);
                    //获取季度最后一天
                    var lastDay = new Date(year,quarter+2,0);
                    beginWhereTheTime = year + "-" + formatDate(quarter) + "-" + formatDate(fristDay.getDate());
                    endWhereTheTime = year + "-" + formatDate(quarter+2) + "-" + formatDate(lastDay.getDate());
                }
                break;
            case 4://半年
                var startMonth = 0;
                var endMonth = 0;
                if(month < 7){//上半年
                    startMonth = 1;
                    endMonth = 6;
                }else{//下半年
                    startMonth = 7;
                    endMonth = 12;
                }
                //获取第一天
                var fristDay = new Date(year,1,1);
                //获取最后一天
                var lastDay = new Date(year,6,0);
                beginWhereTheTime = year + "-" + formatDate(startMonth) + "-" + formatDate(fristDay.getDate());
                endWhereTheTime = year + "-" + formatDate(endMonth) + "-" + formatDate(lastDay.getDate());
                break;
            case 5://全年
                beginWhereTheTime = year + "-01-01";
                endWhereTheTime = year + "-12-31";
                break;
        }

        return [beginWhereTheTime,endWhereTheTime];
    }
}