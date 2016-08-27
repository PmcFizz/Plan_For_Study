<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!--
	作者：mengchen_0212@foxmail.com
	时间：2016-06-18
	描述：宝宝荟 订单详情
-->

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>订单详情</title>
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
				<h1>订单详情</h1>
			</div>
		</header>
		<div class="container p-t-50" style="padding-bottom: 50px;">
			<section>
				<article class="articleItem">
					<div class="articleheader">
						<h2><span id="orderstate" style="color:#dc3e35">未知</span><span class="floatRight" id="ordercode">订单编号：000000</span></h2>
					</div>
					<div class="selectC_box clearfix">
						<ul>
							<li class="li-line" id="amuont"><a href="javascript:void(0);">应收:&nbsp; 00.00元</a></li>
							<li class="li-line" id="repayAmuont"><a href="javascript:void(0);">已收:&nbsp; 00.00元</a></li>
							<li class="li-line" id="arrearsAmuont"><a href="javascript:void(0);">欠款:&nbsp; 00.00元</a></li>
						</ul>
					</div>
				</article>
			</section>
			<div class="rows">
				<div class="rowsCon">
					<a class="change" href="javascript:;">
						<p id="nameandphone"></p>
						<p id="deliveryAddress"></p>
					</a>
				</div>
			</div>
			<div class="rows">
				<h2 class="title"><span>商品详情</span></h2>
			</div>
			
			<!-- 商品列表start -->
			<div id="goodlist">
				
			</div>
			<!-- 商品列表end -->
			
			<div class="producthm">
				<p>买家留言</p>
				<div class="messages" id="comments"></div>
			</div>
		</div>
		
		<footer class="bottom-wrap bottom-bar-fixed">
			<div class="bottom-ctrl">
				<span class="m-l-10">实收款<span class="redcolor" id="shifu">0</span></span>
             </div>
		</footer>
	</body>
	<script type="text/javascript" data-main="<%=basePath%>/baobaohui/js/order/detail" src="<%=basePath%>/baobaohui/js/require-min-2.2.js"></script>
</html>