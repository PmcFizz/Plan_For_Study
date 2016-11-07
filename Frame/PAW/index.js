/**
 * 工作能力评估表
 */
(function() {
	var initData = [{
		"skil": "工作效率",
		"skil_code": "w_Efficiency ",
		"skil_des": "任务花费时间,输出的东西的符合度",
		"weight": 5,
		"grade": 9
	}, {
		"skil": "工作质量",
		"skil_code": "w_Quality",
		"skil_des": "bug率,修复程度,严谨性",
		"weight": 5,
		"grade": 8
	}, {
		"skil": "JavaScript",
		"skil_code": "JavaScript",
		"skil_des": "基础,扩展,高阶,性能优化,规范,从无到有,数量,从差到优",
		"weight": 4,
		"grade": 9
	}, {
		"skil": "CSS",
		"skil_code": "CSS",
		"skil_des": "排版,美化,兼容,从无到有,从差到优",
		"weight": 3,
		"grade": 6
	}, {
		"skil": "创新能力",
		"skil_code": "a_Innovation",
		"skil_des": "idea,扩展,组件化,自动化",
		"weight": 3,
		"grade": 7
	}, {
		"skil": "自学能力",
		"skil_code": "StudySelf",
		"skil_des": "框架使用,前沿技术,文档理解,流程优化",
		"weight": 3,
		"grade": 8
	}, {
		"skil": "解决问题能力",
		"skil_code": "a_SolveBug",
		"skil_des": "自己解决问题数量,规避bug方法,查找资料,知识储备",
		"weight": 4,
		"grade": 8
	}];
	var len = initData.length;
	var trHtml = [];

	for(var i = 0; i < len; i++) {
		var item = initData[i];
		trHtml.push('<tr><td>' + item.skil + '</td><td>' + item.skil_code + '</td><td>' + item.skil_des + '</td><td><input class="J_skilweight" value="' + item.weight + '"/></td><td><input class="J_skilgrade"  value="' + item.grade + '"/></td><td><button class="btn btn-warning J_deltr">排除</button></td></tr>');

	};
	document.querySelector("#datatbody").innerHTML = trHtml.join('');
	addBtn();
	calculatePAW();

	$(document).on("click", ".J_deltr", delOneTr);
	$(document).on("click", ".J_addtr", addOneTr);
	$(document).on("click", ".J_recalculate", reCalculate);

	//排除一行
	function delOneTr(evenObj) {
		$(evenObj.target).parents("tr").remove();
		calculatePAW();
	};

	//添加一行
	function addOneTr(evenObj) {
		var $targetTr = $(evenObj.target).parent();
		$targetTr.before('<tr><td><input value=""/></td><td><input  value=""/></td><td><input class="" value=""/></td><td><input class="J_skilweight" value=""/></td><td><input class="J_skilgrade"  value=""/></td><td><button class="btn btn-success J_recalculate">计算</button></td></tr>');
	};

	//添加一行
	function addBtn() {
		var addTR = document.createElement('tr');
		addTR.innerHTML = '<td class="J_addtr" colspan="6">添加一项</td>';
		document.querySelector("#datatbody").appendChild(addTR);
	};

	//重新计算PWA
	function reCalculate() {
		alert(1)
	}

	//计算PAW值
	function calculatePAW() {
		var skilWight = document.querySelectorAll(".J_skilweight");
		var skilGrade = document.querySelectorAll(".J_skilgrade");
		var finalRes = 0;
		var totalWeight = 0;
		var len = skilWight.length;

		for(var j = len; j--;) {
			var itemWeight = skilWight[j];
			totalWeight = parseInt(totalWeight) + parseInt(itemWeight.value)
		}

		for(var i = len; i--;) {
			var itemWight = skilWight[i];
			var itemGrade = skilGrade[i];
			finalRes += parseFloat((itemWight.value / totalWeight).toFixed(2, 10) * itemGrade.value);
		}

		var addTR = document.createElement('tr');
		addTR.innerHTML = '<td class="text-right" colspan="6">PAW : <span class="text-danger">' + finalRes + '</span></td>';
		document.querySelector("#datatbody:last-child").appendChild(addTR);
	};

})();