<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>绑定手机号</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">
	</head>
	<body data-url="<%=basePath %>">
		<header class="top-wrap top-bar-fixed">
			<div class="wrap-title wrap-l-50 wrap-r-50"><h1>绑定手机号</h1></div>
		</header>
		<div class="container p-t-50">
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
            </ul>
			<p class="pline"><button class="csnbtn csnbtn-danger border-radius-0" onclick="binding()">确定</button></p>
    	</div>
		<script src="<%=basePath%>baobaohui/js/jquery.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/browserDevice.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery.alerts.js"></script>
		<script src="<%=basePath%>baobaohui/js/public.js"></script>
		<script src="<%=basePath%>baobaohui/js/getVerifyCode.js"></script>
		<script src="<%=basePath%>baobaohui/js/login.js"></script>
	</body>
</html>