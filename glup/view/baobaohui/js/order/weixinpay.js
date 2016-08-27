/**
 *微信支付
 *pmc 
 **/

//"appId":"微信应用ID",
//"package":"prepay_id=微信支付ID",
//"nonceStr":"填充码",
//"timeStamp":"时间戳",
//"paySign":"加密签名"
var basePath=document.querySelector("body").getAttribute("basepath");
function onBridgeReady() {
	 //此处是微信内置对象贮备好
}
if (typeof WeixinJSBridge == "undefined") {
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
} else {
	onBridgeReady();
}
//调用微信支付 弹窗输密码
function statrPay(data ,cb,paycode){
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest', data,
		function(res) {
			if(res.err_msg == "get_brand_wcpay_request:ok"){
				//微信支付成功后主动检查支付数据 并回调
				checkWeixinJsPay(paycode, cb);
			} else if(res.err_msg == "get_brand_wcpay_request:cancel"){
				//alert("用户已取消");
			}else{
				alert("系统繁忙，请稍后再试!");
			}
			//使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回
			//ok，但并不保证它绝对可靠。
		}
	);
}

//显示付款弹窗
function showPayDialog(){
	if(document.querySelector("#revicePayAmount")){
		document.querySelector("#revicePayAmount").value="";
	}
	if(document.querySelector("#orderPayAmount")){
		document.querySelector("#orderPayAmount").value="";
	}
	
	document.querySelector("#overlay").setAttribute("class","wri-overlay");
	document.querySelector("#dialog").setAttribute("class","wri-dialog");
}

//隐藏付款弹窗
function hidePayDialog(){
	document.querySelector("#overlay").setAttribute("class","hide");
	document.querySelector("#dialog").setAttribute("class","hide");
}

//检查微信支付
function checkWeixinJsPay(payCode,cb){
	$.ajax({
		type:"post",
		url:basePath+"pay/checkWeixinJsPay.do",
		data:{
			payCode:payCode
		},
		dataType:"json",
		success:function(obj){
			cb();
		}
	})
}
 
