/**
 * 我的订单-已发货
 */

require.config({
	paths: {
		"jquery": "../jquery.min",
		"jAlert": "../jquery.alerts",
		"weixinPayJS":"weixinpay"
	},
	urlArgs: "v=" +  (new Date()).getTime(),
	shim: {
		'jAlert': {
			deps: ['jquery']
		}
	}
});
//status:1是未发货;2是已发货 ;0是全部
//deleteStatus 
//1 买家删除
//2 卖家删除
//3 双方都删除
require(['jquery', 'jAlert','weixinPayJS'], function($) {
	//使用location.replace() 方法打开顶部tab页 此方法不生产新的history
	$(".ordertab").click(function(){
		var replacehref=$(this).data("href");
		location.replace(replacehref);
	});
	
	var pageIndex = 1,
		pageSize = 5,
		basePath = $("body").attr("basePath");
	queryOrderData();
	//查询全部订单数据
	function queryOrderData() {
		$(".loadingIcon").show();
		$.ajax({
			type: "post",
			url: basePath + "order/orderlist.do",
			async: true,
			data: {
				pageIndex: pageIndex,
				pageSize: pageSize,
				status: 2
			},
			dataType: "json",
			success: function(obj) {
				$(".loadingIcon").hide();
				if(pageIndex==1){
					$("#orderlists").empty();
				}
				if (obj.code == 200 && obj.data) {
					if (obj.data.length > 0) {
						pageIndex = pageIndex + 1;
						setOrderList(obj.data);
					} else {
						setNoOrderData();
					}
				}
			}
		});
	};

	//设置订单数据
	function setOrderList(data) {
		$.each(data, function(i, doc) {
			var orderItem = [];
			//待支付金额
			//doc.arrearsAmuont
			var needPay = "待支付金额:&nbsp;" + doc.arrearsAmuont + "元";
			var imglist = getImgList(doc.url);
			var btnList = getBtnBystatusAndMonney(doc.status, doc.amount, doc.arrearsAmuont,doc.id,doc.deleteStatus);
			if (doc.deleteStatus == 2) {
				needPay = "卖家已删除改订单"
			}
			orderItem.push('<li class="articleItem">');
			orderItem.push('	<div class="articleheader">');
			orderItem.push('		<h2>' + doc.statusDesc + '<span>' + needPay + '</span></h2>');
			orderItem.push('	</div>');
			orderItem.push('	<div class="articlecon">');
			orderItem.push('		<a href="' + basePath + 'order/todetail.do?orderId=' + doc.id + '">');
			orderItem.push('			<div class="piclist">' + imglist + '</div>');
			orderItem.push('			<i class="pointRight pRother"></i>');
			orderItem.push('			<span class="time">' + doc.createDate + '</span>');
			orderItem.push('		</a>');
			orderItem.push('	</div>');
			orderItem.push('	<div class="articlefooter clearfix"><span>应收:&nbsp;<span class="colr">¥' + doc.amount + '</span></span><br>');
			orderItem.push(btnList);
			orderItem.push('    </div>');
			orderItem.push('</li>');
			$("#orderlists").append(orderItem.join(''));
		});
	};
	//没有数据时的处理函数
	function setNoOrderData() {
		if (pageIndex == 1) {
			var str = '';
			str = str + '<div class="nullCon">';
			str = str + '	<p class="picbg">';
			str = str + '		<i class="orderdata-null" style=""></i>';
			str = str + '	</p>';
			str = str + '	<p><span class="nullword">暂时没有相关的订单</span></p>';
			str = str + '</div>';
			$("#orderlists").append(str);
		} else {
			if ($("#nomore", $("#orderlists")).length > 0) {
				return;
			}
			$("#orderlists").append('<p id="nomore" style="text-align: center;">没有更多的数据了</p>');

		}

	};
	//处理商品图片 最多显示三张
	function getImgList(imgurlList) {
		var img = "";
		if (imgurlList && imgurlList.length > 0) {
			for (var i = 0; i < imgurlList.length; i++) {
				if (i < 3) {
					img = img + '<img width="60" height="60" style="margin-left: 2px;" src="' + imgurlList[i] + '">'
				}
			}
		}
		return img;
	};
	/**
	 * 
	 * @param {Object} orderStatus 订单状态
	 * @param {Object} amount 订单总金额
	 * @param {Object} arrearsAmuont 待支付金额
	 */
	function getBtnBystatusAndMonney(orderStatus, amount, arrearsAmuont,orderId,deleteStatus) {
		var btnstr = "";
		if (arrearsAmuont != 0) {
			//当卖家没删除订单 或没有删除订单状态 就显示还款
			if(!deleteStatus || deleteStatus !=2){
				btnstr = btnstr + '<a class="acc_upload huankuan" data-id="' + orderId + '">付款</a>';	
			}
		}
		//已发货没有删除按钮
		if (orderStatus == 1 && arrearsAmuont == amount) {
			btnstr = btnstr + '<a class="acc_upload acc_color" data-id="' + orderId + '">删 除</a>'
		}
		return btnstr;
	};
	/**
	 * 页面滑动到底部的处理函数
	 */
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		var windowHeight = $(this).height();
		var scrollHeight = $(document).height();
		if (scrollTop + windowHeight == scrollHeight) { //滚动到最底部了
			queryOrderData();
		}
	});

	//点击删除
	$(document).on("click", 'a.delorder', delOrder);

	function delOrder() {
		var delOrderId = $(this).data("id");
		jConfirm("是否删除该订单?", "", function(r) {
			if (r) {
				$.ajax({
					type: "post",
					url: basePath + "order/userdeleterecord.do",
					async: true,
					dataType: "json",
					data: {
						orderId: delOrderId
					},
					success: function(obj) {
						pageIndex = 1;
						queryOrderData();
					},
					error: function(err) {}
				});
			}
		})
	};

	//点击还款
	$(document).on("click", 'a.huankuan', huankuan);

	function huankuan() {
		showPayDialog();
		var hkOrderId = $(this).data("id");
		$("#payOrderId").val(hkOrderId);
	}
	//确认付款
	$("#surePayBtn").click(function(){
		var hkOrderId,amount;
		amount=$("#orderPayAmount").val();
		hkOrderId=$("#payOrderId").val();
		if(!amount || !hkOrderId){
			jAlert("金额有误或没有订单id","");
			return;
		}
		if(isNaN(amount)){
			jAlert("金额必须为数字","");
			return;
		}
		$.ajax({
			type: "post",
			url: basePath + "baobaohui/repay.do",
			async: true,
			dataType: "json",
			data: {
				orderId: hkOrderId,
				amount:amount
			},
			success: function(obj) {
				if(obj.code==200 && obj.data && obj.payCode){
					hidePayDialog();
					pageIndex = 1;
					statrPay(obj.data,queryOrderData,obj.payCode);
				}else{
					jAlert(obj.msg,"");
				}
				//pageIndex = 1;
				//queryOrderData();
			},
			error: function(err) {}
		});
	})
	

})