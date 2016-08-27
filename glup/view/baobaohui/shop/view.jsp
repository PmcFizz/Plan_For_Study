<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String type = request.getParameter("type");
	String id = request.getParameter("id");
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>创建修改会销页面</title>
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/global.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/jquery-ui.css">
		<link rel="stylesheet" href="<%=basePath%>baobaohui/css/style.css">
		<style>.actli .content:after{ border:none;}</style>
	</head>
	<body>
		<header class="top-wrap top-bar-fixed" id="mainheader">
			<div class="pull-left"><a href="javascript:history.go(-1)"><i class="icons icons-back"></i></a></div>
			<div class="wrap-title wrap-l-50 wrap-r-50"><h1 id="title"></h1></div>
		</header>
	
		<div class="container p-t-50 p-b-50">

        	<ul class="suiform">
        		<li>
                	<div class="labip">
                		<div class="lab"><label><span class="redcolor">*</span>活动名称</label></div>
                        <div class="lip"><input type="text" id="activityname" value="" placeholder="请填写会销活动名称"/></div>
                    </div>
               </li>
            </ul>
            <ul class="sui-list"> 
                <li><a onclick="view.addGoods()"><span class="redcolor">*</span>创建商品</a></li>
            </ul>
            <ul class="bgcolor-255" id="hotlist">
			</ul>
    	</div>
    	
    	<footer class="bottom-wrap bottom-bar-fixed" >
    		<button class="csnbtn csnbtn-danger border-radius-0 mg-0" style="height: 50px;" onclick="view.updateActivity()">确定</button>
    	</footer>
    	
		
		<!--
        	作者：jshiport@126.com
        	时间：2016-06-20
        	描述：添加商品
        -->
		<div id="AddView" class="grayrows">
			<input type="hidden"  id="goodsid" />
			<header class="top-wrap top-bar-fixed" style="z-index: 1001;">
				<div class="pull-left"><a onclick="closeAddView()"><i class="icons icons-back"></i></a></div>
				<div class="wrap-title wrap-l-50 wrap-r-50"><h1>创建商品</h1></div>
			</header>
			<ul class="suiform p-t-50">
        		<li>
                	<div class="labip">
                		<div class="lab text-left"><label><span class="redcolor">*</span>名称</label></div>
                        <div class="lip"><input type="text" id="goodsname" placeholder="请填写商品名称"/></div>
                    </div>
                </li>
                <li>
                	<div class="labip">
                        <div class="lab text-left"><label><span class="redcolor">*</span><a href="#">零售价</a></label></div>
                        <div class="lip"><input type="text" id="goodsprice" placeholder="请填写商品售价"/></div>
                        <div class="lipele">元/件</div>
                    </div>
                </li>
            </ul>
            <p class="pline">商品图片（最多一张）:</p>
            <ul class="suiform">
            	<li class="p-r-10">
                	<dl class="clearfix">
		             	<dd>
		                    <figure style="background-image:url('<%=basePath%>baobaohui/images/makephoto.jpg')" id="chooseImage" >
		                    	 <input type="hidden"  id="picurlId" />
		                    	<!-- <input type="file" name="uploadFileInput" id="uploadFileInput"> -->
		                    </figure>
		                </dd>
		                <dd id="picul">
		                
		                </dd>
		             </dl>
               </li>
            </ul>
			<footer class="bottom-wrap bottom-bar-fixed">
	    		<p class="text-center">
	             	<button class="csnbtn csnbtn-default floatLeft wp50 border-radius-0 mg-0" style="height: 50px;" onclick="view.saveAdd()">完成</button>
	             	<button class="csnbtn csnbtn-danger  floatRight wp50 border-radius-0 mg-0" style="height: 50px;" onclick="view.forsaveAdd()">继续添加</button>
	             </p>
	    	</footer>
		</div>
		
		<!--
        	作者：jshiport@126.com
        	时间：2016-06-20
        	描述：修改商品
        -->
       <div id="ModifyView" class="grayrows">
       		<input type="hidden"  id="modifygoodsid" />
			<header class="top-wrap top-bar-fixed" style="z-index: 1001;">
				<div class="pull-left"><a onclick="closeAddView()"><i class="icons icons-back"></i></a></div>
				<div class="wrap-title wrap-l-50 wrap-r-50"><h1>修改商品</h1></div>
			</header>
			<ul class="suiform p-t-50">
        		<li>
                	<div class="labip">
                		<div class="lab text-left"><label><span class="redcolor">*</span>名称</label></div>
                        <div class="lip"><input type="text" id="modifygoodsname" placeholder="请填写商品名称"/></div>
                    </div>
                </li>
                <li>
                	<div class="labip">
                        <div class="lab text-left"><label><span class="redcolor">*</span><a href="#">零售价</a></label></div>
                        <div class="lip"><input type="number" id="modifygoodsprice" placeholder="请填写商品售价"/></div>
                        <div class="lipele">元/件</div>
                    </div>
                </li>
            </ul>
            <p class="pline">商品图片（最多一张）:</p>
            <ul class="suiform">
            	<li class="p-r-10">
                	<dl class="clearfix" >
		             	<dd>
		                    <figure style="background-image:url('<%=basePath%>baobaohui/images/makephoto.jpg')" id="updatechooseImage">
		                   		<input type="hidden"  id="modifypicurlId" />
		                    </figure>
		                </dd>
		                <dd id="modifypicul">
		                
		                </dd>
		             </dl>
               </li>
            </ul>
			<footer class="bottom-wrap bottom-bar-fixed">
	    		<p class="text-center">
	    			<button class="csnbtn csnbtn-danger border-radius-0 mg-0" style="height: 50px;" onclick="view.modifyGoods()">完成</button>
	             </p>
	    	</footer>
		</div>
    	
    	<div class="grayshade" id="loadMore"  style=" height:100%;">
			<div class="loadingIcon" style="display: block; color: #FFF; position: absolute; top: 50%; left: 50%; margin-top: -20px; margin-left: -50px;">
				<i class="round-icon"></i> 正在上传...
			</div>
		</div>
    	
		<script src="<%=basePath%>baobaohui/js/jquery.min.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery-ui.min.js"></script>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script src="<%=basePath%>baobaohui/js/browserDevice.js"></script>
		<script src="<%=basePath%>baobaohui/js/jquery.alerts.js"></script>
		<script src="<%=basePath%>baobaohui/js/public.js"></script>
		<script>
			if("<%=type%>"=='edit')	{
				document.title="编辑会销页面";
				$('#title').text("编辑会销页面");
			}else{
				document.title="添加会销页面";
				$('#title').text("添加会销页面");
			}
			
			$(function(){
				view.getHotlist();
			});
			$(window).on("scroll",function(){
				view.offsetScroll();
			});
			var payTotal = 0;
	   		var pageIndex = 0;
	   		var pageSize  = 10;
			var view={
					getHotlist:function(){
						if(pageIndex==-1){ //已经加载完了
							return;
						}
						$.ajax({
							type : "POST",
							url:"<%=basePath%>baobaohui/toupdate.do",
							dataType : "json",
							data:{
								pageIndex:pageIndex,
								pageSize:pageSize,
								activityId:'<%=id%>',
							},
							success:function(obj){
								 if(obj.code=="200"){
									$('#activityname').val(obj.entity.activityName);
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
										view.insertAjaxData(pageDatas);
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
							html +='<li class="actli">';
							html +='<div class="content">';
							html +='<div class="pull-left">';
							html +='<img src="<%=basePath%>file/image.do?id='+d.url+'" width="50" height="50" />';
							html +='</div>';
							html +='<div class="actlileft actlipost">';
							html +='<a>';
							html +='<h2 class="font-size-14">'+d.goodName+'</h2>';
							html +='<p>￥<span class="redcolor">'+d.price+'</span></p>';
							html +='</a>';
							html +='</div>';
							html +='<div class="pull-right">';
							html +='<p class="theicons">';
							html +='<a onclick="view.updateGoods(this)"  data-id="'+d.id+'" ><i class="icons-write"></i></a>|';
							html +='<a onclick="view.deleteGoods(this)" data-id="'+d.id+'" class="m-r-0"><i class="icons-delete"></i></a>';
							html +='</p>';
							html +='</div>';
							html +='</div>';
							html +='</li>';
						});
						$("#hotlist").append(html);
					},
					updateActivity:function(){
						var activityName =$("#activityname").val();
						$.ajax({
							type : "POST",
							url:"<%=basePath%>baobaohui/saveorupdate.do",
							dataType : "json",
							data:{
								Id:"<%=id%>",
								activityName:activityName,
							},
							success:function(obj){		
								console.log(obj);
								if(obj.code=="200"){
									jAlert("会销活动更新成功","",function(){
										location.href="<%=basePath%>baobaohui/index.do";
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
					offsetScroll:function(){//滚动条事件
						var scrollTop = $(this).scrollTop();
						var windowHeight = $(this).height();
						var scrollHeight = $(document).height();
						if(scrollTop + windowHeight == scrollHeight){//滚动到最底部了
							if(pageIndex!=-1){//没有加载完成
								activity.getlistA();
							}
						}
					},
					addGoods:function(){
						$("#AddView").show();
					},
					saveAdd:function(){ //完成添加
						var  title =$('#goodsname').val();
						var  logoid =$('#picurlId').val();
						var  price =parseFloat($('#goodsprice').val()).toFixed(2);
						if(title==''){  
					        jAlert('请输入商品名称','');
					        return;
					    }  
						 if(logoid==''){  
					        jAlert('您还没上传图片','');
					        return;
					    }  
						if(isNaN(price)){
							jAlert('请输入数字','');
					    	return;
						} 
						$.ajax({
							type : "POST",
							url:"<%=basePath%>goods/addorupdategood.do",
								dataType : "json",
								data:{
									activityId:"<%=id%>",
									title:title,
									logoId:logoid,
									price:price
								},
								success:function(data){
									if(data.code=='200'){
										jAlert('商品创建成功','',function(){
											location.href=location.href;
										});
									}else{
										jAlert('商品创建失败','');
									}
								},
								error : function(errs) {
									console.log(errs);
							}
						});	
					},
					forsaveAdd:function(){
						var  title =$('#goodsname').val();
						var  logoid =$('#picurlId').val();
						var  price =parseFloat($('#goodsprice').val()).toFixed(2);
						if(title==''){  
					        jAlert('请输入商品名称','');
					        return;
					    }  
						 if(logoid==''){  
					        jAlert('您还没上传图片','');
					        return;
					    }  
						if(isNaN(price)){
							jAlert('请输入数字','');
					    	return;
						}
						$.ajax({
							type : "POST",
							url:"<%=basePath%>goods/addorupdategood.do",
								dataType : "json",
								data:{
									activityId:"<%=id%>",
									title:title,
									logoId:logoid,
									price:price
								},
								success:function(data){
									if(data.code=='200'){
										jAlert('商品创建成功','',function(){
											$('#goodsname').val('');
											$('#picurlId').val('');
											$('#goodsprice').val('');
											$('#picul').html('');
										});
									}else{
										jAlert('商品创建失败','');
									}
								},
								error : function(errs) {
									console.log(errs);
							}
						});	
					},
					updateGoods:function(obj){ //显示要修改商品信息
						$('#modifypicul').html('');
						var id=$(obj).data("id");
						$.ajax({
							type : "POST",
							url:"<%=basePath%>goods/querygood.do",
								dataType : "json",
								data:{
									Id:id,
								},
								success:function(data){
									console.log(data);
									if(data.code=='200'){
										var modifypiculhtml='';
											  modifypiculhtml+='<span class="colse hid"><i class="icons icons-colse" onclick="deletePic(this)"></i></span>';
											  modifypiculhtml+='<figure class="addPic" id="'+data.data.url+'" style="background-image:url(<%=basePath%>file/image.do?id='+data.data.url+')"></figure>';
										$('#modifygoodsid').val(data.data.id);
										$('#modifygoodsname').val(data.data.goodName);
										$('#modifygoodsprice').val(data.data.goodPrice);
										$('#modifypicurlId').val(data.data.url);
										$('#modifypicul').html(modifypiculhtml);
									}else{
										jAlert(data.msg,'');
									}
								},
								error : function(errs) {
									console.log(errs);
							}
						});	
						$("#ModifyView").show();
					},
					modifyGoods:function(){//修改商品
						var  id =$('#modifygoodsid').val();
						var  title =$('#modifygoodsname').val();
						var  logoid =$('#modifypicurlId').val();
						var  price =$('#modifygoodsprice').val();
						$.ajax({
							type : "POST",
							url:"<%=basePath%>goods/addorupdategood.do",
								dataType : "json",
								data:{
									activityId:"<%=id%>",
									Id:id,
									title:title,
									logoId:logoid,
									price:price
								},
								success:function(data){
									if(data.code=='200'){
										jAlert('商品修改成功','',function(){
											location.href=location.href;
										});
									}else{
										jAlert('商品修改失败','');
									}
								},
								error : function(errs) {
									console.log(errs);
							}
						});	
					},
					deleteGoods:function(obj){//删除商品
						var id=$(obj).data("id");
						jConfirm("您确认要在该页面删除此商品？","",function(r){
							if(r){
								$.ajax({
									type : "POST",
									url:"<%=basePath%>goods/deletegood.do",
										dataType : "json",
										data:{
											goodId:id,
										},
										success:function(data){
											if(data.code=='200'){
												$(obj).closest('li').remove();
											}else{
												jAlert(data.msg,'');
											}	
										},
										error : function(errs) {
											console.log(errs);
									}
								});	
							}
						});
					},
				};

			wx.config({
				debug: false,
				appId:  '${appId}',
				timestamp: '${timestamp}',
				nonceStr: '${noncestr}',
				signature: '${signature}',
				jsApiList: [
					'checkJsApi',
					'chooseImage',
					'previewImage',
					'uploadImage',
					'downloadImage',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareQZone'
				]
			});
			wx.ready(function () {
				//图片接口 拍照、本地选图
				function selectImageFn(imageList,imageId){
					if($("#"+imageList).size()>2){
						jAlert("您只能上传一张图片!","");
						return;
					}
					wx.chooseImage({
						count: 1, // 默认9
						sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
						success: function (res) {
							// images.localId = res.localIds;
							//alert('已选择 ' + res.localIds.length + ' 张图片');
							var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							for (var i = 0; i<localIds.length; i++) {
								wx.uploadImage({
									localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
									isShowProgressTips: 1, // 默认为1，显示进度提示
									success: function (res) {
										//console.log("print:"+res);
										//alert("这是我的"+JSON.stringify(res));
										$('#loadMore').show();
										var serverId = res.serverId; // 返回图片的服务器端ID
											  //alert("这是我的serverId"+serverId);
										$.ajax({
											type : "POST",
											url:"<%=basePath%>file/uploadInWx.do",
											dataType : "json",
											data:{
												mediaId:serverId
											},
											success:function(obj){
												$('#loadMore').hide();
												//alert("这也是我的"+JSON.stringify(obj));
												 if(obj.code=="200"){
													var photoItem='';
														  photoItem+='<span class="colse hid"><i class="icons icons-colse" onclick="deletePic(this)"></i></span>';
														  photoItem+='<figure class="addPic" id="'+obj.data.fileId+'" style="background-image:url('+obj.data.fileUrl+')"></figure>';
													$("#"+imageId).val(obj.data.fileId);
													$("#"+imageList).html(photoItem);
												}else{
													jAlert(obj.msg,'');
												}
											},
											error : function(errs) {
												console.log(errs);
											}
										});
									}
								});
							};
						}
					});
				};
				
				// 分享到朋友圈
				wx.onMenuShareTimeline({
				    title: '新农宝，让农民用指尖联通世界！', // 分享标题
				    link: 'http://m.51xnb.cn', // 分享链接
				    imgUrl: '<%=basePath%>baobaohui/images/logo_for_share.png', // 分享图标
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
				
				// 分享给朋友
				wx.onMenuShareAppMessage({
				    title: '新农宝，让农民用指尖联通世界！', // 分享标题
				    desc: '农所需，我所为', // 分享描述
				    link: 'http://m.51xnb.cn', // 分享链接
				    imgUrl: '<%=basePath%>baobaohui/images/logo_for_share.png', // 分享图标
				    type: '', // 分享类型,music、video或link，不填默认为link
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
				
				// 分享到QQ
				wx.onMenuShareQQ({
				    title: '新农宝，让农民用指尖联通世界！', // 分享标题
				    desc: '农所需，我所为', // 分享描述
				    link: 'http://m.51xnb.cn', // 分享链接
				    imgUrl: '<%=basePath%>baobaohui/images/logo_for_share.png', // 分享图标
				    success: function () { 
				       // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				       // 用户取消分享后执行的回调函数
				    }
				});
				// 分享到qq空间
				wx.onMenuShareQZone({
				    title: '新农宝，让农民用指尖联通世界！', // 分享标题
				    desc: '农所需，我所为', // 分享描述
				    link: 'http://m.51xnb.cn', // 分享链接
				    imgUrl: '<%=basePath%>baobaohui/images/logo_for_share.png', // 分享图标
				    success: function () { 
				       // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});

				
				document.querySelector('#chooseImage').onclick = function (){
					selectImageFn('picul','picurlId');
				};
				document.querySelector('#updatechooseImage').onclick = function (){
					selectImageFn('modifypicul','modifypicurlId');
				};
				
			
			});
			wx.error(function (res) {
				alert(res.errMsg);
			});
			
			function deletePic(obj){ //删除图片
				$(obj).closest('dd').html('');
				$("#picurlId").val('');
				$("#modifypicurlId").val('');
			}

			$('#uploadFileInput').on('click',function(){
				$('#buttonUpload').show();
				$('#buttonCloses').show();
			});	
			$('#buttonCloses').on('click',function(){
				$('#buttonUpload').hide();
				$('#buttonCloses').hide();
			});	
			function closeAddView(){
           		$("#AddView").hide();
           		$("#ModifyView").hide();
           	}
           
		</script>
	</body>
</html>
