<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>开通店铺</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">
	</head>
	<body data-url="<%=basePath %>">
		<header class="top-wrap top-bar-fixed">
			<div class="wrap-title wrap-l-50 wrap-r-50"><h1>开通店铺</h1></div>
		</header>
		<div class="container p-t-50">
			<div id="banner" class="slides-baner">
				<a href="#"><img src="<%=basePath%>baobaohui/images/banner0.jpg"  width="100%" /></a>
			</div>
        	<ul class="suiform">
        		<li>
                	<div class="labip">
                		<div class="lab"><label>手机号</label></div>
                        <div class="lip"><input type="tel" id="phonenumber" placeholder="请填写您的手机号码" maxlength="11"/></div>
                    </div>
                </li>
                <li>
                	<div class="labip">
                        <div class="lab"><label>验证码</label></div>
                        <div class="lip"><input type="tel" id="code" placeholder="请输入手机验证码"  maxlength="6"/></div>
                        <div class="lipele" style="top:-5px">
                        	<input type="button" id="codebtn" value="获取验证码" />
                        	<input type="button" id="voicecodebtn" value="获取语音验证码" style="display: none;"/>
						</div>
                    </div>
                </li>
                <li>
                	<div class="labip">
                        <div class="lab"><label for="usercode">店铺名</label></div>
                        <div class="lip"><input type="text" id="shopname" placeholder="请填写您的店铺名称" id="usercode"/></div>
                    </div>
                </li>
            </ul>
    	</div>
    	<footer class="bottom-wrap bottom-bar-fixed">
    		<button class="csnbtn csnbtn-danger border-radius-0" onclick="register()">确定</button>
    	</footer>
		<script src="<%=basePath%>baobaohui/js/jquery.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/browserDevice.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery.alerts.js"></script>
		<script src="<%=basePath%>baobaohui/js/public.js"></script>
		<script src="<%=basePath%>baobaohui/js/getVerifyCode.js"></script>
		<script src="<%=basePath%>baobaohui/js/login.js"></script>
	</body>
</html>
