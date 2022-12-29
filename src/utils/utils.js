/**
 * 判断IE版本
 * @param {Number} number 版本号
 * @returns 
 */
 function checkIEVersion(number) {
    return navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.userAgent.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < number;
  }