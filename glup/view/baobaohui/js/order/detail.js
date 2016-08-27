/**
 * 订单详情
 */
require.config({
	paths: {
		"jquery": "../jquery.min",
		"jAlert": "../jquery.alerts",
	},
	shim: {
		'jAlert': {
			deps: ['jquery']
		}
	}
});
require(['jquery', 'jAlert'], function($) {
	//获取url中的orderId
	/**
	 * urlParams url中的参数对象
	 * orderId从url中解析的订单Id
	 * 
	 */
	var urlParams = {},
		orderId, search = location.search,
		basePath = $("body").attr("basepath");

	if (search.indexOf("?") == 0 && search.indexOf("=") > -1) {
		search = search.substring(1);
		var strs = search.split("&");
		for (var i = 0; i < strs.length; i++) {
			var tempArr = strs[i].split("=");
			if (tempArr[1].indexOf("#") > -1) {
				tempArr[1] = tempArr[1].replace("#", "");
			}
			urlParams[tempArr[0]] = tempArr[1];
		}
	}
	if (!urlParams.orderId) {
		jAlert("没有orderId", "", function(r) {
			if (r) {
				jAlert("真的没有orderId", "");
			}
		})
	} else {
		orderId = urlParams.orderId
	}
	//请求订单数据
	$.ajax({
		type: "post",
		url: basePath + "order/orderdetail.do",
		async: true,
		dataType: "json",
		data: {
			orderId: orderId
		},
		success: function(obj) {
			if (obj.code && obj.code == 200) {
				if (obj.data) {
					//订单详情
					$("#orderstate").text(obj.data.statusDesc);
					$("#ordercode").text("订单编号:"+obj.data.orderCode);
					$("#amuont").html('<a href="javascript:void(0);">应收:&nbsp; ' + obj.data.amuont + '元</a>');
					$("#repayAmuont").html('<a href="javascript:void(0);">已收:&nbsp; ' + obj.data.repayAmuont + '元</a>');
					$("#arrearsAmuont").html('<a href="javascript:void(0);">欠款:&nbsp; ' + obj.data.arrearsAmuont + '元</a>');
					$("#nameandphone").html('<span class="name">' + obj.data.consigneeName + '</span>' + obj.data.consigneePhone)
					$("#deliveryAddress").text(obj.data.deliveryAddress);
					$("#comments").text(obj.data.comments);
					$("#shifu").text("¥ "+obj.data.repayAmuont);
					//订单商品
					if (obj.data.goodsOrderViewLIstanbul && obj.data.goodsOrderViewLIstanbul.length > 0) {
						$.each(obj.data.goodsOrderViewLIstanbul, function(i,doc) {
							var newLi = [];
							newLi.push('<article class="productItem">');
							newLi.push('	<a href="javascript:void(0);">');
							newLi.push('    	<div class="ppic"><img width="60" height="60" src="'+doc.url+'"></div>');
							newLi.push('		<div class="title">');
							newLi.push('        	<h3>' + doc.title + '</h3>');
							newLi.push('			<span class="price"> ￥' + doc.price + '</span>');
							newLi.push('			<p><span class="floatRight">x ' + doc.number + '</span></p>');
							newLi.push('		</div>');
							newLi.push('	</a>');
							newLi.push('</article>');
							$("#goodlist").append(newLi.join(""));
						});
					}
				} else {
					jAlert("没有查询到数据", "");
				}
			} else {
				jAlert("查询订单详情500", "");
			}
		},
		error: function(err) {}
	});

})