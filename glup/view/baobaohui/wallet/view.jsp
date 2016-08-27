<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String accountId = request.getParameter("accountId");
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
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/jquery-ui.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">	
		<style>
		.ui-dialog { top:100px !important;}
		.ui-draggable .ui-dialog-titlebar{ display: none !important;}
		.withdrawbtn{background:#FFF; width: 60px; height:27px; line-height:27px; margin-top:-5px; border-radius:3px; border: 1px solid #dc3e35; color: #dc3e35;}
		</style>
	</head>
	<body basepath="<%=basePath%>">
		<header class="top-wrap top-bar-fixed">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-50 wrap-r-50">
				<h1>我的钱包</h1>
			</div>
		</header>

		<section class="p-t-50">
			<ul class="suiform">
        		<li class="clearfix">
                	<div class="labip">
                		<div class="lab w100"><label class="w100">我的余额</label></div>
                        <div class="lip"><div class="pull-right"><span class="redcolor" id="balance">0.00</span>元</div></div>
                    </div>
                </li>
            	<li class="clearfix">
                	<div class="labip">
                		<div class="lab w100"><label>不可提现余额</label></div>
                        <div class="lip"><div class="pull-right"><span id="unbalance">0.00</span>元</div></div>
                    </div>
                </li>
                <li class="clearfix">
                	<div class="labip">
                		<div class="lab w100"><label class="w100">可提现余额</label></div>
                        <div class="lip">
                        	<div class="pull-right">
                        		<span class="redcolor" id="withdrawBalance">0.00</span>元
                        		<button class="withdrawbtn" onclick="getCash()">提现</button>
                        	</div>
                        </div>
                    </div>
                </li>
            </ul>
			<ul class="sui-list">
                <li><a id="liushui" href="moneyFlowing.do">资金流水</a></li>
                <li><a id="tixian" href="withdrawRrecord.do">提现记录</a></li>
           </ul>
            
		</section>
		
		<div id="dialog" style="height:100%; display:none;" title="提现">
			<div class="pd-20">
				<p class="text-left m-t-10 font-size-14">请输入提现金额：</p>
				<p class="text-left m-t-10"><input type="number"  id="getCashAmount" class="wp100 dialoginput"/></p>
			</div>
			<p class="text-center">
				<button class="csnbtn csnbtn-danger border-radius-0 wp50 mg-0 floatLeft" onclick="getCashSure()">确定</button>
				<button class="csnbtn csnbtn-default border-radius-0 wp50  mg-0 floatRight" onclick="getCashClosebtn()">取消</button>
			</p>
		</div>

		
		<script src="<%=basePath%>baobaohui/js/jquery.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery-ui.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery.alerts.js"></script>
		<script src="<%=basePath%>baobaohui/js/browserDevice.js"></script>
		<script src="<%=basePath%>baobaohui/js/public.js"></script>
		<script>
			//jAlert("您尚未绑定银行卡,无法提现,请点击\"我的银行卡\"进行绑定!", "");
			$( "#dialog" ).dialog({
				autoOpen: false,
				modal: true,
				width:'80%',
			});
			
			function getCash(){//提现
				$("#dialog").dialog( "open" );
				$(".ui-widget-overlay").on('click',function(e){
					$("#dialog").dialog( "close" );
				});
			}
			function getCashSure(){
				var amount =$('#getCashAmount').val(); 
				if(amount<1){
					jAlert("提现金额不能少于1元","");
					return;
				}
				$.ajax({
					type : "POST",
					url:"<%=basePath%>capital/withdraw.do",
					dataType : "json",
					data:{
						accountId:"<%=accountId%>",
						amount:amount
					},
					success:function(obj){
						console.log(obj);
						if(obj.code=="200"){
							$("#dialog").dialog( "close" );
							jAlert('提现成功','',function(){
								location.href=location.href;
							});		
						}else{
							$("#dialog").dialog( "close" );
							jAlert("提现失败,"+obj.msg,'');
						}
					},
					error : function(errs) {
						jAlert("网络不太稳定，再试试看","");
					}
				});	
			}
			function getCashClosebtn(){//取消、关闭
				 $("#dialog").dialog("close");
			}
			

			$.ajax({
				type : "POST",
				url:"<%=basePath%>capital/querywallet.do",
				dataType : "json",
				data:{
					accountId:"<%=accountId%>",
				},
				success:function(obj){
					console.log(obj);
					if(obj.code=="200"){
						
						var balance =obj.account.balance.toFixed(2);
						var withdrawBalance =obj.account.withdrawBalance.toFixed(2);
						var unbalance =(Number(balance) - Number(withdrawBalance)).toFixed(2);;
						$('#balance').text(balance);
						$('#withdrawBalance').text(withdrawBalance);
						$('#unbalance').text(unbalance);
						$('#liushui').prop("href", $("#liushui").prop("href") + "?accountid=" + obj.account.id);
						$('#tixian').prop("href", $("#tixian").prop("href") + "?accountid=" + obj.account.id);
					}
				},
				error : function(errs) {
					jAlert(errs,'');
				}
			});	

		</script>

	</body>
</html>
