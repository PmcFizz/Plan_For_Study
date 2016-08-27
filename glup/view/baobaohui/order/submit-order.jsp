<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!--
	作者：mengchen_0212@foxmail.com
	时间：2016-06-18
	描述：宝宝荟 提交订单
-->

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>提交订单</title>
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
				<h1>提交订单</h1>
			</div>
		</header>
		<div class="container p-t-50">

			<div class="rows" >
				<div class="rowsCon" >
					<!-- 收货地址id -->
					<input id="receiveaddrId" type="hidden"/>
					<a class="change" id="defaultAddre" href="javascript:void(0);">
						<p id="namenadphone"><span class="name"></span></p>
						<p id="receiveaddr"></p>
					</a>
				</div>
			</div>

			<!-- <div class="rows">
				<div class="rowsCon" style="text-align: center;font-size: 16px;padding: 20px;">
					<a class="change" href="javascript:void(0);">
						<span class="redcolor">您还没有添加收货地址,点此添加</span>
					</a>
				</div>
			</div> -->

			<div class="rows">
				<h2 class="title"><span>商品详情</span></h2>
			</div>
			<div id="goodlsit">
				<!-- <article class="productItem">
					<a href="javascript:;">
						<div class="ppic"><img width="60" height="60" src="http://m.51xnb.cn:80/servlet/XNBMallJSONServlet?method=getImgUrl&amp;fid=8db643d6-fb62-4a5d-b1d8-edc5f65ca4de"></div>
						<div class="title">
							<h3>华为 智能手机 畅享5 全网通 双卡双待 屏幕5.0吋 内存2G+16G 4G手机</h3>
							<span class="price"> ￥899.00</span>
							<p><span class="floatRight">x 1</span></p>
						</div>
					</a>
				</article> -->
			</div>
			<ul class="suiform">
				<li>
					<div class="labip">
						<div class="lab"><label for="usercode">买家留言</label></div>
						<div class="lip"><textarea id="note"></textarea></div>
					</div>
				</li>
			</ul>
		</div>
		<footer class="bottom-wrap bottom-bar-fixed">
			<div class="bottom-ctrl">
				<span class="m-l-10">应付金额￥<span class="redcolor" id="totalAmount">0</span></span>
             	<button class="csnbtn csnbtn-danger floatRight w100 border-radius-0 mg-0" style="height: 50px;" id="submitorder">提交订单</button>
             </div>
		</footer>
		<script type="text/javascript" data-main="<%=basePath%>baobaohui/js/order/submit-order" src="<%=basePath%>baobaohui/js/require-min-2.2.js"></script>
	</body>

</html>