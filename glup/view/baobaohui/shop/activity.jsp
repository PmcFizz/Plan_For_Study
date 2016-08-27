<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>活动管理</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui//css/jquery-ui.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui//css/style.css">	
		<style>
		header.top-bar-fixed{ z-index: 100;}
		.ui-dialog { top:100px !important;}
		.ui-draggable .ui-dialog-titlebar{ display: none !important;}
		.withdrawbtn{background:#FFF; width: 60px; height:27px; line-height:27px; margin-top:-5px; border-radius:3px; border: 1px solid #dc3e35; color: #dc3e35;}
		.ui-widget-header{border-bottom:none;}canvas{ width: 100%;}
		</style>
	</head>
	<body>
		<header class="top-wrap top-bar-fixed">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-50 wrap-r-50">
				<h1>活动管理</h1>
			</div>
			<div class="pull-right"><a onclick="activity.creatA()" class="search-btn">创建</button></a></div>
		</header>
		<div class="search search-grey-bg" id="search">
			<span class="word"><i class="iconsearch-sm-cate"></i></span>
	     	<div class="searchpost"><input id="keywords" name="seach" type="text" value="" class="searchinput search-white-bg m-r-0" placeholder="请输入商品名称、页面名称"></div>
	     	<button id="searcheven" class="searchbtn" onclick="activity.searchA()">搜索</button>
       </div>
		<section class="main">	
			<ul class="bgcolor-255" id="allDetails">
			</ul>
		</section>
		
		

		<div id="creatactivityDialog" style="height:100%; display:none;" title="创建一个活动">
			<div class="pd-20">
				<p class="text-left m-t-10 font-size-14">会销活动名称：</p>
				<p class="text-left m-t-10"><input type="text"  name="activityName"  id="activityName" class="wp100 dialoginput"/></p>
			</div>
			<p class="text-center">
				<button class="csnbtn csnbtn-danger border-radius-0 wp50 mg-0 floatLeft" onclick="activity.saveA()">确定</button>
				<button class="csnbtn csnbtn-default border-radius-0 wp50  mg-0 floatRight" onclick="activity.closeA()">取消</button>
			</p>
		</div>
		
		<div id="dialog" style="height:100%; display:none;" title="扫描此二维码选购商品">
			<div class="pd-20 p-b-0">
				<p class="text-center m-b-10  font-size-18">扫描此二维码选购商品</p>
				<div id="qrcode" class="text-center p-l-30 p-r-30" style="display:none;"></div>
				<div class="text-center"><img id="qrcodeimage" src="<%=basePath%>baobaohui/images/Qrcode.jpg" width="100%" /></div>
				<div id="qrcodetext" class="m-t-10  m-b-10 text-center"></div>
			</div>
			<p class="text-center qrcodlongtap" >长按二维码后点击“保存图片”</p>
		</div>

		
		<script src="<%=basePath%>baobaohui/js/jquery.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery-ui.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery.alerts.js"></script>
		<script src="<%=basePath%>baobaohui/js/browserDevice.js"></script>
		<script src="<%=basePath%>baobaohui/js/qrcode.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery.qrcode.js"></script>
		<script src="<%=basePath%>baobaohui/js/public.js"></script>
		<script>
			$( "#dialog,#creatactivityDialog" ).dialog({
				autoOpen: false,
				modal: true,
				width:'80%',
			});	
			$(function(){
				activity.getlistA();
			});
			function offsetScroll(){//滚动条事件
				var scrollTop = $(this).scrollTop();
				var windowHeight = $(this).height();
				var scrollHeight = $(document).height();
				if(scrollTop + windowHeight == scrollHeight){//滚动到最底部了
					if(pageIndex!=-1){//没有加载完成
						activity.getlistA();
					}
				}
			}
	   		$(window).on("scroll",function(){
	   			offsetScroll();
			});
			var payTotal = 0;
	   		var pageIndex = 0;
	   		var pageSize  = 10;
	   		//var keywords = $('#keywords').val();
			var activity={
					el:$("#creatactivityDialog"),
					creatA:function(){ //打开创建活动弹框
						this.el.dialog( "open" );
					},
					closeA:function(){//关闭活动弹窗
						this.el.dialog( "close" );
					},
					searchA:function(){
						pageIndex=0;
						$("#allDetails").html('');
						activity.getlistA();
					},
					getlistA:function(){
						if(pageIndex==-1){ //已经加载完了
							return;
						}
						$.ajax({
							type : "POST",
							url:"<%=basePath%>baobaohui/activitylist.do",
							dataType : "json",
							data:{
								pageIndex:pageIndex,
								pageSize:pageSize,
								keywords:$('#keywords').val(),
							},
							success:function(obj){
								console.log(obj);
								 if(obj.code=="200"){
									if(obj.data.total == 0){
										if(pageIndex==0){//当前用户没有任何订单
											var nulldiv ='';
												  nulldiv ='<div class="nullCon"><p class="picbg"><i class="seachnullicon"></i></p><p><span class="nullword">点击右上角"创建"一个销售活动</span></div>';
												  $("#allDetails").html(nulldiv);
										}
										pageIndex = -1;
										$("#loadMore").hide();
									}else{
										pageIndex = pageIndex + 1;
										payTotal = parseInt(obj.data.total);//订单总数
										if((pageIndex*pageSize)>=payTotal){//加载完了
											pageIndex = -1;
											$("#loadMore").hide();
										}else{
											$("#loadMore").show();
										}
										//插入新的一页明细数据到页面
										var pageDatas = obj.data.list;
										activity.insertAjaxData(pageDatas);
									}
								} 
							},
							error : function(errs) {
								console.log(errs);
							}
						});	
					},
					insertAjaxData:function(pageDatas){
						if (pageDatas == null || pageDatas.length<=0) {
							pageIndex = -1;
							return;
						}
						var html='';
						$.each(pageDatas,function(i,d){
							html +='<li class="actli p-t-b-l">';
							html +='<div class="content">';
							html +='<div class="actlileft" style="right:160px">';
							html +='<a href="<%=basePath%>baobaohui/shop.do?id='+d.id+'">';
							html +='<h2 class="font-size-14">'+d.activityName+'</h2>';
							html +='<p>商品数量：<span class="redcolor">'+d.goodAcount+'</span></p>';
							html +='</a>';
							html +='</div>';
							html +='<div class="pull-right m-r-20">';
							html +='<p class="theicons">';
							html +='<a href="<%=basePath%>baobaohui/shop.do?id='+d.id+'" title="'+d.activityName+'" onclick="activity.GetQrcode(this)" class="m-l-0"><i class="icons-tcode"></i></a>|';
							html +='<a href="<%=basePath%>baobaohui/view.do?type=edit&id='+d.id+'"><i class="icons-write"></i></a>|';
							html +='<a onclick="activity.deleteA(this)" data-id="'+d.id+'" class="m-r-0" ><i class="icons-delete"></i></a>';
							html +='</p>';
							html +='<p><span>'+d.activityDate+'</span></p>';
							html +='</div>';
							html +='</div>';
							html +='</li>';
						});
						$("#allDetails").append(html);
					},
					saveA:function(){//增加一个活动
						var activityName =$("#activityName").val();
						$.ajax({
							type : "POST",
							url:"<%=basePath%>baobaohui/saveorupdate.do",
							dataType : "json",
							data:{
								activityName:activityName,
							},
							success:function(obj){
								//console.log(obj);
								//alert(JSON.stringify(obj));
								if(obj.code=="200"){
									activity.el.dialog( "close" );
									jAlert("会销活动创建成功,前往添加商品.","",function(){
										location.href="<%=basePath%>baobaohui/view.do?type=add&id="+obj.Id;
									});	
								}else{
									jAlert("会销活动创建失败","");
								}
								
							},
							error : function(errs) {
								console.log(errs);
							}
						});	
					},
					deleteA:function(obj){//删除一个活动
						var id=$(obj).data("id");
						jConfirm("您确定删除此会销活动？","",function(r){
							if(r){
								$.ajax({
									type : "POST",
									url:"<%=basePath%>baobaohui/delete.do",
										dataType : "json",
										data:{
											Id:id,
										},
										success:function(data){
											$(obj).closest('li').remove();
										},
										error : function(errs) {
											console.log(errs);
									}
								});	
							}
						});
				},
				GetQrcode:function(obj){ //打开二维码
					$("#dialog").dialog( "open" );
					var contents= obj.href; //$(obj).data('src');
					$("#qrcodetext").text(obj.title);
				    if($("canvas")){
				        $("canvas").remove();
				    }
				    jQuery('#qrcode').qrcode({
				    	render: 'canvas',
						text : contents,
					});
					var image = new Image(); 
					image.src = $("canvas")[0].toDataURL("image/png"); 
					$('#qrcodeimage').attr("src",image.src)
					event.preventDefault();
					$(".ui-widget-overlay").on('click',function(e){
						$("#dialog").dialog( "close" );
					});
				}
			};
		</script>

	</body>
</html>