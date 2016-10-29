/**
 * 前端常见的算法
 */

/**
 * 判断一个单词是否是回文
 */
function checkPalindrom(str) {
	return str == str.split('').reverse().join('');
}

/**
 * 去掉一组整型数组重复的值
 * 比如输入:[1,13,24,11,11,14,1,2]
 * 输出:[1,13,24,11,14,2]
 * 需要去掉重复的11和1 这两个元素
 */

function unique(arr) {
	var hashTable = {};
	var data = [];
	for(var i = 0, len = arr.length; i < len; i++) {
		if(!hashTable[arr[i]]) {
			hashTable[arr[i]] = true;
			data.push(arr[i]);
		}
	}
	return data
}

/**
 * 统计一个字符串出现最多的字母
 * 给出一段英文连续字符串,找出重复次数最多的字母
 * 输入 :  afjghdfraaaasdenas 
 * 输出: a
 */
function findMaxDuplicateChar(srt) {
	if(str.length == 1) {
		return str;
	}

	var charObj = {};

	for(var i = 0, len = str.length; i < len; i++) {
		if(!charObj[str.charAt(i)]) {
			charObj[str.charAt(i)] = 1;
		} else {
			charObj[str.charAt(i)] += 1;
		}
	}

	var maxChar = '',
		maxValue = 1;
	for(var k in charObj) {
		if(charObj[k] >= maxValue) {
			maxChar = k;
			maxValue = charObj[k];
		}
	}
	return maxValue
}

/**
 * 排序算法
 * 冒泡排序 插入排序 快速排序 希尔排序
 */

//冒泡排序
function bubbleSort(arr) {
	for(var i = 0, len = arr.length; i < len; i++) {
		for(var j = i + 1; j < len; j++) {
			if(arr[i] > arr[j]) {
				var tem = arr[i];
				arr[i] = arr[j];
				arr[j] = tem;
			}
		}
	}
	return arr;
}

//快速排序
function quickSort(arr) {
	if(arr.length <= 1) {
		return arr
	}
	var leftArr = [];
	var rightArr = [];
	var q = arr[0];
	for(var i = 1, len = arr.length; i < len; i++) {
		if(arr[i] > q) {
			rightArr.push(arr[i]);
		} else {
			leftArr.push(arr[i]);
		}
	}
	return [].concat(quickSort(leftArr), [q], quickSort(rightArr));

}

/**
 * 不借助临时变量,进行二个整数的交换
 * 输入: a=2, b=4
 * 输出: a=4, a=2
 */
function swap(a, b) {
	b = b - a;
	a = a + b;
	b = a - b;
	return [a, b];
}

/**
 * 使用canvas绘制一个有限度的斐波那契数列的曲线
 * 数列长度限定在9
 * 斐波那契数列又称黄金分割数列 指的是这样一个数列
 * 0 1 1 2 3 5 8 13 21 34
 */
function getFibonacci(n) {
	var fibarr = [];
	var i = 0;
	while(i < n) {
		if(i <= 1) {
			fibarr.push(i);
		} else {
			fibarr.push(fibarr[i - 1] + fibarr[i - 2])
		}
		i++
	}
	return fibarr;
}

/**
 * 找出下列正数组的最大差值
 */
function getMaxProfit(arr) {
	var minPrice = arr[0];
	var maxProfit = 0;
	for(var i = 0; i < arr.length; i++) {
		var currentPrice = arr[i];
		minPrice = Math.min(minPrice, currentPrice);
		var potentialProfit = currentPrice - minPrice;
		maxProfit = Math.max(maxProfit, potentialProfit);
	}
	return maxProfit;
}

/**
 * 随机生成指定长度的字符串
 */
function randomString(n) {
	var str = "abcdefghijklmnopqrstuvwxyz9876543210";
	var tem = "",
		i = 0,
		l = str.length;
	for(i = 0; i < n; i++) {
		temp += str.charAt(Math.floor(Math.random() * l));
	}
	return tem;
}

/**
 * 实现类似getElementsByClassName 的功能
 */
function queryClassName(node, name) {
	var starts = '(^|[\n\r\t\f])',
		ends = '([\n\r\t\f)|$';
	var array = [],
		regex = new RgeExp(starts + name + ends),
		elements = node.getElementsByTagName("*"),
		length = elements.length,
		i = 0,
		element;
	while(i < length) {
		element = elements[i];
		if(regex.test(element.className)) {
			array.push(element);
		}
		i += 1;
	}
	return array;
}

/**
 * Q10 使用JS 实现二叉查找树(Binary Search Tree)

一般叫全部写完的概率比较少，但是重点考察你对它的理解和一些基本特点的实现。 二叉查找树，也称二叉搜索树、有序二叉树（英语：ordered binary tree）是指一棵空树或者具有下列性质的二叉树：

任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
任意节点的左、右子树也分别为二叉查找树；
没有键值相等的节点。二叉查找树相比于其他数据结构的优势在于查找、插入的时间复杂度较低。为O(log n)。二叉查找树是基础性数据结构，用于构建更为抽象的数据结构，如集合、multiset、关联数组等

作者：老大徒伤悲
链接：https://zhuanlan.zhihu.com/p/23266687
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
//class Node {  
//constructor(data, left, right) {
//  this.data = data;
//  this.left = left;
//  this.right = right;
//}
//
//}
//作者：老大徒伤悲
//链接：https://zhuanlan.zhihu.com/p/23266687
//来源：知乎
//著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
//
//class BinarySearchTree {
//
//constructor() {
//  this.root = null;
//}
//
//insert(data) {
//  let n = new Node(data, null, null);
//  if (!this.root) {
//    return this.root = n;
//  }
//  let currentNode = this.root;
//  let parent = null;
//  while (1) {
//    parent = currentNode;
//    if (data < currentNode.data) {
//      currentNode = currentNode.left;
//      if (currentNode === null) {
//        parent.left = n;
//        break;
//      }
//    } else {
//      currentNode = currentNode.right;
//      if (currentNode === null) {
//        parent.right = n;
//        break;
//      }
//    }
//  }
//}
//
//remove(data) {
//  this.root = this.removeNode(this.root, data)
//}
//
//removeNode(node, data) {
//  if (node == null) {
//    return null;
//  }
//
//  if (data == node.data) {
//    // no children node
//    if (node.left == null && node.right == null) {
//      return null;
//    }
//    if (node.left == null) {
//      return node.right;
//    }
//    if (node.right == null) {
//      return node.left;
//    }
//
//    let getSmallest = function(node) {
//      if(node.left === null && node.right == null) {
//        return node;
//      }
//      if(node.left != null) {
//        return node.left;
//      }
//      if(node.right !== null) {
//        return getSmallest(node.right);
//      }
//
//    }
//    let temNode = getSmallest(node.right);
//    node.data = temNode.data;
//    node.right = this.removeNode(temNode.right,temNode.data);
//    return node;
//
//  } else if (data < node.data) {
//    node.left = this.removeNode(node.left,data);
//    return node;
//  } else {
//    node.right = this.removeNode(node.right,data);
//    return node;
//  }
//}
//
//find(data) {
//  var current = this.root;
//  while (current != null) {
//    if (data == current.data) {
//      break;
//    }
//    if (data < current.data) {
//      current = current.left;
//    } else {
//      current = current.right
//    }
//  }
//  return current.data;
//}
//
//}

/**
 * 强行插入 js对象的深复制
 * 由于js对象只是对象的引用,所以在对象的复制 时 修改一个会同时修改另一个
 * 这时就需要一个js对象的深复制
 * 为什么是深复制 因为 js对象里可以多层嵌套js对象
 */

function deepCopy(obj) {
	var result = {},
		keys = Object.keys(obj),
		key = null,
		temp = null;
	for(var i = 0; i < keys.length; i++) {
		key = keys[i];
		temp = obj[key];
		if(temp && typeof temp === "object") {
			result[key] = deepCopy(temp);
		} else {
			result[key] = temp;
		}
	}
	return result;
}

/**
 * 上面的例子看起来还可以 但如果对象中的元素有本对象的引用 那就坏了 要爆栈 哈哈哈....
 * 以下是他的完善版
 */
function deepCopy2(obj) {
	parent = null;
	var result = {};
	var keys = Object.keys(obj),
		key = null,
		temp = null;
	for(var i = 0; i < keys.length; i++) {
		key = keys[i];
		temp = obj[key];
		// 如果字段的值也是一个对象
		if(temp && typeof temp === 'object') {
			// 该字段有父级则需要追溯该字段的父级
			while(parent) {
				// 如果该字段引用了它的父级则为循环引用
				if(parent.originalParent === temp) {
					// 循环引用直接返回同级的新对象
					return parent.currentParent;
				}
				parent = parent.parent;
			}
			// 递归执行深拷贝 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
			result[key] = DeepCopy(temp, {
				originalParent: obj,
				currentParent: result,
				parent: parent
			});

		} else {
			result[key] = temp;
		}
	}
	return result;

}