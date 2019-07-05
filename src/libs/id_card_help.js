/*
 * 身份证检测（格式、地区、生日、年龄范围）
 * code:检测字符串 rangeAge：年龄范围[格式为：25-55]
 * 返回值 0：为空 ，不为0则验证不通过
 */
const cityArr = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆" }//, 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
function CheckIdentityCode(code, rangeAge) {
  // code = $.trim(code);
  code = code.trim()
  if (code.length == 0 || code == null || code == undefined) {
    return "0";
  }
  let info = ""
  let reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i;
  if (!reg.test(code)) {
    return "身份证格式不正确！";
  }
  code = code.replace(/x$/i, "a");
  if (cityArr[parseInt(code.substr(0, 2))] == null) {
    // return "包含非法地区！";
    return "身份证格式不正确！";
  }
  let birthDay = code.substr(6, 4) + "-" + Number(code.substr(10, 2)) + "-" + Number(code.substr(12, 2));
  let d = new Date(birthDay.replace(/-/g, "/"));
  if (birthDay != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
    // return "包含非法出生日期！";
    return "身份证格式不正确！";
  }
  return GetAge(birthDay, rangeAge);
  //alert(cityArr[parseInt(code.substr(0, 2))] + "," + birthDay + "," + (code.substr(16, 1) % 2 ? "男" : "女") + " 年龄：" + age);
}
/*
 * 年龄检测是否合法
 * birthDay:出生年月[格式：1999-03-15] rangeAge：年龄范围[格式：25-55]
 * 返回值 为空合法 ，不为空则验证不通过
 */
function GetAge(birthDay, rangeAge) {
  if (rangeAge == null || rangeAge.indexOf("-") == -1)
    return "";
  let msg = "";
  let nowDate = new Date();
  let bir = new Date(birthDay.split('-')[0], birthDay.split('-')[1], birthDay.split('-')[2]); let age = parseInt(Math.abs(nowDate - bir) / 1000 / 60 / 60 / 24 / 365);//年龄：天数/365
  let min = 0;
  let max = 0;
  try {
    min = parseInt(rangeAge.split('-')[0]);
    max = parseInt(rangeAge.split('-')[1]);
  } catch (e) { }
  if ((min != 0 || max != 0) && (age < min || age > max))
    msg = "年龄必须满" + min
  // msg = "年龄必须满" + min + "~" + max + "周岁！";
  return msg;
}
export default CheckIdentityCode
