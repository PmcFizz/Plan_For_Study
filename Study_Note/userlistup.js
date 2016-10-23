/**
 * 用户管理
 * 升级版
 * @Fizz
 */
(function() {
	var basePath = common.getRootPath();
	var sourcePath = $("body").data("sourcepath");

	//页面配置项 重要
	var page_config = (function() {
		var handleUserId, //正在处理的用户id
			handleUserPhone, //正在处理的用户手机号
			handelUserRoleLinkId; //正在处理的用户与角色关联id

		//设置正在处理的用户id
		var setHandleUserId = function(userid) {
			this.handleUserId = userid
		};

		//获得正在处理的用户id
		var getHandleUserId = function() {
			return this.handleUserId;
		};

		//设置正在处理的用户手机号
		var setHandleUserPhone = function(phone) {
			this.handleUserPhone = phone
		};

		//获得正在处理的用户手机号
		var getHandleUserPhone = function() {
			return this.handleUserPhone;
		};

		//设置用户与角色的关联id		
		var setHandleUserRoleLinkId = function(linkId) {
			this.handelUserRoleLinkId = linkId
		};

		//获取用户与角色的关联id		
		var getHandleUserRoleLinkId = function() {
			return this.handelUserRoleLinkId;
		};
		return {
			setHandleUserId: setHandleUserId,
			getHandleUserId: getHandleUserId,
			setHandleUserPhone: setHandleUserPhone,
			getHandleUserPhone: getHandleUserPhone,
			setHandleUserRoleLinkId: setHandleUserRoleLinkId,
			getHandleUserRoleLinkId: getHandleUserRoleLinkId
		}
	})();

	//用户列表控制器
	var userTableController = {

		//事件处理
		evenHandle: function() {
			$(document).on("click", ".J_seeUserRole", userTableController.clickJ_seeUserRole);
			$("#searchUserKey").keydown(userTableController.enterSearch);
			$("#reloadusertable").click(userTableController.reloadTable)
		},

		//userTableController的入口
		init: function() {
			userTableController.queryUserByPage();
		},

		//分页查询用户
		queryUserByPage: function() {
			 $("#usertable").dataTable({
				"language": {
					"url": basePath + "Chinese.json"
				},
				"serverSide": true,
				"paging": true,
				"searching": false,
				"bSort": false,
				"bLengthChange": false,
				"bProcessing": true,
				"bStateSave": false,
				"ajax": {
					"url": basePath + "user/dolist.do",
					"type": "post",
					"data": function(d) {
						d.searchKey = $("#searchUserKey").val().trim();
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
					"fnCreatedCell": function(nTd, sData, oData) {
						var content = '<button type="button" class="btn btn-outline btn-info J_seeUserRole" data-phoneno="' + oData.phoneNumber + '" data-userid="' + oData.userId + '" >用户角色</button>';
						$(nTd).html(content);
					}
				}]
			});
		},

		//刷新用户列表
		reloadTable: function() {
			$("#usertable").DataTable().page('first').draw(false);
		},

		//点击查看用户的角色列表
		clickJ_seeUserRole: function(evenObj) {
			var $target = $(evenObj.target);
			page_config.setHandleUserId($target.data("userid"));
			page_config.setHandleUserPhone($target.data("phoneno"));
			userTableController.outFun();
		},

		//enter键搜索用户列表
		enterSearch: function(evenObj) {
			if(evenObj.keyCode == "13") {
				userTableController.reloadTable();
			}
		},

		//控制器出口 需被覆盖
		outFun: function() {

		}
	};

	//一个用户的角色列表控制器
	var userRoleTableController = {

		//控制器对外接口配置
		outConfig: {
			clickAddUserAreaCb: function() {}, //点击添加有效区域的函数
			clickAddUserShopCb: function() {}, //点击添加店铺的函数
			clickAddUserRoleCb: function() {} //点击新增用户角色的函数 
		},

		//事件处理函数
		evenHandle: function() {
			$(document).on("click", ".J_delUserArea", userRoleTableController.clickJ_delUserArea);
			$(document).on("click", ".J_addUserArea", userRoleTableController.clickJ_addUserArea);
			$(document).on("click", ".J_delUserShop", userRoleTableController.clickJ_delUserShop);
			$(document).on("click", ".J_addUserShop", userRoleTableController.clickJ_addUserShop);
			$(document).on("click", ".J_delUserRole", userRoleTableController.clickJ_delUserRole);
			$("#adduserrolebtn").click(userRoleTableController.clickAddUserRolebtn);
		},

		//userRoleTableController 初始化 或 入口
		init: function() {
			$("#userRoleDialog").modal({
				"backdrop": "static"
			});
			userRoleTableController.getUserRoleData();
		},

		//获取用户的角色数据
		getUserRoleData: function() {
			var userId = page_config.getHandleUserId();
			var userPhone = page_config.getHandleUserPhone();
			if(common.isEmpty(userId)) {
				swal("操作错误", "没有被操作的用户id", "error");
				return;
			}
			if(common.isEmpty(userPhone)) {
				swal("操作错误", "没有被错的人的手机号", "error");
				return
			}
			$.ajax({
				type: "post",
				url: basePath + "user/queryRole.do",
				dataType: "json",
				data: {
					userId: userId,
					phoneNumber: userPhone
				},
				success: function(res) {
					if(res.code == 200) {
						if(res.data && res.data.length > 0) {
							userRoleTableController.setUserRoleTable(res.data);
						} else {
							$("#userroletbody").html('<tr><td colspan="5">暂时没有数据</td></tr>');
						}
					} else {
						swal("查询错误", res.msg, "error");
					}
				}
			});
		},

		//设置用户角色的数据到Dom
		setUserRoleTable: function(data) {
			var userRoleHtml = [];
			for(var i = 0, len = data.length; i < len; i++) {
				var roleItem = data[i];
				userRoleHtml.push('<tr>');
				userRoleHtml.push('   <td>' + roleItem.phoneNumber + '</td>');
				userRoleHtml.push('   <td>' + roleItem.roleName + '</td>');
				userRoleHtml.push(getDynamicsTr(roleItem));
				userRoleHtml.push('</tr>');
			}
			$("#userroletbody").html(userRoleHtml.join(''));

			function getDynamicsTr(item) {
				var threeTr = '';
				var btn = '';
				var canEdit = item.canEdit;
				threeTr = threeTr + '<td>';
				if(canEdit) {
					threeTr = threeTr + '<img class="add_area_img J_addUserArea" data-lid="' + item.userRoleId + '" src="' + sourcePath + '/manager/img/btn_add.png" >';
				}
				if(item.ystRoleLinkAreaList && item.ystRoleLinkAreaList.length > 0) {
					for(var i = 0, len = item.ystRoleLinkAreaList.length; i < len; i++) {
						var areaItem = item.ystRoleLinkAreaList[i];
						var img = '';
						if(canEdit) {
							img = '<img class="del_area_img J_delUserArea" data-lid="' + areaItem.lid + '" src="' + sourcePath + '/manager/img/btn_del.png" >';
						}
						threeTr = threeTr + '<span style="padding:5px" >' + areaItem.fullAreaName + '' + img + '</span>';
					}
				}
				threeTr = threeTr + '</td>';
				threeTr = threeTr + '<td>';
				if(canEdit) {
					threeTr = threeTr + '<img class="add_area_img J_addUserShop" data-lid="' + item.userRoleId + '" src="' + sourcePath + '/manager/img/btn_add.png" >';
				}
				if(item.tYstRoleLinkShop && item.tYstRoleLinkShop.length > 0) {
					for(var i = 0, len = item.tYstRoleLinkShop.length; i < len; i++) {
						var shopItem = item.tYstRoleLinkShop[i];
						var img = '';
						if(canEdit) {
							img = '<img class="del_area_img J_delUserShop" data-lid="' + shopItem.lid + '" src="' + sourcePath + '/manager/img/btn_del.png" >';
						}
						threeTr = threeTr + '<span style="padding:5px" >' + shopItem.shopName + '' + img + '</span>';
					}
				}
				threeTr = threeTr + '</td>';
				if(canEdit) {
					btn = "<button type='button' class='btn  btn-outline btn-danger J_delUserRole' data-lid='" + item.userRoleId + "' >删除</button>";
				}
				threeTr = threeTr + "<td>" + btn + "</td>";
				return threeTr;
			};
		},

		//点击删除用户区域
		clickJ_delUserArea: function(evenObj) {
			var $target = $(evenObj.target);
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
				}
			});
		},

		//点击添加用户区域
		clickJ_addUserArea: function(evenObj) {
			var $target = $(evenObj.target);
			var userRoleId = $target.data("lid");
			page_config.setHandleUserRoleLinkId(userRoleId);
			userRoleTableController.outConfig.clickAddUserAreaCb();
		},

		//点击删除用户店铺
		clickJ_delUserShop: function(evenObj) {
			var $target = $(evenObj.target);
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
		},

		//点击添加用户店铺
		clickJ_addUserShop: function(evenObj) {
			var $target = $(evenObj.target);
			page_config.setHandleUserRoleLinkId($target.data("lid"));
			userRoleTableController.outConfig.clickAddUserShopCb()
		},

		//删除用户的一个角色
		clickJ_delUserRole: function(evenObj) {
			var $target = $(evenObj.target);
			var userroleid = $target.data("lid");
			$.ajax({
				type: "post",
				url: basePath + "user/deleteRole.do",
				data: {
					userRoleId: userroleid,
					userId: page_config.getHandleUserId()
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
		},

		//点击新增用户角色
		clickAddUserRolebtn: function() {
			userRoleTableController.outConfig.clickAddUserRoleCb()
		}
	};

	//角色列表控制器
	var roleTableController = {

		getDataCallBack: function() {
			console.log("刷新用户角色列表");
		},

		evenHandle: function() {
			$(document).on("click", ".J_rolecheckbox", roleTableController.clickJ_rolecheckbox);
			$(document).on("click", ".J_delSelRole", roleTableController.clickJ_delSelRole);
			$("#searchreolename").keydown(roleTableController.enterSearchRoleTable);
			$("#confirmaddrole").click(roleTableController.clickConfirmAddRole);
		},

		init: function() {
			roleTableController.showDialog();
			roleTableController.getRoleTableDataByPage();
		},

		//显示角色摸态框 
		showDialog: function() {
			$("#havaselrole").empty();
			$("#searchreolename").val("");
			$("#addRoledialog").modal({
				backdrop: "static"
			});
		},

		//分页获取角色数据
		getRoleTableDataByPage: function() {
			if($.fn.dataTable.isDataTable("#roletable")) {
				var ta = $("#roletable").DataTable();
				ta.destroy();
			}
			$("#roletable").DataTable({
				"language": {
					"url": basePath + "Chinese.json"
				},
				"paging": true,
				"serverSide": true,
				"bStateSave": false,
				"bSort": false,
				"searching": false,
				"bLengthChange": false,
				"bProcessing": true,
				"ajax": {
					"url": basePath + "role/queryRole.do",
					"type": "post",
					"data": function(d) {
						d.searchKey = $("#searchreolename").val().trim();
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
					"data": "name"

				}],
				//表格渲染完成后 找到已选中的checkbox 选中
				"fnDrawCallback": function() {
					var roledivlist = $("#havaselrole").find("[data-roleid]");
					if(roledivlist && roledivlist.length > 0) {
						for(var i = roledivlist.length; i--;) {
							var itemRoleId = $(roledivlist[i]).data("roleid");
							console.log(itemRoleId);
							if($("input[data-roleid='" + itemRoleId + "']")) {
								$("input[data-roleid='" + itemRoleId + "']").attr("checked", "checked");
							}
						}
					}
				}
			})
		},

		//重新搜素角色
		reloadRoleTable: function() {
			$("#roletable").DataTable().page('first').draw(false);
		},

		//Enter键搜索角色
		enterSearchRoleTable: function(evenObj) {
			if(evenObj.keyCode == "13") {
				roleTableController.reloadRoleTable();
			}
		},

		//点击角色复选框
		clickJ_rolecheckbox: function(evenObj) {
			var $target = $(evenObj.target);
			var roleId = $target.data("roleid");
			var roleaName = $target.data("rolename");
			if($target.is(":checked")) {
				$("#havaselrole").append('<span class="item" ><span class="value">' + roleaName + '</span><i class="fa fa-times-circle iclose J_delSelRole" data-rolename="' + roleaName + '" data-roleid="' + roleId + '"></i></span>');
			} else {
				$("#havaselrole").find("[data-roleid='" + roleId + "']").click();
			}
		},

		//点击删除已选择的角色
		clickJ_delSelRole: function(evenObj) {
			var $target = $(evenObj.target);
			var roleId = $target.data("roleid");
			$target.parent().remove();
			$("input[data-roleid='" + roleId + "']").removeAttr("checked");
		},

		//点击确定添加角色
		clickConfirmAddRole: function() {
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
					userId: page_config.getHandleUserId(),
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
						roleTableController.getDataCallBack();
					} else {
						swal("", res.msg, "error");
					}
				}
			});
		}
	};

	//店铺列表控制器
	var shopTableController = {

		getDataCallBack: function() {
			console.log("刷新用户角色列表");
		},

		evenHandle: function() {
			$(document).on("click", ".J_shopcheckbox", shopTableController.clickJ_shopCheckBox);
			$(document).on("click", ".J_delSelShop", shopTableController.clickJ_delSelShop);
			$("#searchshopname").keydown(shopTableController.enterSearchShop);
			$("#saveshopbtn").click(shopTableController.clickSaveShopBtn);
			$("#searchallshop").click(shopTableController.reloadShopTable);
		},
		init: function() {
			shopTableController.showDialog();
			shopTableController.getShopDataByPage();
		},
		showDialog: function() {
			$("#havaselshop").empty();
			$("#searchshopname").val("");
			$("#addShopDialog").modal({
				backdrop: "static"
			});
		},
		getShopDataByPage: function() {
			if($.fn.dataTable.isDataTable("#shoptable")) {
				var ta = $("#shoptable").DataTable();
				ta.destroy();
			}
			$("#shoptable").DataTable({
				"language": {
					"url": basePath + "Chinese.json"
				},
				"serverSide": true,
				"paging": true,
				"bProcessing": true,
				"bLengthChange": false,
				"bStateSave": false,
				"bSort": false,
				"searching": false,
				"ajax": {
					url: basePath + "shop/queryShopPageByName.do",
					type: "post",
					data: function(d) {
						d.shopName = $("#searchshopname").val().trim();
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
						var imgpath = '';
						if(oData.shopCustomType == 1) {
							imgpath = '/img/shang.png';
						} else if(oData.shopCustomType == 2) {
							imgpath = '/img/yun.png';
						}
						str = str + '<img src="' + sourcePath + '/manager' + imgpath + '" height="50px" width="50px" >' + oData.shopName;
						$(nTd).html(str);
					}
				}],
				//表格渲染完成后 找到已选中的checkbox 选中
				"fnDrawCallback": function() {
					var shopdivlist = $("#havaselshop").find("[data-shopid]");
					if(shopdivlist && shopdivlist.length > 0) {
						for(var i = shopdivlist.length; i--;) {
							var itemShopId = $(shopdivlist[i]).data("shopid");
							var thisInput=$("input[data-shopid='" + itemShopId + "']")
							if(thisInput && thisInput.length>0) {
								thisInput.attr("checked", "checked");
							}
						}
					}
				}
			})
		},

		//重新刷新店铺表格
		reloadShopTable: function() {
			$("#shoptable").DataTable().page('first').draw(false);
		},

		//Enter键搜素店铺
		enterSearchShop: function(evenObj) {
			if(evenObj.keyCode == "13") {
				shopTableController.reloadShopTable();
			}
		},

		//点击店铺复选框
		clickJ_shopCheckBox: function(evenObj) {
			var $target = $(evenObj.target);
			var shopId = $target.data("shopid");
			var shopName = $target.data("shopname");
			if($target.is(":checked")) {
				$("#havaselshop").append('<span class="item" ><span class="value">' + shopName + '</span><i class="fa fa-times-circle iclose J_delSelShop" data-shopname="' + shopName + '" data-shopid="' + shopId + '"></i></span>');
			} else {
				$("#havaselshop").find("[data-shopid='" + shopId + "']").click();
			}
		},

		//删除已选的店铺
		clickJ_delSelShop: function(evenObj) {
			var $target = $(evenObj.target);
			var shopId = $target.data("shopid");
			$target.parent().remove();
			$("input[data-shopid='" + shopId + "']").removeAttr("checked");
		},

		//保存已选的店铺列表
		clickSaveShopBtn: function() {
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
					userRoleId: page_config.getHandleUserRoleLinkId(),
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
						shopTableController.getDataCallBack();
					} else {
						swal("", res.msg, "error");
					}
				}
			});
		}
	};

	//地区列表控制器
	var areaCheckController = {

		getDataCallBack: function() {
			console.log("刷新用户角色列表");
		},

		//得到地区数据后的回调函数
		outConfig: {
			getDataCb: function(areaData) {
				var areaIds = "";
				for(var i = areaData.length; i--;) {
					areaIds = areaIds + "," + areaData[i].areaid;
				}
				areaIds = areaIds.substr(1);
				$.ajax({
					type: "post",
					url: basePath + "user/addRoleLinkAreas.do",
					data: {
						userRoleId: page_config.getHandleUserRoleLinkId(),
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
							areaCheckController.getDataCallBack();
						} else {
							swal("错误", res.msg, "error");
						}
					}
				});
			}
		},

		evenHandle: function() {
			$(document).on("click", ".J_areaSpanItem .iclose", areaCheckController.clickIclose);
			$(document).on("click", ".J_getNextArea", areaCheckController.clickJ_getNextArea);
			$("#confirmaddarea").click(areaCheckController.clickConfirmAddArea);
		},

		init: function() {
			areaCheckController.showDialog();
			areaCheckController.getNextAreaDataByParentId();
		},

		showDialog: function() {
			$("#havaselarea").empty();
			$("#addAreaDialog").modal({
				backdrop: "static"
			});
		},
		getNextAreaDataByParentId: function(parentId) {
			var posturl = basePath + "goods/queryAreasByParentId.do";
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
						areaCheckController.setAreaListDom(data.areas);
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
			$("#areaAll ins").click(areaCheckController.clickIns);
		},

		//点击选择或取消选中的地区
		clickIns: function(evenObj) {
			var $target = $(evenObj.target).siblings("input.J_areaCheckBox");
			var currentAreaId = $target.data("areaid");
			var fullname = $target.data("fullname");
			if($target.is(":checked")) {
				$("#havaselarea").append('<span class="item J_areaSpanItem" data-areaid="' + currentAreaId + '" data-fullname="' + fullname + '"><span class="value">' + fullname + '</span><i class="fa fa-times-circle iclose"></i></span>');
			} else {
				$("#havaselarea").find('.J_areaSpanItem[data-areaid="' + currentAreaId + '"]').remove();
			}
		},

		//删除点击的所选区域
		clickIclose: function(evenObj) {
			var $targetParent = $(evenObj.target).parent();
			var areaid = $targetParent.data("areaid");
			$targetParent.remove();
			$("input[data-areaid='" + areaid + "'").siblings("ins").click();
		},

		//点击加载下一级地区
		clickJ_getNextArea: function(evenObj) {
			var $target = $(evenObj.target);
			var currentAreaId = $target.data("areaid");
			var level = $target.data("level");
			if(level !== 4) {
				areaCheckController.getNextAreaDataByParentId(currentAreaId);
			}
		},

		//确定添加地区
		clickConfirmAddArea: function() {
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
			areaCheckController.outConfig.getDataCb(areaObj);
		}
	};

	$(document).ready(function() {

		//事件注册
		userTableController.evenHandle();
		userRoleTableController.evenHandle();
		roleTableController.evenHandle();
		shopTableController.evenHandle();
		areaCheckController.evenHandle();

		//点击按钮后 将控制权转移到对应的控制器
		userTableController.outFun = userRoleTableController.init;
		userRoleTableController.outConfig.clickAddUserAreaCb = areaCheckController.init;
		userRoleTableController.outConfig.clickAddUserRoleCb = roleTableController.init;
		userRoleTableController.outConfig.clickAddUserShopCb = shopTableController.init;

		//控制权回归 重新刷新用户角色列表
		areaCheckController.getDataCallBack = userRoleTableController.getUserRoleData;
		roleTableController.getDataCallBack = userRoleTableController.getUserRoleData;
		shopTableController.getDataCallBack = userRoleTableController.getUserRoleData;

		//页面住入口
		userTableController.init();
	})

})();