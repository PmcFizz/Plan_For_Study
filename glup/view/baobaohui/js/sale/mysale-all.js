/**
 * 我的销售-全部
 */
require.config({
	paths: {
		"jquery": "../jquery.min",
		"jAlert": "../jquery.alerts",
		"weixinPayJS": "../order/weixinpay"
	},
	urlArgs: "v=" + (new Date()).getTime(),
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
require(['jquery', 'jAlert', 'weixinPayJS'], function($) {
	//使用location.replace() 方法打开顶部tab页 此方法不生产新的history
	$(".ordertab").click(function() {
		var replacehref = $(this).data("href");
		location.replace(replacehref);
	});

	var pageIndex = 1,
		pageSize = 5,
		basePath = $("body").attr("basePath");
	querySaleData();
	//查询全部销售数据
	function querySaleData() {
		$(".loadingIcon").show();
		$.ajax({
			type: "post",
			url: basePath + "order/sellorderlist.do",
			async: true,
			data: {
				pageIndex: pageIndex,
				pageSize: pageSize,
				status: 0
			},
			dataType: "json",
			success: function(obj) {
				$(".loadingIcon").hide();
				if (pageIndex == 1) {
					$("#orderlists").empty();
				}
				if (obj.code == 200 && obj.data) {
					$("#amuont").text(obj.data.amuont);
					$("#arrearsAmuont").text(obj.data.arrearsAmuont);
					$("#count").text(obj.data.count);

					if (obj.data.bOrderViewList.length > 0) {
						pageIndex = pageIndex + 1;
						setSaleList(obj.data);
					} else {
						setNoSaleData();
					}
				}
			}
		});
	};

	//设置订单数据
	function setSaleList(data) {

		$.each(data.bOrderViewList, function(i, doc) {
			var orderItem = [];
			//待支付金额
			//doc.arrearsAmuont
			var needPay = "欠款:&nbsp;" + doc.arrearsAmuont + "元";
			var imglist = getImgList(doc.url);
			var btnList = getBtnBystatusAndMonney(doc.status, doc.amount, doc.arrearsAmuont, doc.id, doc.deleteStatus);
			if (doc.deleteStatus == 1) {
				needPay = "买家已删除!"
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
	function setNoSaleData() {
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
	function getBtnBystatusAndMonney(orderStatus, amount, arrearsAmuont, orderId, deleteStatus) {
		var btnstr = "";
		if (!deleteStatus || deleteStatus != 1) {
			if (arrearsAmuont != 0) {
				btnstr = btnstr + '<a class="acc_upload huankuan" data-id="' + orderId + '">收 款</a>';
			}
			if (orderStatus == 1) {
				btnstr = btnstr + '<a class="acc_upload  send" data-id="' + orderId + '">发货</a>'
			}
		}
		if (orderStatus == 1 && arrearsAmuont == amount) {
			btnstr = btnstr + '<a class="acc_upload acc_color delorder" data-id="' + orderId + '">删 除</a>'
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
			querySaleData();
		}
	});

	//点击删除
	$(document).on("click", 'a.delorder', delSale);

	function delSale() {
		var delOrderId = $(this).data("id");
		jConfirm("是否删除该订单?", "", function(r) {
			if (r) {
				$.ajax({
					type: "post",
					url: basePath + "order/shopdeleterecord.do",
					async: true,
					dataType: "json",
					data: {
						orderId: delOrderId
					},
					success: function(obj) {
						if (obj.code == 200) {
							jAlert("删除成功!", "", function(r) {
								if (r) {
									pageIndex = 1;
									querySaleData();
								}
							})
						} else {
							jAlert("删除失败" + obj.msg, "")
						}
					},
					error: function(err) {}
				});
			}
		})
	};

	//点击发货
	$(document).on("click", 'a.send', send);

	function send() {
		var sendOrderId = $(this).data("id");
		jConfirm("是否确认发货?", "", function(r) {
			if (r) {
				$.ajax({
					type: "post",
					url: basePath + "order/confirmgoods.do",
					async: true,
					dataType: "json",
					data: {
						orderId: sendOrderId
					},
					success: function(obj) {
						if (obj.code == 200) {
							jAlert("发货成功!", "", function(r) {
								if (r) {
									pageIndex = 1;
									querySaleData();
								}
							})
						} else {
							jAlert("发货失败" + obj.msg, "")
						}
					},
					error: function(err) {}
				});
			}
		})
	}

	//点击收款
	$(document).on("click", 'a.huankuan', huankuan);

	function huankuan() {
		var hkOrderId = $(this).data("id");
		$("#revicePayOrderId").val(hkOrderId);
		showPayDialog();
	}

	$("#sureMoneyBtn").click(function() {
		hidePayDialog();
		var amount = $("#revicePayAmount").val();
		if (!amount) {
			jAlert("付款金额有误!", "");
			return;
		}
		if (isNaN(amount)) {
			jAlert("金额必须为数字", "");
			return;
		}
		jConfirm("请确认您已收到用户支付的现金?<br/>" + amount + "元<br/>确认后用户欠款将会冲抵对应的金额", "", function(r) {
			if (r) {
				$.ajax({
					type: "post",
					url: basePath + "order/gathering.do",
					async: true,
					dataType: "json",
					data: {
						orderId: $("#revicePayOrderId").val(),
						amount: amount
					},
					success: function(obj) {
						if (obj.code == 200) {
							pageIndex = 1;
							querySaleData();
						} else {
							jAlert("收款失败," + obj.msg, "");
						}

					},
					error: function(err) {}
				});
			}
		})

	})

})