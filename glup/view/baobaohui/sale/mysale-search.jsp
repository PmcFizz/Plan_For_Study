<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!--
	作者：mengchen_0212@foxmail.com
	时间：2016-06-18
	描述：我的销售查询   有订单
-->
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title>我的销售查询</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-control" content="no-cache">
		<meta http-equiv="Cache" content="no-cache">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/add.css">
		<style type="text/css">
		.nullCon{
			margin-top: 0px
		}
		</style>
	</head>

	<body basepath="<%=basePath%>">
		<header class="top-wrap top-bar-fixed">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-100 wrap-r-100">
				<h1>我的销售查询</h1>
			</div>
		</header>

		<div class="search search-grey-bg" id="search">
			<span class="word"><i class="iconsearch-sm-cate"></i></span>
	     	<div class="searchpost"><input id="searchText" name="seach" type="text" class="searchinput search-white-bg m-r-0" placeholder="请输入商品名称、页面名称"></div>
	     	<button id="searcheven" class="searchbtn">搜索</button>
       </div>

		 
		<section class="main">	
			<ul id="orderlists">
				<!-- <li class="articleItem">
					<div class="articleheader">
						<h2>待发货<span>买家已删除改订单</span></h2>
					</div>
					<div class="articlecon">
						<a href="detail.html">
							<div class="piclist"><img width="60" height="60" src="http://m.51xnb.cn:80/xnb/file/image.do?id=8db643d6-fb62-4a5d-b1d8-edc5f65ca4de"></div>
							<i class="pointRight pRother"></i>
							<span class="time">2016-06-16 10:07:12</span>
						</a>
					</div>
					<div class="articlefooter clearfix">
						<span>应收:&nbsp;<span class="colr">¥200</span></span><br>
						<a class="acc_upload acc_color">删 除</a>
					</div>
				</li> -->
			</ul>
			<div class="loadingIcon"><i class="round-icon"></i> <span id="loadingtext">正在加载...</span></div>
		</section>
		
		<!-- 收款弹框Start -->
		<div id="overlay" class="hide">
		</div>
		<div id="dialog" class="hide" >
			<div class="pd-20">
				<p class="text-center font-size-16">请输入还款金额(元)</p>
				<input type="hidden" id="revicePayOrderId" />
				<!-- <p class="text-left m-t-10 font-size-14"></p> -->
				<p class="text-left m-t-10"><input id="revicePayAmount" type="number" class="wp100 dialoginput"/></p>
			</div>
			<p class="text-center">
				<button class="csnbtn csnbtn-danger border-radius-0 wp50 mg-0 floatLeft" id="sureMoneyBtn">确定</button>
				<button class="csnbtn csnbtn-default border-radius-0 wp50  mg-0 floatRight" onclick="hidePayDialog()">取消</button>
			</p>
		</div>
		<!-- 收款弹框End -->
		
		<script type="text/javascript" data-main="<%=basePath%>baobaohui/js/sale/mysale-search" src="<%=basePath%>baobaohui/js/require-min-2.2.js"></script>
	</body>

</html>