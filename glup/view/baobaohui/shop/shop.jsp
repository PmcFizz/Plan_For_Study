<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String id = request.getParameter("id");
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">
		<style>.actli .content:after{ border:none;}#hotlist .smQuantity{ display:none}</style>
	</head>
	<body>
		<header class="top-wrap top-bar-fixed">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-50 wrap-r-50">
				<h1 id="title"></h1>
			</div>
			<div class="pull-right">
				<a onclick="shareWinxin()"><i class="icons-sharegif"></i></a>
			</div>
		</header>
		<section class="middle-wrap p-b-50">	
			<div id="banner" class="slides-baner">
				<a href="#"><img src="<%=basePath%>baobaohui/images/banner0.jpg"  width="100%" /></a>
				<a href="#"><img src="<%=basePath%>baobaohui/images/banner0.jpg"  width="100%" /></a>
				<a href="#"><img src="<%=basePath%>baobaohui/images/banner0.jpg"  width="100%" /></a>
			</div>
			
			<div class="container" id="shopcontent">
				<p class="pline">本单商品</p>
				<ul class="bgcolor-255" id="shopcart">
					<div class="text-center p-t-20 p-b-20" id="please"><span class="font-size-14">请挑选商品</span></div>
				</ul>
				<p class="pline">本店热销</p>
				<ul class="hotlist bgcolor-255 m-b-10 clearfix" id="hotlist">
				</ul>
			</div>
			<div id="loadMore" class="loadingIcon"><i class="round-icon"></i> 正在加载...</div>
		</section>
		
		<footer class="bottom-wrap bottom-bar-fixed">
			<div class="bottom-ctrl">
				<span class="m-l-10">￥<span class="redcolor" id="total">0</span></span>
				<span>共<span class="redcolor" id="amount">0</span>件</span>
             	<button class="csnbtn csnbtn-danger floatRight w100 border-radius-0 mg-0" onclick="settlement()" style="height: 50px;">结算</button>
             </div>
		</footer>
		<div class="grayshade">
			<div style=" width: 60%; position:absolute; right: 25px; top: 5px;"><img src="<%=basePath%>baobaohui/images/shareweixin.png" width="100%" /></div>
		</div>
		
		<script src="<%=basePath%>baobaohui/js/jquery.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery.slides.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/browserDevice.js"></script>
		<script src="<%=basePath%>baobaohui/js/public.js"></script>
		<script>

				$(function(){
					getHotlist();
				});
				$(window).on("scroll",function(){
					var scrollTop = $(this).scrollTop();
					var windowHeight = $(this).height();
					var scrollHeight = $(document).height();
					if(scrollTop + windowHeight == scrollHeight){//滚动到最底部了
						if(pageIndex!=-1){//没有加载完成
							getHotlist();
						}
					} 			
				});
				var payTotal = 0;
		   		var pageIndex = 0;
		   		var pageSize  = 10;
				function getHotlist(){
					if(pageIndex==-1){ //已经加载完了
						return;
					}
					$.ajax({
						type : "POST",
						url:"<%=basePath%>goods/goodlist.do",
						dataType : "json",
						data:{
							pageIndex:pageIndex,
							pageSize:pageSize,
							activityId:'<%=id%>',
						},
						success:function(obj){
							console.log(obj);
							document.title=obj.shopName;
							$('#title').text(obj.shopName);
							 if(obj.code=="200"){
								if(obj.data.total == 0){
									if(pageIndex==0){//当前用户没有任何订单
										var nulldiv ='';
											 nulldiv ='<div class="text-center p-t-20 font-size-14" style="background-color: #efeff4;"><p><img src="<%=basePath%>baobaohui/images/hotnull.png" /></p><span class="nullword">暂时没有商品</span></div>';
										$("#hotlist").html(nulldiv);
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
									insertAjaxData(pageDatas);
								}
							} 
						},
						error : function(errs) {
							console.log(errs);
						}
					});	
				};	
				function insertAjaxData(pageDatas){
					if (pageDatas == null || pageDatas.length<=0) {
						pageIndex = -1;
						return;
					}
					var html='';
					$.each(pageDatas,function(i,d){
						html +='<li class="actli floatLeft wp49" onclick="appendCart(this)" data-id="'+d.specificationId+'">';
						html +='<div class="content">';	
						html +='<div class="pull-left">';	
						html +='<img src="<%=basePath%>file/image.do?id='+d.url+'" width="50" height="50">';	
						html +='</div>';	
						html +='<div class="actlileft actlipost postright">';	
						html +='<h2 class="font-size-14">'+d.goodName+'</h2>';	
						html +='<p>￥<span class="redcolor price" >'+d.price+'</span>	';	
						html +='<span class="Quantity smQuantity">';	
						html +='<a class="minus" onclick="minNum(this,'+d.price+')">-</a>';	
						html +='<input class="numval" type="number" name="goodsNumber" value="1" autocomplete="off" onblur="inputNum(this,'+d.price+')">';	
						html +='<a class="plus" onclick="addNum(this,'+d.price+')">+</a>';	
						html +='</span>';	
						html +='</p>';	
						html +='</div>';	
						html +='</div>';	
						html +='</li>';	
					});
					$("#hotlist").append(html);

				};
				
				function appendCart(obj){
					$("#please").hide();
					var flag=false;
					var va = $(obj).data('id');
					$('#shopcart li').each(function(){
						if($(this).data('id')==$(obj).data('id')){
							 flag=true;
							 return false;
						}else{
							 flag=false;
						}
					});
					if(flag){
						var valuen = $("#shopcart li[data-id="+va+"]").find('.numval').val();
						 $("#shopcart li[data-id="+va+"]").find('.numval').val(parseFloat(Number(valuen)+1));
						 checkAllAmount();
					}else{
						$("#shopcart").append($(obj).clone().removeAttr("onclick").removeClass("floatLeft").removeClass("wp49"));
						checkAllAmount();
					}
				}

		
				$(function(){
					checkAllAmount();
				});
				function setTotal(totalAmountFrom,amountNum){
					$("#total").html((totalAmountFrom.toFixed(2)));//toFixed()是保留小数点的函数很实用哦
					$("#amount").html(amountNum);
				}		
				function checkAllAmount(){
					var checkAllTotalAmount = 0;
					var checkAmount = 0;
					$('#shopcart li').each(function () {
				           var price = parseFloat($(this).find(".price").html());
				           var number = parseFloat($(this).find(".numval").val());
				           var goodsTotal = parseFloat(price) * parseInt(number);
				          checkAllTotalAmount += goodsTotal;
				          checkAmount +=number;     
				    });
					setTotal(checkAllTotalAmount,checkAmount);
				}

			//增加数量
			function addNum(obj,price){
				var number =parseInt($(obj).closest(".Quantity").find(".numval").val());
				$(obj).closest(".Quantity").find(".numval").val(number+1);
				//var number = parseInt($("#goodsNumber_"+goodsSpecificationId).val());
				//$("#goodsNumber_"+goodsSpecificationId).val(number+1);
				//var number = $("#goodsNumber_"+goodsSpecificationId).val();
				//var totalAmount = parseFloat($("#total").html()) + parseFloat(price);
				checkAllAmount();	
			}
			//减少数量
			function minNum(obj,price){
				var number =parseInt($(obj).closest(".Quantity").find(".numval").val());
				if($('#amount').text()=="1"){
					$('#please').show();
				}
				if(number<1||number==1){
					$(obj).closest("li").remove();
					checkAllAmount();	
					return;
				}
				$(obj).closest(".Quantity").find(".numval").val(number-1);
				checkAllAmount();	
			}
			
 			//输入数量
			function inputNum(obj,price){
				var number =parseInt($(obj).closest(".Quantity").find(".numval").val());
				if(number<1){
					if($('#shopcart li').size()=="1"){
						$('#please').show();
					}
					$(obj).closest("li").remove();
					checkAllAmount();	
					return;
				}
				
				checkAllAmount();
				
			} 

			
			//结算
			function settlement(){
				 var obj = {};
				$('#shopcart li').each(function() {
					var id = $(this).data('id');
					var number = $(this).find('.numval').eq(0).val();
					obj[id]=number;
				});
				var jsondata =JSON.stringify(obj);
				$.ajax({
					type : "POST",
					url:"<%=basePath%>baobaohui/preparesettle.do",
					dataType : "json",
					data:{
						postdata:jsondata,
					},
					success:function(obj){
						console.log(obj);
						if(obj.code=="200"){
							location.href="<%=basePath%>"+"order/tosubmitorder.do?recordId="+obj.data;
						}
					},
					error : function(errs) {
						console.log(errs);
					}
				});	

			}

			$(function(){
				$('#banner').slidesjs({
					width: 1078,
					height: 478,
					navigation: false,
					play: {
					   auto: true
					}
				});
				var swele = $(".slidesjs-pagination");
				var swelewidth = swele.width()/2 + "px";
				swele.css({ position: "absolute", right: "50%" , "margin-right": "-"+swelewidth });
			});
			
			function shareWinxin(){
				$('.grayshade').show();
				$('.grayshade').on('click',function(){
					$(this).hide();
				});
			};

		</script>
	</body>
</html>