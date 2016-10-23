/**
 * 用户管理
 */
(function() {
	var basePath = common.getRootPath();
	var sourcePath = $("body").data("sourcepath");
	var userTable, userRoleTable;
	var handleUserId = ''; //正在处理的用户id
	var handleUserPhone = ''; //正在处理的用书手机号
	var handleUserRoleId = ""; //正在处理的用户与角色id

	//分页查询用户
	function queryUserByPage() {
		var userTable = $("#usertable").dataTable({
			"language": {
				url: basePath + "Chinese.json",
			},
			"serverSide": true,
			"searching": false,
			"paging": true,
			"bLengthChange": false,
			"bStateSave": false,
			"bSort": false,
			"bProcessing": true,
			"ajax": {
				"url": basePath + "user/dolist.do",
				"type": "post",
				"data": function(d) {
					d.searchKey = $("#searchUserKey").val().trim()
				}
			},
			"columns": [{
				"data": "phoneNumber"
			}, {
				"data": "realName"
			}, {
				"data": "networkName"
			}, {
				"data": "nationalidNumber"
			}, {
				"data": "imei"
			}, {
				"data": "address"
			}, {
				"data": "area"
			}, {
				"data": "userId",
				"fnCreatedCell": function(nTd, oData, oData) {
					var content = "<button type='button' class='btn btn-outline btn-info J_seeUserRole' data-phoneno='" + oData.phoneNumber + "' data-userid='" + oData.userId + "' )'>用户角色</button>";
					$(nTd).html(content);
				}
			}]
		})
	};

	//刷新用户列表
	function reloadUserTable() {
		$("#usertable").DataTable().page('first').draw(false);
	};

	//点击搜索
	$("#reloadusertable").click(function() {
		reloadUserTable();
	});

	//输入框Enter搜索
	$(".J_keysearch").keydown(function(even) {
		if(even.keyCode == "13") {
			reloadUserTable();
		}
	});

	//点击用户角色按钮
	$(document).on("click", ".J_seeUserRole", function(even) {
		var userId = $(even.target).data("userid");
		var phoneno = $(even.target).data("phoneno");
		handleUserId = userId;
		handleUserPhone = phoneno
		$("#userRoleDialog").modal({
			backdrop: "static"
		});
		getUserRoleList();
	});

	//获取用户的角色列表
	function getUserRoleList() {
		if(common.isEmpty(handleUserId)) {
			swal("操作错误", "没有操作用户id", "error");
			return;
		}
		if(common.isEmpty(handleUserPhone)) {
			swal("操作错误", "没有操作用户手机号", "error");
			return;
		}
		$.ajax({
			type: "post",
			url: basePath + "user/queryRole.do",
			data: {
				userId: handleUserId,
				phoneNumber: handleUserPhone
			},
			dataType: "json",
			success: function(res) {
				if(res.code == 200) {
					if(res.data && res.data.length > 0) {
						setUserRoleTable(res.data);
					} else {
						$("#userroletbody").html('<tr><td colspan="5">暂无数据</td></tr>');
					}
				} else {
					swal("查询出错", res.msg, "error");
				}
			},
			error: function(eror) {}
		});
	}

	//组装用户角色列表
	function setUserRoleTable(data) {
		var rolehtml = [];
		for(var i = 0, len = data.length; i < len; i++) {
			var item = data[i];
			rolehtml.push('<tr>');
			rolehtml.push('<td>' + item.phoneNumber + '</td>');
			rolehtml.push('<td>' + item.roleName + '</td>');
			rolehtml.push(setDom(item));
			rolehtml.push('</tr>');
		}
		$("#userroletbody").html(rolehtml.join(''));

		function setDom(item) {
			var str = '';
			var canEdit = item.canEdit;
			str = str + '<td>';
			if(canEdit) {
				str = str + '<img class="add_area_img J_addUserArea" data-lid="' + item.userRoleId + '" src="' + sourcePath + '/manager/img/btn_add.png" >';
			}
			if(item.ystRoleLinkAreaList && item.ystRoleLinkAreaList.length > 0) {
				for(var i = 0, len = item.ystRoleLinkAreaList.length; i < len; i++) {
					var areaItem = item.ystRoleLinkAreaList[i];
					var img = '';
					if(canEdit) {
						img = '<img class="del_area_img J_delUserArea" data-lid="' + areaItem.lid + '" src="' + sourcePath + '/manager/img/btn_del.png" >';
					}
					str = str + '<span style="padding:5px" >' + areaItem.fullAreaName + '' + img + '</span>';
				}
			}
			str = str + '</td>';
			str = str + '<td>';
			if(canEdit) {
				str = str + '<img class="add_area_img J_addUserShop" data-lid="' + item.userRoleId + '" src="' + sourcePath + '/manager/img/btn_add.png" >';
			}
			if(item.tYstRoleLinkShop && item.tYstRoleLinkShop.length > 0) {
				for(var i = 0, len = item.tYstRoleLinkShop.length; i < len; i++) {
					var shopItem = item.tYstRoleLinkShop[i];
					var img = '';
					if(canEdit) {
						img = '<img class="del_area_img J_delUserShop" data-lid="' + shopItem.lid + '" src="' + sourcePath + '/manager/img/btn_del.png" >';
					}
					str = str + '<span style="padding:5px" >' + shopItem.shopName + '' + img + '</span>';
				}
			}
			str = str + '</td>';
			var btn = '';
			if(canEdit) {
				btn = "<button type='button' class='btn  btn-outline btn-danger J_delUserRole' data-lid='" + item.userRoleId + "' >删除</button>";
			}
			str = str + "<td>" + btn + "</td>";
			return str;
		};
	};

	//点击删除有效区域
	$(document).on("click", ".J_delUserArea", function(even) {
		var $target = $(even.target);
		var lid = $target.data("lid");
		$.ajax({
			type: "post",
			url: basePath + "user/deleteRoleArea.do",
			data: {
				lid: lid
			},
			dataType: "json",
			success: function(res) {
				if(res.code == 200) {
					swal({
						title: "",
						text: "删除成功!",
						timer: 1000,
						showConfirmButton: false
					})
					$target.parent().remove();
				} else {
					swal("删除错误!", "", "error");
				}
			},
			error: function(error) {}
		});
	});

	//点击删除商铺
	$(document).on("click", ".J_delUserShop", function(even) {
		var $target = $(even.target);
		var lid = $target.data("lid");
		$.ajax({
			type: "post",
			url: basePath + "user/deleteRoleShop.do",
			data: {
				lid: lid
			},
			dataType: "json",
			success: function(res) {
				if(res.code == 200) {
					swal({
						title: "",
						text: "删除成功!",
						timer: 1000,
						showConfirmButton: false
					})
					$target.parent().remove();
				} else {
					swal("删除错误!", "", "error");
				}
			},
			error: function(error) {}
		});
	});

	//点击用户角色删除按钮
	$(document).on("click", ".J_delUserRole", function(even) {
		var $target = $(even.target);
		var userroleid = $target.data("lid");
		$.ajax({
			type: "post",
			url: basePath + "user/deleteRole.do",
			data: {
				userRoleId: userroleid,
				userId: handleUserId
			},
			dataType: "json",
			success: function(res) {
				if(res.code == 200) {
					swal({
						title: "",
						text: "删除成功!",
						timer: 1000,
						showConfirmButton: false
					})
					$target.parents("tr").remove();
				} else {
					swal("删除错误!", "", "error");
				}
			},
			error: function(error) {}
		});
	});

	//点击新增角色 弹出角色模态框
	$("#adduserrolebtn").click(function() {
		$("#havaselrole").empty();
		$("#searchreolename").val("");
		$("#addRoledialog").modal({
			backdrop: "static"
		});
		if($.fn.dataTable.isDataTable("#roletable")) {
			var ta = $("#roletable").DataTable()
			ta.destroy();
		}
		$("#roletable").DataTable({
			"language": {
				"url": basePath + "Chinese.json"
			},
			"serverSide": true,
			"paging": true,
			"bLengthChange": false,
			"bStateSave": false,
			"bSort": false,
			"searching": false,
			"ajax": {
				url: basePath + "role/queryRole.do",
				type: "post",
				data: function(d) {
					d.searchKey = $("#searchreolename").val();
					d.authType = 10;
					d.state = 0;
				}
			},
			"columns": [{
					"data": "id",
					"fnCreatedCell": function(nTd, sData, oData) {
						var checkBox = '<input name="" type="checkbox" class="J_rolecheckbox" data-rolename="' + oData.name + '" data-roleid="' + oData.id + '" />';
						$(nTd).html(checkBox);
					}
				}, {
					"data": "name",
				}]
				//TODO 选中当页的checkbox
		})
	});

	//搜索角色
	$("#searchallrole").click(function() {
		$("#roletable").DataTable().page('first').draw(false);
	});

	//Enter键搜素角色
	$("#searchreolename").keydown(function(even) {
		if(even.keyCode == "13") {
			$("#searchallrole").click();
		}
	});

	//点击角色checkbox
	$(document).on("click", ".J_rolecheckbox", function(even) {
		var $target = $(even.target);
		var roleId = $target.data("roleid");
		var roleaName = $target.data("rolename");
		if($target.is(":checked")) {
			$("#havaselrole").append('<span class="item" ><span class="value">' + roleaName + '</span><i class="fa fa-times-circle iclose J_delSelRole" data-rolename="' + roleaName + '" data-roleid="' + roleId + '"></i></span>');
		} else {
			$("#havaselrole").find("[data-roleid='" + roleId + "']").click();
		}
	});

	//删除已选的角色
	$(document).on("click", ".J_delSelRole", function(even) {
		var $target = $(even.target);
		var roleId = $target.data("roleid");
		$target.parent().remove();
		$("input[data-roleid='" + roleId + "']").removeAttr("checked");
	});

	//将所选的角色添加到用户角色里
	$("#confirmaddrole").click(function(even) {
		var roledivlist = $("#havaselrole").find("[data-roleid]");
		var selRoleid = '';
		for(var i = roledivlist.length; i--;) {
			selRoleid = selRoleid + "," + $(roledivlist[i]).data("roleid");
		}
		selRoleid = selRoleid.substr(1);
		if(common.isEmpty(selRoleid)) {
			swal("操作错误", "请选选择角色在添加", "error");
			return;
		}
		$.ajax({
			type: "post",
			url: basePath + "user/addRoles.do",
			data: {
				userId: handleUserId,
				roleIds: selRoleid
			},
			dataType: "json",
			success: function(res) {
				if(res.code == 200) {
					swal({
						title: '',
						text: "操作成功!",
						timer: 1000,
						showConfirmButton: false
					});
					$("#addRoledialog").modal("hide");
					getUserRoleList();
				} else {
					swal("", res.msg, "error");
				}
			}
		});
	});

	//点击添加用户商铺
	$(document).on("click", ".J_addUserShop", function(even) {
		$("#havaselshop").empty();
		$("#searchshopname").val("");
		handleUserRoleId = $(even.target).data("lid");
		$("#addShopDialog").modal({
			backdrop: "static"
		});
		if($.fn.dataTable.isDataTable("#shoptable")) {
			var ta = $("#shoptable").DataTable()
			ta.destroy();
		}
		$("#shoptable").DataTable({
			"language": {
				"url": basePath + "Chinese.json"
			},
			"serverSide": true,
			"paging": true,
			"bLengthChange": false,
			"bStateSave": false,
			"bSort": false,
			"searching": false,
			"ajax": {
				url: basePath + "shop/queryShopPageByName.do",
				type: "post",
				data: function(d) {
					d.shopName = $("#searchshopname").val();
				}
			},
			"columns": [{
					"data": "shopId",
					"fnCreatedCell": function(nTd, sData, oData) {
						var checkBox = '<input name="" type="checkbox" class="J_shopcheckbox" data-shopname="' + oData.shopName + '" data-shopid="' + oData.shopId + '" />';
						$(nTd).html(checkBox);
					}
				}, {
					"data": "shopName",
					"fnCreatedCell": function(nTd, sData, oData) {
						var str = '';
						var imgpath='';
						if(oData.shopCustomType==1){
							imgpath='/img/shang.png';
						}else if(oData.shopCustomType==2){
							imgpath='/img/yun.png';
						}
						str = str + '<img src="' + sourcePath + '/manager'+imgpath+'" height="50px" width="50px" >' + oData.shopName;
						$(nTd).html(str);
					}
				}]
				//TODO 选中当页的checkbox
		})
	});

	//点击搜索所有店铺
	$("#searchallshop").click(function() {
		$("#shoptable").DataTable().page('first').draw(false);
	});

	//Enter键搜素店铺
	$("#searchshopname").keydown(function(even) {
		if(even.keyCode == "13") {
			$("#searchallshop").click();
		}
	});

	//点击店铺checkbox
	$(document).on("click", ".J_shopcheckbox", function(even) {
		var $target = $(even.target);
		var shopId = $target.data("shopid");
		var shopName = $target.data("shopname");
		if($target.is(":checked")) {
			$("#havaselshop").append('<span class="item" ><span class="value">' + shopName + '</span><i class="fa fa-times-circle iclose J_delSelShop" data-shopname="' + shopName + '" data-shopid="' + shopId + '"></i></span>');
		} else {
			$("#havaselshop").find("[data-shopid='" + shopId + "']").click();
		}
	});

	//删除已选的店铺
	$(document).on("click", ".J_delSelShop", function(even) {
		var $target = $(even.target);
		var shopId = $target.data("shopid");
		$target.parent().remove();
		$("input[data-shopid='" + shopId + "']").removeAttr("checked");
	});

	//保存选择的店铺到用户角色列表里
	$("#saveshopbtn").click(function() {
		var shopdivlist = $("#havaselshop").find("[data-shopid]");
		var selShopid = '';
		for(var i = shopdivlist.length; i--;) {
			selShopid = selShopid + "," + $(shopdivlist[i]).data("shopid");
		}
		selShopid = selShopid.substr(1);
		if(common.isEmpty(selShopid)) {
			swal("操作错误", "请选选择角色在添加", "error");
			return;
		}
		$.ajax({
			type: "post",
			url: basePath + "user/addRoleLinkShops.do",
			data: {
				userRoleId: handleUserRoleId,
				shopIds: selShopid
			},
			dataType: "json",
			success: function(res) {
				if(res.code == 200) {
					swal({
						title: '',
						text: "操作成功!",
						timer: 1000,
						showConfirmButton: false
					});
					$("#addShopDialog").modal("hide");
					getUserRoleList();
				} else {
					swal("", res.msg, "error");
				}
			}
		});
	});

	//点击添加用户区域
	$(document).on("click", ".J_addUserArea", function(even) {
		var $target = $(even.target);
		handleUserRoleId = $target.data("lid");
		areaSelect.initAreaDialog({
			"cb": addAreaToUser
		});

		function addAreaToUser(areaData) {
			var areaIds = "";
			for(var i = areaData.length; i--;) {
				areaIds = areaIds + "," + areaData[i].areaid;
			}
			areaIds = areaIds.substr(1);
			$.ajax({
				type: "post",
				url: basePath + "user/addRoleLinkAreas.do",
				data: {
					userRoleId: handleUserRoleId,
					areaIds: areaIds
				},
				dataType: "json",
				success: function(res) {
					if(res.code == 200) {
						swal({
							title: "",
							text: "操作成功!",
							timer: 1000,
							showConfirmButton: false,
						})
						$("#addAreaDialog").modal("hide");
						getUserRoleList();
					} else {
						swal("错误", res.msg, "error");
					}
				}
			});
		}

	});

	//四级地区选择区域
	var areaSelect = {
		basePath: basePath,
		showDialog: function() {
			$("#addAreaDialog").modal({
				backdrop: "static"
			});
		},
		getAreaDatabyParentId: function(parentId) {
			var posturl = areaSelect.basePath + "goods/queryAreasByParentId.do";
			parentId = parentId ? parentId : "000000000000";
			$.ajax({
				type: "POST",
				url: posturl,
				dataType: "json",
				data: {
					parentId: parentId,
				},
				success: function(data) {
					if(data.areas && data.areas.length > 0) {
						areaSelect.setAreaListDom(data.areas);
					} else {
						swal("查询地区错误", "", "error");
					}
				}
			})
		},
		setAreaListDom: function(areaList) {
			var level = areaList[0].level;
			var len = areaList.length;
			var areaItem = [];
			for(var i = 0; i < len; i++) {
				var dataItem = areaList[i];
				areaItem.push('<div class="checkbox i-checks J_checkbox"><label><input type="checkbox" class="J_areaCheckBox" data-areaid="' + dataItem.id + '" data-level="' + level + '" data-fullname="' + dataItem.fullName + '"> <i></i> </label><span  data-areaid="' + dataItem.id + '" class="J_getNextArea" data-level="' + level + '" data-fullname="' + dataItem.fullName + '" >' + dataItem.name + '</span></div>');
			}
			switch(level) {
				case 1:
					$("#provinces").html(areaItem);
					$("#citys").html("");
					$("#towns").html("");
					$("#street").html("");
					break;
				case 2:
					$("#citys").html(areaItem);
					$("#towns").html("");
					$("#street").html("");
					break;
				case 3:
					$("#towns").html(areaItem);
					$("#street").html("");
					break;
				case 4:
					$("#street").html(areaItem);
					break;
				default:
					break;
			}

			$('.i-checks').iCheck({
				checkboxClass: 'icheckbox_square-green',
				radioClass: 'iradio_square-green',
			});

			//点击选中或取消选中地区
			$("#areaAll ins").click(function(even) {
				var $target = $(even.target).siblings("input.J_areaCheckBox");
				var currentAreaId = $target.data("areaid");
				var fullname = $target.data("fullname");
				if($target.is(":checked")) {
					$("#havaselarea").append('<span class="item J_areaSpanItem" data-areaid="' + currentAreaId + '" data-fullname="' + fullname + '"><span class="value">' + fullname + '</span><i class="fa fa-times-circle iclose"></i></span>');
				} else {
					$("#havaselarea").find('.J_areaSpanItem[data-areaid="' + currentAreaId + '"]').remove();
				}
			});

			//删除点击的所选区域
			$(document).on("click", ".J_areaSpanItem .iclose", function(even) {
				var $targetParent = $(even.target).parent();
				var areaid = $targetParent.data("areaid");
				$targetParent.remove();
				$("input[data-areaid='" + areaid + "'").siblings("ins").click();
			});
		},
		initAreaDialog: function(opt) {
			var config = opt;
			$("#havaselarea").empty();
			areaSelect.showDialog();
			areaSelect.getAreaDatabyParentId();
			//点击加载下一级地区
			$(document).on("click", ".J_getNextArea", function(even) {
				var $target = $(even.target);
				var currentAreaId = $target.data("areaid");
				var level = $target.data("level");
				if(level !== 4) {
					areaSelect.getAreaDatabyParentId(currentAreaId);
				}
			});

			//确定添加地区
			$("#confirmaddarea").click(function() {
				var haveSelArea = $("#havaselarea").find(".J_areaSpanItem")
				var areaObj = [];
				for(var i = haveSelArea.length; i--;) {
					var $dom = $(haveSelArea[i]);
					var areaItem = {
						areaid: $dom.data("areaid"),
						fullname: $dom.data("fullname")
					}
					areaObj.push(areaItem);
				}
				config.cb(areaObj);
			});
		}
	};

	$(document).ready(function() {
		queryUserByPage();
	});

})();