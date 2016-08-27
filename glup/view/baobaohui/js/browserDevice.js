var browserDevice = {
    versions: function() {
        var	u = navigator.userAgent,
        		ua = navigator.userAgent.toLowerCase(),
        		app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            isweixin:ua.match(/MicroMessenger/i)=="micromessenger",  //是否微信网页
            html5plus:ua.match(/html5plus/)=="html5plus", //app
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
};
/*if (browserDevice.versions.mobile){
	alert("手机移动端");
}else{
	alert("PC端");
}*/
/*if (browserDevice.versions.android) {
	alert("android设备");
}
if (browserDevice.versions.ios || browserDevice.versions.iPhone || browserDevice.versions.iPad) {
	alert("苹果设备");
}
if(browserDevice.versions.isweixin){
	alert("微信");
}
if(browserDevice.versions.html5plus){
	alert("App html5plus");
}
*/

