/**
 * @功能: 验证码
 * @return
 * @作者: 徐思伟
 * @时间: 2016年6月25日14:34:23
 * @备注:
 */
var locationUrl =$('body').data('url');
 // 给“获取验证码”绑定点击事件
$('#codebtn').on('click',function(){
	var phonenumber = $("#phonenumber").val();
	if(phonenumber==""){
        jAlert("请填写您的手机号码","");
    } else if(!(/^((\+?86)|(\(\+86\)))?1\d{10}$/).test(phonenumber)){
    	jAlert("手机号码格式不正确","");
    } else{
    	getVerifyCode($('#codebtn').get(0));
	}
});

// 给“获取语音验证码”绑定点击事件
$('#voicecodebtn').on('click',function(){
	var phonenumber = $("#phonenumber").val();
	if(phonenumber==""){
       jAlert("请填写您的手机号码","");
    } else if(!(/^((\+?86)|(\(\+86\)))?1\d{10}$/).test(phonenumber)){
    	jAlert("手机号码格式不正确","");
    } else{
    	getVoiceVerifyCode($('#voicecodebtn').get(0));
	}
});

var countdown=60;
function settime(val) {
    if (countdown == 0) {
    	if($(val).attr("id") == "codebtn"){
    		var now = new Date();
	        var hh = now.getHours(); // 时
	        if(Number(hh)>7 && Number(hh)<22){
	        	$(val).hide();
        		$("#voicecodebtn").show();
	        } else {
	        	val.removeAttribute("disabled");
                val.value="获取验证码";
                val.style.background = "#FFFFFF";
                val.style.border = "1px solid #dc3e35";
                val.style.color = "#dc3e35";
	        }
    	} else {
    		val.removeAttribute("disabled");
            val.value="获取语音验证码";
            val.style.background = "#FFFFFF";
            val.style.border = "1px solid #dc3e35";
            val.style.color = "#dc3e35";
    	}
        countdown = 60;
    }else{
        val.setAttribute("disabled", true);
        val.value="重新发送(" + countdown + ")";
        val.style.background = "#F1F1F1";
        val.style.border = "1px solid #F1F1F1";
        val.style.color = "#999999";
        countdown--;
        if(countdown<10){
            countdown= '0'+countdown;
        }
        setTimeout(function() {
            settime(val);
        },1000);
     }
}

 // 获取验证码
function getVerifyCode(codebtn){
	settime(codebtn);
	var phonenumber = $("#phonenumber").val();
	var url =locationUrl+'login/getVerifyCode.do';
	$.ajax({
         type: "POST",
         url: url,
         dataType: "json",
         data:{
        	 phone : phonenumber,
        	 verifyCodeType:0,
         },
         success: function (obj) {
            if(obj.code == "200"){
            	jAlert("验证码已发送到您的手机，请注意查看。","");
            } else {
            	jAlert(obj.msg,"");
            }
         },
         error: function (errs) {
        	 jAlert("网络有点小问题，请等会再试","");
         }
    });
}

// 获取语音验证码
function getVoiceVerifyCode(codebtn){
	settime(codebtn);
	var phonenumber = $("#phonenumber").val();
	var url =locationUrl+'login/getVerifyCode.do';
	$.ajax({
         type: "POST",
         url: url,
         dataType: "json",
         data:{
        	 phone : phonenumber,
        	 verifyCodeType:1,
         },
         success: function (obj) {
            if(obj.code == "200"){
            	jAlert("验证码已发送到您的手机，请注意查看。","");
            } else {
            	jAlert(obj.msg,"");
            }
         },
         error: function (errs) {
        	 jAlert("系统异常，请稍后重试!", "");
         }
    });
}