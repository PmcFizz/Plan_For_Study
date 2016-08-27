/**
 * @功能: 验证码
 * @return
 * @作者: 徐思伟
 * @时间: 2016年6月25日14:34:23
 * @备注:
 */

//开通店铺
function register(){
	var phonenumber = $("#phonenumber").val();
	var code = $('#code').val();
	var shopname = $('#shopname').val();
	if(phonenumber==''){
		jAlert("请填写您的手机号码","");
		return;
	}else if(!(/^((\+?86)|(\(\+86\)))?1\d{10}$/).test(phonenumber)){
    	jAlert("手机号码格式不正确","");
    	return;
   	}
	if(code==''){
		jAlert("请输入手机验证码","");
		return;
	}
	if(shopname==''){
		jAlert("您还没填写店铺名","");
		return;
	}
	var url =locationUrl+'shop/addshop.do';
	$.ajax({
         type: "POST",
         url: url,
         dataType: "json",
         data:{
        	 phone : phonenumber,
        	 verificationCode : code,
        	 shopName:shopname
         },
         success: function (obj) {
            if(obj.code == "200"){
            	jAlert("店铺开通成功。","",function(){
					location.href=obj.backurl;
				});
            } else {
            	jAlert(obj.msg,"");
            }
         },
         error: function (errs) {
        	 jAlert("网络有点小问题，请等会再试","");
         }
    });
}

//绑定手机号
function binding(){
	var phonenumber = $("#phonenumber").val();
	var code = $('#code').val();
	if(phonenumber==''){
		jAlert("请填写您的手机号码","");
		return;
	}else if(!(/^((\+?86)|(\(\+86\)))?1\d{10}$/).test(phonenumber)){
    	jAlert("手机号码格式不正确","");
    	return;
   	}
	if(code==''){
		jAlert("请输入手机验证码","");
		return;
	}
	var url =locationUrl+'order/bindmobile.do';
	$.ajax({
         type: "POST",
         url: url,
         dataType: "json",
         data:{
        	 phone : phonenumber,
        	 verificationCode : code,
         },
         success: function (obj) {
            if(obj.code == "200"){
            	jAlert(obj.msg,"",function(){
					location.href=locationUrl+'order/tomyallorder.do';
				});
            } else {
            	jAlert(obj.msg,"");
            }
         },
         error: function (errs) {
        	 jAlert("网络有点小问题，请等会再试","");
         }
    });
}