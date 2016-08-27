/**
 * 订单列表
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
	var basePath = $("body").attr("basepath");
	//请求收货地址列表
	queryReceiveAddrs();

	function queryReceiveAddrs() {
		$(".nowloading").show();
		$.ajax({
			type: "post",
			url: basePath + "address/addresslist.do",
			dataType: "json",
			async: true,
			success: function(obj) {
				$(".nowloading").hide();
				$("#address-list").empty();
				if (obj && obj.code == 200) {
					if (obj.data && obj.data.length > 0) {
						$.each(obj.data, function(i, doc) {
							var additem = [];
							additem.push('<div class="rows">');
							additem.push('	<div class="rowsCon addressitem"  style="position:relative;">');
							additem.push('		<a class="change setdefault" data-id="' + doc.id + '" href="javascript:void(0);">');
							additem.push('			<p><span class="name">' + doc.contactName + '</span>' + doc.contactPhone + '</p>');
							additem.push('			<p style="margin-right:70px; font-size:13px;">' + doc.address + '</p>');
							additem.push('		</a>');
							additem.push('		<div class="modidelcon">');
							additem.push('			<a href="' + basePath + 'order/toeditaddress.do?id=' + doc.id + '" data-id="' + doc.id + '" class="floatLeft modi change"></a>');
							additem.push('			<a class="floatLeft line"></a>');
							additem.push('			<a href="javascript:void(0);" data-id="' + doc.id + '"  class="floatLeft del change"></a>');
							additem.push('		</div>');
							if (doc.isDefault == 1) {
								additem.push('	<i class="selectrightbtn yes"></i>');
							} else {
								additem.push('	<i class="selectrightbtn"></i>');
							}
							additem.push('	</div>');
							additem.push('</div>');
							$("#address-list").append(additem.join(''));
						});
					} else {
						var nobank = ""
						nobank = nobank + ' <div class="nullCon">';
						nobank = nobank + '<p class="picbg"><i class="yhjicon" style="background: url(../me/images/noadd.png );background-size: 106%;margin-right: 0px;margin-top: 17px;height: 86px;"></i></p>'
						nobank = nobank + '<p><span class="nullword">暂时没有收货地址</span></p>'
						nobank = nobank + '</div>'
						$("#address-list").append(nobank);
					}
				} else {
					jAlert("查询地址错误", "");
				}
			},
			error: function() {
				$(".nowloading").hide();
			}
		});
	}
	//删除按钮处理
	$(document).on("click", 'a.del.change', delAddress);

	function delAddress() {
		var receiveAddrId = $(this).data("id");
		jConfirm("确认删除该收货地址", "", function(r) {
			if (r) {
				event.stopPropagation();
				$.ajax({
					type: "post",
					url: basePath + "address/reomoveaddress.do",
					async: true,
					dataType: "json",
					data: {
						receiveAddrId: receiveAddrId
					},
					success: function(obj) {
						if (obj.code == 200) {
							jAlert("删除成功!", "")
							queryReceiveAddrs();
						} else {
							jAlert("删除失败!", "")
						}
					},
					error: function(err) {}
				});
			}
		})
	}
	//设置默认处理
	$(document).on("click", 'a.setdefault', setDefAddre);

	function setDefAddre() {
		var receiveAddrId = $(this).data("id");
		event.stopPropagation();
		$.ajax({
			type: "post",
			url: basePath + "address/setReceiveAddrDefault.do",
			async: true,
			dataType: "json",
			data: {
				receiveAddrId: receiveAddrId
			},
			success: function(obj) {
				history.go(-1);
			},
			error: function(err) {}
		});
	}
})