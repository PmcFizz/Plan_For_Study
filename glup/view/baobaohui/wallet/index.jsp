<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>我的钱包</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">	
	</head>
	<body>
		<header class="top-wrap top-bar-fixed">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-50 wrap-r-50">
				<h1>我的钱包</h1>
			</div>
		</header>

		<section class="p-t-50">	
			<ul>
				<li class="actli p-t-b-l m-b-10">
					<div class="content">
						<div class="actlileft">
							<a href="view.do" id="personal">
								<p>账户：<span>个人账户</span></p>
								<p>余额：￥<span class="redcolor"  id="pbalance">0.00</span></p>
							</a>	
						</div>
						<div class="pull-right m-r-20">
							<p class="theicons"></p>
							<p><span>个人钱包</span></p>
						</div>
					</div>
				</li>
				<li class="actli p-t-b-l m-b-10" id="baobaoqb">
					<div class="content">
						<div class="actlileft">
							<a href="view.do" id="baobaowalletink">
								<p>账户：<span id="baobaocode"></span></p>
								<p>余额：￥<span class="redcolor" id="balance">0.00</span></p>
							</a>	
						</div>
						<div class="pull-right m-r-20">
							<p class="theicons"></p>
							<p><span>云商通钱包</span></p>
						</div>
					</div>
				</li>
			</ul>
		</section>

		<!-- http://betam.51xnb.cn/mobile/capital/flow.do查询资金流水记录 -->
		<script src="<%=basePath%>baobaohui/js/jquery.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery.alerts.js"></script>
		<script src="<%=basePath%>baobaohui/js/browserDevice.js"></script>
		<script src="<%=basePath%>baobaohui/js/public.js"></script>
		<script>
			$.ajax({
				type : "POST",
				url:"<%=basePath%>capital/moneywallet.do",
				dataType : "json",
				success:function(obj){
					console.log(obj);
					if(obj.code=="200"){
						$('#baobaocode').text(obj.bShopAccount.code);
						$('#baobaowalletink').prop("href", $("#baobaowalletink").prop("href") + "?accountId=" + obj.bShopAccount.id);
						$('#balance').text(obj.bShopAccount.balance.toFixed(2));
						$('#personal').prop("href", $("#personal").prop("href") + "?accountId=" + obj.account.id);
						$('#pbalance').text(obj.account.balance.toFixed(2));
					}
				},
				error : function(errs) {
					console.log(errs);
				}
			});	
		</script>
		
		
	</body>
</html>