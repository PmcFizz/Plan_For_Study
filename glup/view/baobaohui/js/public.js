document.addEventListener('touchstart',function(){
    return false;
},true);

$(".sui-select").on("change", function() {
	var o;
	var opt = $(this).find('option');
	opt.each(function(i) {
		if (opt[i].selected == true) {
			o = opt[i].innerHTML;
		}
	})
	$(this).find('label').html(o);
}).trigger('change');


//使用自运行模式 返回内部常量或函数,外部不可修改
var mobilecommon = (function() {
	var getRootPath = function() {
		var basePath = $("body").attr("basepath");
		return basePath;
	};

	var getShennongUrl = function() {
		//为防止配置文件最后缺少/ 需加"/"
		var shennongurl = $("body").attr("shennongurl");
		shennongurl = shennongurl + "/"
		return shennongurl
	};
	var isEmpty = function(obj) {
		return (obj == null || typeof obj == "undefined" || obj.length == 0);
	};
	//得到cookie的数据返回json数据
	var getCookieObj = function() {
		var cookiePar = {};
		if (document.cookie) {
			var cookie = document.cookie.split(";");
			if (cookie) {
				$.each(cookie, function(i, doc) {
					var par = doc.split("=");
					var one = $.trim(par[0]);
					var two = $.trim(par[1]);
					cookiePar[one] = two;
				});
				return cookiePar;
			} else {
				return cookiePar;
			}
		} else {
			return cookiePar
		}
	};
	//得到url中的参数  返回json数据
	var getUrlParams = function() {
		var search = location.search
		var returnJson = {};
		if (search.indexOf("?") == 0 && search.indexOf("=") > -1) {
			search = search.substring(1);
			var strs = search.split("&");
			for (var i = 0; i < strs.length; i++) {
				var tempArr = strs[i].split("=");
				if (tempArr[1].indexOf("#") > -1) {
					tempArr[1] = tempArr[1].replace("#", "");
				}
				returnJson[tempArr[0]] = tempArr[1];
			}
			return returnJson;
		} else {
			return returnJson
		}
	};
	return {
		//函数 返回主机名和当前 URL的端口号 +项目名+"/"
		getRootPath: getRootPath,
		//获取com.cqgk.shennong 配置路径 在conf配置文件中
		getShennongUrl: getShennongUrl,
		//获取cookie 中的数据 返回json数据
		getCookieObj: getCookieObj,
		//判断是否为空
		isEmpty: isEmpty,
		//得到url中的参数  返回json数据
		getUrlParams: getUrlParams
	}
})();

