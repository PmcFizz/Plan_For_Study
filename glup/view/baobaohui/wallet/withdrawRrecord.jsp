<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>提现记录</title>
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
				<h1>提现记录</h1>
			</div>
		</header>
		<section class="container p-t-50">
            <div class="moneyrecord">
            	<ul class="moneyrecordlists" id="allRecords">
				  <!-- <li>
				    <h3>2016-06-16 15:19:23<span class="floatRight">处理结果: <span class="redcolor">提现失败</span></span></h3>
				    <div class="c">
				      <p>提现人:+8613510371652(段覃昭)</p>
				      <p>开户行:招商银行</p>
				      <p>银行卡号:6225886551507294</p>
				      <span class="val">10</span></div>
				    <div class="f">
				      <p>备注:提现拒绝，银行卡信息不完整</p>
				    </div>
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
			      cashMag.accountid = urlPar.accountid
			   } else {
			      jAlert("没有账号id", "")
			   }
			   cashMag.query();
			   //滚动到底部加载第二页
			   $(window).on("scroll", function() {
			      var scrollTop = $(this).scrollTop();
			      var windowHeight = window.innerHeight;
			      var scrollHeight = $(document).height();
			      if (scrollTop + windowHeight == scrollHeight) { //滚动到最底部了
			         if (cashMag.pageIndex != -1) { //没有加载完成
			            cashMag.query();
			         }
			      }
			   });
			})
			var cashMag = {
			   basePath: mobilecommon.getRootPath(),
			   //查询流水记录
			   pageIndex: 0,
			   pageSize: 6,
			   accountid: "",
			   query: function() {
			      cashMag.pageIndex = cashMag.pageIndex + 1;
			      $.ajax({
			         type: "post",
			         url: cashMag.basePath + "money/queryMoneyWithdrawListPage.do",
			         async: true,
			         data: {
			            pageIndex: cashMag.pageIndex,
			            pageSize: cashMag.pageSize,
			            aid: cashMag.accountid
			         },
			         dataType: "json",
			         success: function(obj) {
			        	 console.log(obj);
			            if (obj.code == 200) {
			               if (obj.pageHolder.rowCount == 0) {
			                  cashMag.pageIndex = -1;
			                  var noreco = '<div class="nullCon"><p class="picbg"><i class="yhjicon" style="background: url(../baobaohui/images/nolz.png );background-size: 106%;margin-right: 0px;margin-top: 22px;height: 83px;"></i></p><p><span class="nullword">没有资金明细</span></p></div>'
				                  $("#allRecords").append(noreco);
			               } else {
			                  var total = parseInt(obj.pageHolder.rowCount);
			                  if ((cashMag.pageIndex * cashMag.pageSize) >= total) { //加载完了
			                     cashMag.pageIndex = -1;
			                     $("#loadMore").hide();
			                  } else {
			                     $("#loadMore").show();
			                  }

			                  if (obj.pageHolder && obj.pageHolder.list && obj.pageHolder.list.length > 0) {
			                     var pageTrades = obj.pageHolder.list
			                     for (var i = 0; i < obj.pageHolder.list.length; i++) {
			                        try {
			                           var myWithdraw = pageTrades[i];
			                           if (myWithdraw == null) {
			                              continue;
			                           }
			                           var amount = myWithdraw.amount; //金额
			                           var submitterUserName = myWithdraw.submittername; //提现人
			                           var bankAccount = myWithdraw.bankAccount == null ? "" : myWithdraw.bankAccount;  //银行卡号
			                           var bank = myWithdraw.bank == null ? "" : myWithdraw.bank; //开户行
			                           var submittingDate = myWithdraw.submittingDate; //提现时间
			                           var processResult = myWithdraw.processResult; //处理结果
			                           if (processResult == 1) {
			                              processResult = "提现成功";
			                           } else if (processResult == 0) {
			                              processResult = "提现失败";
			                           } else {
			                              processResult = "尚未处理";
			                           }
			                           var notes = myWithdraw.comments == null ? "" : myWithdraw.comments; //备注
			                           //提现HTML
			                           var myWithdrawHtml = "";
			                           myWithdrawHtml += '<li>';
			                           if (processResult == '提现成功') {
			                              myWithdrawHtml += '<h3>' + submittingDate + '<span class="floatRight">处理结果: <span class="yecolor">' + processResult + '</span></span></h3>';
			                           } else {
			                              myWithdrawHtml += '<h3>' + submittingDate + '<span class="floatRight">处理结果: <span class="redcolor">' + processResult + '</span></span></h3>';
			                           }
			                           myWithdrawHtml += '<div class="c">';
			                           myWithdrawHtml += '<p>提现人:' + submitterUserName + '</p>';
			                           myWithdrawHtml += '<p>开户行:' + bank + '</p>';
			                           myWithdrawHtml += '<p>银行卡号:' + bankAccount + '</p>';
			                           myWithdrawHtml += '<span class="val">' + amount + '</span>';
			                           myWithdrawHtml += '</div>';
			                           myWithdrawHtml += '<div class="f"><p>备注:' + notes + '</p></div>';
			                           myWithdrawHtml += '</li>';
			                           $("#allRecords").append(myWithdrawHtml);
			                        } catch (e00) {}
			                     }
			                  } else {
			                     if (cashMag.pageIndex == -1) {
			                        $("#allRecords").append('<p style="text-align: center;">没有更多数据了</p>');
			                     }
			                  }

			               }
			            } else {
			               jAlert("查询推荐人出错", "");
			            }
			         },
			         error: function(err) {}
			      });
			   }

			}
		</script>

	</body>
</html>