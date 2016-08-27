<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>资金流水</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">	
	</head>
	<body basepath="<%=basePath%>">
		<header class="top-wrap top-bar-fixed">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-50 wrap-r-50">
				<h1>资金流水</h1>
			</div>
		</header>
		<section class="container p-t-50">
            <div class="moneyrecord">
            	<ul class="moneyrecordlists" id="allDetails">
            	<!-- <ul>
		            <li>
						<p class="xq">订单结算 44421365454</p>
						<div class="m">
							<p class="time">2016.06.22 10:10:01</p>
							<p class="qian"><span class="redcolor f24">+1004</span><span class="pull-right">余额：<span class="redcolor">￥1204</span></span></p>
						</div>
						<div class="f"><p class="time">备注:订单支付</p></div>
					</li>
					 <li>
						<p class="xq">提现</p>
						<div class="m">
							<p class="time">2016.06.22 10:10:01</p>
							<p class="qian"><span class="yecolor f24">-1004</span><span class="pull-right">余额：<span class="redcolor">￥200</span></span></p>
						</div>
						<div class="f"><p class="time">备注:申请提现</p></div>
					</li> -->
				</ul>
				<div id="loadMore" class="loadingIcon"><i class="round-icon"></i> 正在加载...</div>
            </div>
		</section>
		

		
		<script src="<%=basePath%>baobaohui/js/jquery.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery.alerts.js"></script>
		<script src="<%=basePath%>baobaohui/js/browserDevice.js"></script>
		<script src="<%=basePath%>baobaohui/js/public.js"></script>
		<script>
		$(function() {
			   var urlPar = mobilecommon.getUrlParams();
			   if (urlPar.accountid) {
			      liushui.accountid = urlPar.accountid;
			   } else {
			      jAlert("没有账号id", "");
			   }
			   liushui.query();

			});
			$(window).scroll(function() {
			   var scrollTop = $(this).scrollTop();
			   var windowHeight = window.innerHeight;
			   var scrollHeight = $(document).height();
			   if (scrollTop + windowHeight == scrollHeight) { //滚动到最底部了
			      if (liushui.pageIndex != -1) {
			         liushui.query();
			      }
			   }
			});
			var liushui = {
			   basePath: mobilecommon.getRootPath(),
			   //查询流水记录
			   pageIndex: 0,
			   pageSize: 6,
			   accountid: "",
			   query: function() {
			      liushui.pageIndex = liushui.pageIndex + 1;
			      $.ajax({
			         type: "post",
			         url: liushui.basePath + "capital/flow.do",
			         async: true,
			         data: {
			            pageIndex: liushui.pageIndex,
			            pageSize: liushui.pageSize,
			            accountId: liushui.accountid
			         },
			         dataType: "json",
			         success: function(obj) {
			        	 console.log(obj);
			            if (obj.code == 200) {
			               if (obj.data.total == 0) {
			                  liushui.pageIndex = -1
			                  var noreco = '<div class="nullCon"><p class="picbg"><i class="yhjicon" style="background: url(../baobaohui/images/nols.png );background-size: 106%;margin-right: 0px;margin-top: 22px;height: 83px;"></i></p><p><span class="nullword">没有资金明细</span></p></div>'
			                  $("#allDetails").append(noreco);
			               } else {
			                  var total = parseInt(obj.data.total); //订单总数
			                  if ((liushui.pageIndex * liushui.pageSize) >= total) { //加载完了
			                     liushui.pageIndex = -1;
			                     $("#loadMore").hide();
			                  } else {
			                     $("#loadMore").show();
			                  }
			                  if (obj.data && obj.data.list && obj.data.list.length > 0) {
			                     var html = "";
			                     $.each(obj.data.list, function(i, d) {
			                        var flowtype = d.flowType ? d.flowType : " ";
			                        html += '<li>';
			                        html += '<p class="xq">' + flowtype + '</p>';
			                        html += '<div class="m">';
			                        var createDate = d.createdDate.replace("T", " ");
			                        html += '<p class="time">' + createDate + '</p>';
			                        if (d.amount > 0) {
			                           html += '<p class="qian"><span class="redcolor f24">+' + d.amount + '</span><span class="mui-pull-right floatRight">余额：<span class="redcolor">￥' + d.accountBalance + '</span></span></p>';
			                        } else {
			                           html += '<p class="qian"><span class="yecolor f24">' + d.amount + '</span><span class="mui-pull-right floatRight">余额：<span class="redcolor">￥' + d.accountBalance + '</span></span></p>';
			                        }
			                        html += '</div>';
			                        html += '<div class="f"><p class="time">备注:' + d.notes + '</p></div>';
			                        html += '</li>';
			                     });
			                     $("#allDetails").append(html);
			                  } else {
			                     if (liushui.pageIndex == -1) {
			                        $("#allDetails").append('<p style="text-align: center;">没有更多数据了</p>');
			                     }
			                  }
			               }

			            } else {
			               jAlert("查询流水记录出错", "");
			            }
			         },
			         error: function(err) {}
			      });
			   },

			}
		</script>

	</body>
</html>