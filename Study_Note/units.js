/**
 * 以下代码取自<<JavaScript 高级程序设计>>一书
 */

/**
 * 用于用户代理字符的检测脚本,
 * 包括检测呈现的引擎,平台,Windows操作系统,移动设备
 * 和游戏系统
 */

var client = function() {
	var engine = {
		ie: 0,
		gecko: 0,
		webkit: 0,
		khtml: 0,
		opera: 0,
		//完整的版本号
		ver: null
	};

	//浏览器
	var browser = {
		//主要浏览器
		ie: 0,
		firefox: 0,
		safari: 0,
		konq: 0,
		opera: 0,
		chrome: 0,
		//具体版本号
		ver: null
	};

	var system = {
		win: false,
		mac: false,
		x11: false,

		//移动设备
		iphone: false,
		ipod: false,
		ipad: false,
		ios: false,
		android: false,
		nokiaN: false,
		winMobile: false,
		//游戏系统
		wii: false,
		ps: false
	};

	//检测呈现引擎和浏览器
	var ua = navigator.userAgent;
	if(window.opera) {
		engine.ver = browser.ver = window.opera.version();
	} else if(/AppleWebKit\/(\S+)/.test(ua)) {
		engine.ver = RegExp["$1"];
		engine.webkit = parseFloat(engine.ver);

		//确定是Chorm还是Safari
		if(/Chrome\/(\S+)/.test(ua)) {
			browser.ver = RegExp["$1"];
			browser.chrome = parseFloat(browser.ver);
		} else if(/Version\/(\S+)/.test(ua)) {
			browser.ver = RegExp["$1"];
			browser.safari = parseFloat(browser.ver);
		} else {
			//近似地确定版本号
			var safariVersion = 1;
			if(engine.webkit < 100) {
				safariVersion = 1;
			} else if(engine.webkit < 312) {
				safariVersion = 1.2
			} else if(engine.webkit < 412) {
				safariVersion = 1.3;
			} else {
				safariVersion = 2;
			}
			browser.safari = browser.ver = safariVersion;
		}

	} else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
		engine.ver = browser.ver = RegExp["$1"];
		engine.khtml = browser.konq = parseFloat(engine.ver);
	} else if(/rv:([^\)]+)\Gecko\/\d{8}/.test(ua)) {
		engine.ver = RegExp["$1"];
		engine.gecko = parseFloat(engine.ver);

		//确定是不是Firefox
		if(/Firefox\/(\S+)/.test(ua)) {
			browser.ver = RegExp["$1"];
			browser.firefox = parseFloat(browser.ver);
		}
	} else if(/MSIE([^;]+)/.test(ua)) {
		engine.ver = browser.ver = RegExp["$1"];
		engine.ie = browser.ie = parseFloat(engine.ver);
	}

	//检测浏览器
	browser.ie = engine.ie;
	browser.opera = engine.opera;

	//检测平台
	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

	//检测Windows操作系统
	if(system.win) {
		if(/Win(?:dows) ? ([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
			if(RegExp["$1"] == "NT") {
				switch(RegExp["$2"]) {
					case "5.0":
						system.win = "2000";
						break;
					case "5.1":
						system.win = "XP";
						break;
					case "6.0":
						system.win = "Vista";
						break;
					case "6.1":
						system.win = "7";
						break;
					default:
						system.win = "NT";
						break;
				}
			} else if(RegExp["$1"] == "9x") {
				system.win = "ME";
			} else {
				system.win = RegExp["$1"];
			}
		}
	}

	//移动设备
	system.iphone = ua.indexOf("iPhone") > -1;
	system.ipod = ua.indexOf("iPod") > -1;
	system.ipad = ua.indexOf("iPad") > -1;
	system.nokiaN = ua.indexOf("NokiaN") > -1;

	//windows mobile
	if(system.win == "CE") {
		system.winMobile = system.win;
	} else if(system.win == "Ph") {
		if(/Windows Phone OS (\d+.\d+)/.test(ua)) {
			system.win = "Phone";
			system.winMobile = parseFloat(RegExp["$1"]);
		}
	}

	//检测iOS版本
	if(system.mac && ua.indexOf("Mobile") > -1) {
		if(/CPU(?:iPhone)?OS(\d+_\d+)/.test(ua)) {
			system.ios = parseFloat(RegExp.$1.replace("_", "."));
		} else {
			system.ios = 2; //不能真正检测出来 所以只能猜测
		}
	}

	//检测Android版本
	if(/Android (\d+\.\d+)/.test(ua)) {
		system.android = parseFloat(RegExp.$1);
	}

	//游戏系统
	system.wii = ua.indexOf("Wii") > -1;
	system.ps = /playstation/i.test(ua);

	return {
		engine: engine,
		browser: browser,
		system: system
	}

}();

/**
 * 原生js跨浏览器的事件对象
 */
var EventUtil = {
	//为element添加type事件
	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	//得到事件对象
	getEvent: function(event) {
		return event ? event : window.event
	},
	//得到事件对象作用的元素
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	//执行默认操作
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	//移除element的type事件的监听
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null
		}
	},
	//阻止事件的默认行为
	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};


/**
 * 使用惰性载入设计创建XHR函数
 * 
 */
function createXHR(){
	if(typeof XMLHttpRequest !="undefined"){
		createXHR=function(){
			return new XMLHttpRequest();
		}
	}else if(typeof ActiveXObject !="undefined"){
		createXHR=function(){
			var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0",
			"MSXML2.XMLHttp"],i,len;
			for(i=0,len=versions.length;i<len;i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXSting=versions[i];
					break;
				}catch(ex){
					//SKIP
				}
			}
			return new ActiveXObject(arguments.callee.activeXSting);
		};
	}else{
		createXHR=function(){
			throw new Error("No XHR objcet available.");	
		};
	}
	return createXHR();
}
