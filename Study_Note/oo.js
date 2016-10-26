/**
 * @Author Fizz
 * @Time 2016年10月26日16:34:11
 * 本段代码摘抄自<<JavaScript 高级程序设计 (第3版)>> 
 * 最终解释权不归本人所有
 */

//首先理解js中的对象
var person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";
person.sayName = function() {
	alert(this.name);
};

//以下使用对象字面量来创建对象
var person = {
	name: "Nicholas",
	age: 29,
	job: "Software Engineer",
	sayName: function() {
		alert(this.name);
	}
};

/**
 * 6.1.1 属性的类型
 * ECMAScript 中有两种属性,数据属性和访问器属性 
 */

/**
 * 1:数据属性 它包含一个数据值的位置,在这个位置可以读取和写入值.
 * 数据属性有4个描述其行为的特性.
 * [[Configurable]] :表示能否通过delete 删除属性从而重新定义属性 能否修改属性的特性
 * 或者能否把属性修改为访问器属性.默认是true
 * [[Enumerable]] :表示能否通过for-in 循环返回属性.默认true
 * [[Writable]] :表示能否修改属性的值,默认是true.
 * [[Value]]: 包含这个属性的数据值  默认是值undefined
 */
var person = {
	name: "Nicholas"
};

//上面的例子创建了一个名为name的属性, 它的[[Value]] 是"Nicholas" 
//[[Configurable]]  [[Enumerable]] [[Writable]]  三个数据属性都是true
//要修改属性的默认的特性 必须使用ECMAScrpt5的Object.defineProperty()方法,
//这个方法接受三个参数,属性所在的对象,属性的名字和一个描述符对象,其中描述符(descriptor)
//对象的属性必须是 configurable enumerable writable 和value 设置一个或多个可以
//修改对应的特性值
var person = {};
Object.defineProperty(person, "name", {
	writable: false,
	value: "Nicholas"
});
alert(person.name);
person.name = "Fizz";
alert(person.name);

/**
 * 把configurable 设置为false 表示不能从对象中删除属性.如果对这个属性调用delete
 * 则在非严格模式下什么都不发生,而在严格模式下户导致错误.而且一旦吧属性定义为不可配置
 * 就不能再把它变回可配置了.此时,在调用Object.defineProperty()方法修改除writable
 * 之外的特性,都会导致错误:
 */
var person = {};
Object.defineProperty(person, "name", {
	configurable: false,
	value: "Nicholas"
});

//抛出错误
Object.defineProperty(person,"name",{
	configurable:true,
	value:"Nicholas"
});


/**
 * 调用Object.defineProperty() 方法修改同一属性,
 * 但在把configurable特性设置为false之后就会有限制 
 * 在调用Object.defineProperty() 方法时,如果不指定,configurable enumerable
 * 和writable 特性的默认值都是false, 这些属性对理解JavaScript 对象非常有用
 */
