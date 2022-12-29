if ($) {
    /**
     * @date 2021.11.10
     * @function browser
     * @return  IE | IE11 | Firefox | Chrome | Safari | Opera
     */
    $.browser = function(){
        //取得浏览器的userAgent字符串  
        var userAgent = window.navigator.userAgent;  
        //判断是否IE<11浏览器
        var isIE_11 = window.ActiveXObject != undefined && userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;  
        //判断是否IE11浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;

        var isIE = isIE_11 || isIE11;
        //判断是否IE11浏览器
        if(isIE11){
            return 'IE11'
        };
        //判断是否IE浏览器
        if(isIE){
            return 'IE'
        };
        //判断是否Firefox浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "Firefox";
        };
        //判断是否Chrome浏览器
        if (userAgent.indexOf("Chrome") > -1){
            return "Chrome";
        };
        //判断是否Safari浏览器
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        };  
        //判断是否Opera浏览器
        if(userAgent.indexOf("Opera") > -1){
            return "Opera";
        };
    };

} else {
    throw new Error("jQuery is not exist, so $.browser can'b installed.");
};