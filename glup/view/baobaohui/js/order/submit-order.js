/**
 * 提交订单页面js
 * pmc
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
	//选取商品的记录id 从url中获取
	var basePath = $("body").attr("basepath"),
		recordId = getUrlParam("recordId");
	if (!recordId) {
		jAlert("路径错误,没有记录Id", "");
	}
	getDefaultAddrss(settle);

	//获得url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) {
			return unescape(r[2]);
		}
		return null; //返回参数值
	}

	//得到默认的收获地址
	function getDefaultAddrss(cb) {
		$.ajax({
			type: "post",
			url: basePath + "address/defaultaddress.do",
			async: true,
			data: {},
			dataType: "json",
			success: function(obj) {
				if (obj.code == 200) {
					if (obj.addr) {
						$("#namenadphone").html('<span class="name">' + obj.addr.contactName + '</span>' + obj.addr.contactPhone)
						$("#receiveaddr").text(obj.addr.address);
						$("#receiveaddrId").val(obj.addr.id);
						//点地址栏进入地址列表页面
						$("#defaultAddre").click(function() {
							location.href = basePath + "order/toaddresslist.do?recordId=" + recordId;
						});
						cb(obj.addr.areaId);
					} else {
						//点地址栏进入添加地址页面
						$("#defaultAddre").click(function() {
							location.href = basePath + "order/toeditaddress.do?recordId=" + recordId;
						})
						$("#defaultAddre").html('<span class="redcolor">您还没有添加收货地址,点此添加</span>');
						cb();
					}
				} else {
					jAlert("查询收获地址错误" + obj.msg, "");
				}
			}
		});
	};
	//结算开始 
	function settle(areaId) {
		$.ajax({
			type: "post",
			url: basePath + "baobaohui/settle.do",
			async: true,
			data: {
				settleId: recordId,
				areaId: areaId
			},
			dataType: "json",
			success: function(obj) {
				if (obj.code == 200) {
					if (obj.data && obj.data.goodsList && obj.data.goodsList.length > 0) {
						$("#totalAmount").text(obj.data.totalAmount);
						setGoodInfo(obj.data.goodsList);
					} else {
						jAlert("没有获取到结算数据!" + obj.msg, "");
					}
				} else {
					jAlert("获取结算数据错误!" + obj.msg, "");
				}
			}
		});
	}
	//设置商品信息
	function setGoodInfo(goodData) {
		$.each(goodData, function(i, good) {
			var goodItem = [];
			goodItem.push('<article class="productItem">');
			goodItem.push('	<a href="javascript:void(0);">');
			goodItem.push('		<div class="ppic"><img width="60" height="60" src="' + good.logoUrl + '"></div>');
			goodItem.push('		<div class="title">');
			goodItem.push('			<h3>' + good.goodsTitle + '</h3>');
			goodItem.push('			<span class="price"> ￥' + good.price + '</span>');
			goodItem.push('			<p><span class="floatRight">x ' + good.number + '</span></p>');
			goodItem.push('		</div>');
			goodItem.push('	</a>');
			goodItem.push('</article>');
			$("#goodlsit").append(goodItem.join(''));
		});
	};

	//点击提交订单
	$("#submitorder").click(function() {
		//检查数据 收获地址 记录Id 买家留言
		var sendData = {
			addrId: $("#receiveaddrId").val(),
			settleId: recordId,
			comment: $("#note").val()
		}
		if(!sendData.addrId){
			jAlert("请添加收货地址!","");
			return;
		}
		if(!sendData.settleId){
			jAlert("缺少结算id!","");
			return;
		}
		$.ajax({
			type: "post",
			url: basePath + "baobaohui/submitorder.do",
			async: true,
			data: sendData,
			success: function(obj) {
				if (obj.code == 200) {
					jAlert("提交成功!", "", function(r) {
						if (r) {
							location.href=basePath+"order/tomyallorder.do"
						}
					});
				} else {
					jAlert("提交失败" + obj.msg, "")
				}

			}
		});

	})

})