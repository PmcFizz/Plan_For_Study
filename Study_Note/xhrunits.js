/**
 * xhr 帮助类 
 * Fizz
 */
var xhrunits = (function() {

	//创建xhr
	var createXHR = function() {
		if(typeof XMLHttpRequest != "undefined") {
			createXHR = function() {
				return new XMLHttpRequest();
			}
		} else if(typeof ActiveXObject() != "undefined") {
			createXHR = function() {
				if(typeof arguments.callee.activeXString != "string") {
					var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
						i, len;
					for(i = 0, len = versions.length; i < len; i++) {
						try {
							new ActiveXObject(version[i]);
							arguments.callee.activeXString = versions[i];
							break;
						} catch(e) {
							console.log("createXHR ERROR");
						}
					}
				}
				return new ActiveXObject(arguments.callee.activeXString);
			}
		} else {
			createXHR = function() {
				throw new Error("No XHR Object available.");
			}
		}
		return createXHR();
	};
	
	//调起一个接口
	var ajax = function(option) {
		var xhr = createXHR();
		console.log(option);
		
		if(option.url) {
			xhr.open("POST", option.url, true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			var sendstr = handData(option.data);
			console.log(sendstr);
			xhr.send(sendstr);
			xhr.onreadystatechange = function() {
				if(this.readyState == 4) {
					var resJson = JSON.parse(this.responseText);
					if(this.status == 200) {
						option.successcb(resJson);
					} else {
						option.errorcb(resJson);
					}
				} else {

				}
			};
		} else {
			throw new Error("No url");
		}
	};

	//json -> string
	function handData(obj) {
		var restr = "";
		if(obj || obj.length > 0) {
			for(var k in obj) {
				restr = restr + "" + k + "=" + obj[k] + "&"
			}
			restr = restr.substr(0, restr.length - 1);
		}
		return restr
	};

	return {
		createXHR: createXHR,
		ajax: ajax
	}
})();