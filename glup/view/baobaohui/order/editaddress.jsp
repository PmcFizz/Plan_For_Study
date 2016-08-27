<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!--
	作者：mengchen_0212@foxmail.com
	时间：2016-06-18
	描述：宝宝荟 编辑收货地址
-->

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>收货地址-编辑</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/add.css">
		<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=dvjZUVwCdMkMTo2geBeVr4GxOL6uEXoM"></script>
	</head>

	<body basepath="<%=basePath%>">
		<header class="top-wrap top-bar-fixed">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-100 wrap-r-100">
				<h1>编辑收货地址</h1>
			</div>
		</header>
		<div class="container p-t-50">
			<form action="login.html" method="post">
				<div class="useropt">
					<div class="frmrow">
						<lable>收货人 </lable>
						<input type="hidden" id="id_key" />
						<input type="text" name="consigneeName" id="consigneeName" placeholder="请填写收件人姓名" value="">
					</div>
					<div class="frmrow">
						<lable>手机号码</lable>
						<input type="tel" name="phoneNum" id="phoneNum" class="code" maxlength="11" placeholder="请填写手机号码">
					</div>
					<div class="frmrow clearfix">
						<lable class="floatLeft">所在地区</lable>
						<input id="selectAreaId" type='hidden'/>
						<div class="floatLeft">
							<p class="place">
								<select name="province" id="selectProvince">
                        	<option value="-1">--省份--</option>	  	
                        </select>
							</p>
							<p class="place">
								<select name="city" id="selectCity">
                        	<option value="-1">--城市--</option>
                        </select>
							</p>
							<p class="place">
								<select name="district" id="selectArea">
                        	<option value="-1">--县级--</option>
                        </select>
							</p>
							<p class="place">
								<select name="selectTowns" id="selectTowns">
                        	<option value="-1">--乡镇--</option>
                        </select>
							</p>
						</div>
					</div>
					<ul class="suiform">
						<li>
							<div class="labip">
								<div class="lab"><label for="usercode">详细地址</label></div>
								<div class="lip"><textarea id="addressdetail"></textarea></div>
							</div>
						</li>
					</ul>
				</div>
			</form>

		</div>
		<div id="allmap" style="display: none"></div>
		<footer class="bottom-wrap bottom-bar-fixed">
			<p class="mline"><button class="csnbtn csnbtn-danger" id="submit">确定</button></p>
		</footer>
		<script type="text/javascript" src="<%=basePath%>baobaohui/js/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>baobaohui/js/jquery.alerts.js"></script>
		<script type="text/javascript" src="<%=basePath%>baobaohui/js/order/editaddress.js"></script>
	</body>

</html>