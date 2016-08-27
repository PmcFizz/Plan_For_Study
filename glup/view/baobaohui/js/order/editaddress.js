/**
 * 编辑收货地址
 */
	var basePath = $("body").attr("basepath");
	var addressId = "";
	var isDefault = 0;
	//获得url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) {
			return unescape(r[2]);
		}
		return null; //返回参数值
	}
	//自动定位方法
	var autoPosition={
			//得到经纬度之后的处理函数
		getPositionByLngLat:function(data){
			var lng = data.lng;//地理经度值
			var lat = data.lat;//地理纬度值
			$.ajax({
				type:"post",
				url:"http://192.168.1.101:8080/cqgkapi/area/parseaddress.do",
				data:{
					latitude:lat,
					longitude:lng
				},
				dataType:"json",
				success:function(obj){
					
				}
			})
		}
 
	}
	var addressId = getUrlParam("id");
	if (addressId) {
		//url 中含有id 进入更新收货地址
		getAddressDetail(addressId);
	} else {
		//进入创建收货地址
		//获取所有省份
		getProvince();
		
		
//		var map = new BMap.Map("allmap");
//		var point = new BMap.Point(116.331398,39.897445);
//		//map.centerAndZoom(point,12);
//		var geolocation = new BMap.Geolocation();
//		geolocation.getCurrentPosition(function(r){
//			if(this.getStatus() == 0){
//				var mk = new BMap.Marker(r.point);
//				map.addOverlay(mk);
//				map.panTo(r.point);
//				autoPosition.getPositionByLngLat(r.point);
//				//alert('您的位置：'+r.point.lng+','+r.point.lat);
//			}
//			else {
//				alert('failed'+this.getStatus());
//			}        
//		},{enableHighAccuracy: true})
		
		
	}
	$("#submit").click(saveOrUpdateReceiveAddr);

	function saveOrUpdateReceiveAddr() {
		var consigneeName, phoneNum, selectAreaId, addressdetail;
		consigneeName = $("#consigneeName").val();
		phoneNum = $("#phoneNum").val();
		selectAreaId = $("#selectAreaId").val();
		addressdetail = $("#addressdetail").val();

		if (!consigneeName) {
			jAlert("请填写收货人姓名", "");
			return;
		}
		if (!phoneNum || phoneNum.length != 11) {
			jAlert("请准确填写11位手机号", "");
			return;
		}
		if ($("#selectProvince").val() == -1) {
			jAlert("请选择省份!", "");
			return;
		}
		if ($("#selectCity").val() == -1) {
			jAlert("请选择城市!", "");
			return;
		}
		if ($("#selectArea").val() == -1) {
			jAlert("请选择县级!", "");
			return;
		}
		if ($("#selectTowns").val() == -1) {
			jAlert("请选择乡镇!", "");
			return;
		}
		if (!selectAreaId && selectAreaId == -1) {
			jAlert("地址必须选到街道/村镇", "");
			return;
		}
		if (!addressdetail) {
			jAlert("请填写详细地址", "");
			return;
		}
		$.ajax({
			type: "post",
			url: basePath + "address/addaddress.do",
			async: true,
			data: {
				receiveAddrId: addressId,
				contactName: consigneeName,
				contactPhone: phoneNum,
				areaId: selectAreaId,
				address: addressdetail,
				isDefault: isDefault
			},
			success: function(obj) {
				if (obj.code == 200) {
					jAlert("操作成功!", "", function(r) {
						if (r) {
							history.go(-1);
						}
					});
				} else {
					jAlert("操作成功!", "")
				}
			}
		});
	}
	//得到省份
	function getProvince() {
		$.ajax({
			type: "post",
			url: basePath + "address/province.do",
			async: true,
			data: {},
			dataType: "json",
			success: function(obj) {
				if (obj.code == 200 && obj.data) {
					setSelectData(obj.data, 1);
				} else {
					jAlert("查询所有省份错误", "")
				}
			}
		});
	};

	//省份选择框改变后 获取城市数据
	$("#selectProvince").change(function() {
			var provinceId = $(this).val();
			$.ajax({
				type: "post",
				url: basePath + "address/city.do",
				async: true,
				data: {
					provinceId: provinceId
				},
				dataType: "json",
				success: function(obj) {
					if (obj.code == 200 && obj.data) {
						setSelectData(obj.data, 2);
					} else {
						jAlert("获取城市数据失败", '');
					}
				}
			});
		})
		//城市选择框改变后 获取县级
	$("#selectCity").change(function() {
			var cityId = $(this).val();
			$.ajax({
				type: "post",
				url: basePath + "address/county.do",
				async: true,
				data: {
					cityId: cityId
				},
				dataType: "json",
				success: function(obj) {
					if (obj.code == 200 && obj.data) {
						setSelectData(obj.data, 3);
					} else {
						jAlert("获取县级数据失败", '');
					}
				}
			});
		})
		//县级选择框改变后 获取所有街道 或村镇
	$("#selectArea").change(function() {
			var countyId = $(this).val();
			$.ajax({
				type: "post",
				url: basePath + "address/street.do",
				async: true,
				data: {
					countyId: countyId
				},
				dataType: "json",
				success: function(obj) {
					if (obj.code == 200 && obj.data) {
						setSelectData(obj.data, 4);
					} else {
						jAlert("获取街道/村镇数据失败", '');
					}
				}
			});
		})
		//街道/村镇选择框改变后重新赋值addressid
	$("#selectTowns").change(function() {
		$("#selectAreaId").val($(this).val());
	})

	//设置选择下拉框数据
	function setSelectData(data, level) {
		if (level == 1) {
			$("#selectProvince").empty();
			$("#selectProvince").append('<option value="-1">--省份--</option>	');
			$("#selectCity").empty();
			$("#selectCity").append('<option value="-1">--城市--</option>');
			$("#selectArea").empty();
			$("#selectArea").append('<option value="-1">--县级--</option>');
			$("#selectTowns").empty();
			$("#selectTowns").append('<option value="-1">--乡镇--</option>');
			$.each(data, function(i, doc) {
				$("#selectProvince").append('<option value="' + doc.id + '">' + doc.name + '</option>')
			});
		} else if (level == 2) {
			$("#selectCity").empty();
			$("#selectCity").append('<option value="-1">--城市--</option>');
			$("#selectArea").empty();
			$("#selectArea").append('<option value="-1">--县级--</option>');
			$("#selectTowns").empty();
			$("#selectTowns").append('<option value="-1">--乡镇--</option>');
			$.each(data, function(i, doc) {
				$("#selectCity").append('<option value="' + doc.id + '">' + doc.name + '</option>')
			});
		} else if (level == 3) {
			$("#selectArea").empty();
			$("#selectArea").append('<option value="-1">--县级--</option>');
			$("#selectTowns").empty();
			$("#selectTowns").append('<option value="-1">--乡镇--</option>');
			$.each(data, function(i, doc) {
				$("#selectArea").append('<option value="' + doc.id + '">' + doc.name + '</option>')
			});
		} else if (level == 4) {
			$("#selectTowns").empty();
			$("#selectTowns").append('<option value="-1">--乡镇--</option>');
			$.each(data, function(i, doc) {
				$("#selectTowns").append('<option value="' + doc.id + '">' + doc.name + '</option>')
			});
		}

	};

	function getAddressDetail(addressId) {
		$.ajax({
			type: "post",
			url: basePath + "address/addressmessage.do",
			async: true,
			data: {
				receiveAddrId: addressId
			},
			dataType: "json",
			success: function(obj) {
				if (obj.code == 200 && obj.data) {
					setAddress(obj.data);
				} else {
					jAlert("获取收货地址详情错误", "");
				}
			},
			error: function(err) {}
		});
	};
	//设置收货地址数据
	function setAddress(addr) {
		isDefault = addr.isDefault;
		$("#consigneeName").val(addr.contactName);
		$("#phoneNum").val(addr.contactPhone);
		$("#addressdetail").val(addr.address);
		setSelOption(addr);
	};

	function setSelOption(data) {
		if (data.provinceList && data.provinceList.length > 0) {
			setSelectData(data.provinceList, 1, data.provinceId);
			$("#selectProvince").val(data.provinceId);
		}
		if (data.cityList && data.cityList.length > 0) {
			setSelectData(data.cityList, 2, data.cityId);
			$("#selectCity").val(data.cityId);
		}
		if (data.countyList && data.countyList.length > 0) {
			setSelectData(data.countyList, 3, data.countyId);
			$("#selectArea").val(data.countyId);
		}
		if (data.townshipList && data.townshipList.length > 0) {
			setSelectData(data.townshipList, 4, data.townshipId);
			$("#selectTowns").val(data.townshipId);
		}
		$("#selectAreaId").val(data.townshipId);
	};

//})