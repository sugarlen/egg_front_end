/**1.时间戳转换为日期格式*/
export function formatToDate(timestamp){
  let timeStamp = timestamp;
  if(timeStamp.length===10){
    timeStamp= parseInt(timeStamp)*1000;
  }
  let date = new Date(timeStamp);
  return dataFormat(date,"yyyy-MM-dd");
}

/**2.时间戳转换为日期时间格式*/

export function formatToDatetime(timestamp){
  let timeStamp = timestamp;
  if(timeStamp.length===10){
    timeStamp= parseInt(timeStamp)*1000;
  }
  let date = new Date(timeStamp);
  return dataFormat(date,"yyyy-MM-dd hh:mm:ss");
}

// 3.将日期类型转换为指定格式
export function dataFormat(date,fmt){
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}