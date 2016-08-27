<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!--
	作者：mengchen_0212@foxmail.com
	时间：2016-06-18
	描述：我的订单   已发货订单
-->
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title>我的订单-待发货</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-control" content="no-cache">
		<meta http-equiv="Cache" content="no-cache">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/add.css">
	</head>

	<body basepath="<%=basePath%>">
		<header class="top-wrap top-bar-fixed">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-100 wrap-r-100">
				<h1>我的订单</h1>
			</div>
			
		</header>
		<div class="search" id="search">
			<div class="selectC_box clearfix">
				<ul>
					<li><a class="ordertab" href="javascript:void(0)" data-href="<%=basePath %>order/tomyallorder.do">所有</a></li>
					<li class="active"><a href="javascript:void(0)"  data-href="<%=basePath %>order/towaitsend.do" class="check ordertab">待发货</a></li>
					<li><a class="ordertab" href="javascript:void(0)" data-href="<%=basePath %>order/tomyhavesendorder.do">已发货</a></li>
				</ul>
			</div>
		</div>

		<div class="topselect">
			<ul id="orderlists">
			
			</ul>
			<div class="loadingIcon"><i class="round-icon"></i> <span id="loadingtext">正在加载...</span></div>
		</div>
		
		<!-- 还款弹框Start -->
		<div id="overlay" class="hide">
		</div>
		<div id="dialog" class="hide" title="提现">
			<div class="pd-20">
				<p class="text-center font-size-16">请输入付款金额</p>
				<input type="hidden" id="payOrderId" />
				<!-- <p class="text-left m-t-10 font-size-14"></p> -->
				<p class="text-left m-t-10"><input id="orderPayAmount" type="number" class="wp100 dialoginput"/></p>
			</div>
			<p class="text-center">
				<button class="csnbtn csnbtn-danger border-radius-0 wp50 mg-0 floatLeft" id="surePayBtn">确定</button>
				<button class="csnbtn csnbtn-default border-radius-0 wp50  mg-0 floatRight" onclick="hidePayDialog()">取消</button>
			</p>
		</div>
		<!-- 还款弹框End -->
		
		<script type="text/javascript" data-main="<%=basePath%>baobaohui/js/order/myorder-waitsend" src="<%=basePath%>baobaohui/js/require-min-2.2.js"></script>
	</body>

</html>