<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!--
	作者：mengchen_0212@foxmail.com
	时间：2016-06-18
	描述：宝宝荟  收货地址列表
-->

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>收货地址列表</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/add.css">
	</head>

	<body basepath="<%=basePath%>">
		<header class="top-wrap top-bar-fixed">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-100 wrap-r-100">
				<h1>选择收货地址</h1>
			</div>
			<div class="pull-right goto"><a href="<%=basePath%>order/toeditaddress.do">添加</a></div>
		</header>
		<div class="container p-t-50" style="padding-bottom: 50px !important">
			<!-- 地址列表start -->
			<div id="address-list">
			
			<!-- 	 
				<div class="rows">
					<div class="rowsCon" style="position:relative;">
						<a class="change" href="javascript:void(0);">
							<p><span class="name">张三</span>12345678965</p>
							<p style="margin-right:70px; font-size:13px;">广东省_深圳市_南山区_科技园_北区</p>
						</a>
						<div class="modidelcon">
							<a href="javascript:void(0);" class="floatLeft modi change"></a>
							<a class="floatLeft line"></a>
							<a href="javascript:void(0);" class="floatLeft del change"></a>
						</div>
						<i class="selectrightbtn"></i>
					</div>
				</div> -->
				
			</div>
			<!-- 地址列表end -->
		</div>
		
		<!-- <footer class="bottom-wrap bottom-bar-fixed">
			<div class="bottom-ctrl">
             	<button class="csnbtn csnbtn-danger floatRight w100 border-radius-0 mg-0" style="height: 50px;" id="confirmaddr">确定</button>
             </div>
		</footer> -->
		<div class="nowloading" ><img src="http://m.51xnb.cn:80/xnb/me/images/loading1.gif" width="50"></div>
		
		<script type="text/javascript" data-main="<%=basePath%>/baobaohui/js/order/addresslist" src="<%=basePath%>/baobaohui/js/require-min-2.2.js"></script>
	</body>

</html>