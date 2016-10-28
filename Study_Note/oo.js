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
Object.defineProperty(person, "name", {
	configurable: true,
	value: "Nicholas"
});

/**
 * 调用Object.defineProperty() 方法修改同一属性,
 * 但在把configurable特性设置为false之后就会有限制 
 * 在调用Object.defineProperty() 方法时,如果不指定,configurable enumerable
 * 和writable 特性的默认值都是false, 这些属性对理解JavaScript 对象非常有用
 */

/**
 * 2:访问器属性
 * 访问器属性不包含数据值;他们包含一对getter 和setter函数(不够这两个函数不是必需的)
 * 在读取访问器属性时,会调用getter函数 这个函数负责返回有效的值,在写入访问器属性时,会调用
 * setter 函数并传入新值,这个函数负责决定如何处理数据,访问器属性有如下4个特性:
 * [[Configurable]] 表示能否通过delete 删除属性从而重新定义属性,能否修改属性的特性
 * 或者能否把属性修改为数据属性.对于直接在对象上定义的属性,这个属性的默认值为true
 * [[Enumerable]] 表示能否通过for-in 循环返回属性 对于直接在对象上定义的属性,
 * 这个特性的默认值是true
 * [[Get]] 在读取属性时调用的函数,默认值为undefined.
 * [[Set]] 在写入属性时调用的函数,默认值为undefined.
 * 访问器属性不能直接定义,必须使用Object.defineProperty()来定义
 * 请看下面例子
 */
var book = {
	_year: 2014,
	edition: 1
}
Object.defineProperty(book, "year", {
	get: function() {
		return this._year
	},
	set: function(newValue) {
		if(newValue > 2004) {
			this._year = newValue;
			this.edition += newValue - 2004;
		}
	}
});
book.year = 2005
alert(book.edition);

/**
 * 以上代码创建了一个book对象,并给他定义二个默认的属性_year 和edition._year前面的
 * 下划线是一种常用的记号,用于表示只能通过对象方法访问的属性,而访问器舒心year则
 * 包含一个getter函数和一个setter函数,getter函数返回_year的值.setter函数
 * 通过计算来确定正确的版本.因此,把year属性修改为2005会导致_year变成2005 而edition
 * 变为2这是使用访问器属性的常见方式,即设置一个属性的值会导致其它属性发生变化.
 */

/**
 * 6.1.2 定义多个属性
 * 由于为对象 定义多个属性的可能性很大,ECMAScript5又定义了一个
 * Objcet.defineProperties()方法,利用这个方法可以通过描述符一次定义多个属性
 * 这个方法接受二个参数:第一个对象是要添加和修改其属性的对象,第二个对象的属性与第一个对象中
 * 要添加和修改的属性一一对应,例如:
 */
var book = {};
Object.defineProperties(book, {
	_year: {
		value: 2004
	},
	edition: {
		value: 1
	},
	year: {
		get: function() {
			return this._year;
		},
		set: function(newValue) {
			if(newValue > 2004) {
				this._year = newValue;
				this.edition += newValue - 2004;
			}
		}
	}
});

/**
 ***********************华丽丽的分割线 6.2创建对象*******************
 */

/**
 *虽然Objcet构造函数或对象字面量都可以用来创建单个对象,但这些对象有个明显的缺点,
 * 使用同一接口创建很多对象,会产生大量的重复代码,为解决这个问题,人们开始使用工厂模式
 * 的一种变变体
 */

// 6.2.1工厂模式,抽象创建具体对象的过程,
function createPerson(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		alert(this.name);
	}
	return o;
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");

//6.2.2构造函数模式
//使用构造函数的模式创建对象
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function() {
		alert(this.name);
	}
}

var person1 = new Person("Nichlas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

alert(person1.constructor == Person);
alert(person2.consturctor == Person);

alert(person1 instanceof Object);
alert(person1 instanceof Person);

/**
 * Person()函数与createPerson() 不同之处有三
 * 一:没有显式地创建对象
 * 二:直接将属性和方法赋值给this对象
 * 三:没有return语句
 * 
 * 创建自动以的构造函数意味着将来可以将它的实例标识为一种特定的类型.而这正是
 * 构造函数模式胜过工厂模式的地方.
 */

//构造函数的问题
/**
 * 构造函数的主要问题是每个方法都要在每个实例上创建一遍
 * 在不同实例上的同名函数是不相等的.
 * alert(person1.sayName==person2.sayName);
 * 创建二个同样任务的Function 实例的确没有必要
 */

function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}

function sayName() {
	alert(this.name);
}
var person1 = new Person("Nicholas", 29, "Software Ebngineer");
var person2 = new Person("Greg", 27, "Doctor");
//person1 和person2对象共享了全局作用域中定义的同一个sayName()函数.

/**
 * 6.2.3原型模式
 * 我们创建的每个函数都有一个prototype (原型) 属性,这个属性是一个指针,指向一个对象
 * 而这个对象的用途是包含可以有特定类型的所有实例共享的属性和方法.如果按照字面意思来解释
 * 那么prototype 就是通过调用构造函数而创建的那个对象实例的原型对象,使用原型对象
 * 的好处是可以让所有实例共享它所包含的属性和方法.
 */
function Person() {};
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
	alert(this.name);
};

var person1 = new Person();
person1.sayName(); //"Nicholas";
var person2 = new Person();
person2.sayName(); //"Nicholas";
alert(person1.sayName == person2.sayName); //true

//创建的新对象的属性和方法是有所有实例共享的.换句话说person1 和person2访问的都是
//同一组属性和同一个sayName()函数

/**
 * 理解原型对象
 * 无论什么时候,只要创建一个新函数,就会根据一组特定的规则为该函数创建一个prototype
 * 属性,这个属性指向函数的原型对象,在默认情况下,所有原型对象都会自动获得一个constructor
 * (构造函数) 属性,这个属性包含一个指向prototype属性所在函数的指针.
 * 创建了自定义的构造函数之后,其院原型对象默认只会取得constructor属性,至于其他方法,
 * 则都是从Object 继承而来的,当调用构造函数创建一个实例后,该实例的内部将包含一个指针,
 * 指向构造函数的原型对象. 要明确的真正重要的一点就是这个连接存在于实例与构造函数的原型对象之间
 * 而不是存在于实例和构造函数之间
 */

/**
 * 虽然可以通过对象实例访问保存在原型中的值,但却不能通过对象实例重写原型中的值,如果我们
 * 在实例中添加一个属性,而该属性与原型中的一个属性同名,那我们九子啊实例中创建改属性,
 * 该属性会屏蔽原型中的那个属性如:
 */
function Person(){};
Person.prototype.name="Nicholas";
Person.prototype.age=29;
Person.prototype.job="Software Engineer";
Person.prototype.sayName=function(){
	alert(this.name);
};
var person1=new Person();
var person2=new Person();
person1.name="Greg";
console.log(person1.name); //"Greg" 来自实例
console.log(person2.name); //"Nicholas" 来自原型

/**
 * 要取的对象上所有可枚举的实例属性,可以使用ECMAScript5的Object.keys()方法.这个方法接受一个对象作为参数
 * 返回一个包含所有可枚举属性的字符串数组例如:
 */
function Person(){};
Person.prototype.name="Nicholas";
Person.prototype.age=29;
Person.prototype.job="Software Engineer";
Person.prototype.sayName=function(){
	alert(this.name);
}
var keys=Object.keys(Person.prototype);
alert(keys);

var p1=new Person();
p1.name="Rob";
p1.age=31;
var p1keys=Object.keys(p1);
alert(p1keys);

/**
 * 如果你想要得到所有实例属性,无论它是否可枚举,都可以使用Object.getOwnPropertyNames()方法
 */
var keys=Object.getOwnPropertyNames(Person.prototype);
console.log(keys);


/**
 * 更简单的原型语法
 * 用一个包含所有属性和方法的对象字面量来重写这个原型对象
 * 例如:
 */
function Person(){};
Person.prototype={
	name:"Nicholas",
	age:29,
	job:"Software Engineer",
	sayName:function(){
		console.log(this.name);
	}
}
/**
 * 上面这种写法 最终结果都是一样的,但有一个例外就是constructor属性不再指向Person 
 * 因为使用上述语法本质上是完全重写了默认了prototype对象
 * 虽然能用instanceof 操作符返回正确结果 但通过constructor 已经不能确定对象的类型了
 * 如果constructor真的很重要的话  使用下面的代码
 */
Object.defineProperty(Person.prototype,"constructor",{
	enumerable:false,
	value:Person
});

/**
 * 4:原型的动态性
 * 由于在原型中查找值的过程是一次搜索,因此我们队原型对象多做的任何修改都能够立即从实例反映出来,
 * 即使是先创建实例后修改原型也样如此 如:
 */
function Person(){};
var friend=new Person();
Person.prototype.sayHi=function(){
	alert("hi");
}
friend.sayHi(); //hi 没有问题

/**
 * 先创建一个Person的实例person 然后再Person的prototype 中添加一个方法 sayHi() 
 * 即使person实例是在添加新方法之前创建的,但它仍然可以访问这个新方法,其原因可以归结为实例与原型之间的松散连接关系.
 * 但我们调用person.sayHi()时,首先会在实例中搜素名为sayHi的属性,在没找到的情况下,会继续搜索原型,
 * 因为实例与原型之间的连接只不过是一个指针,而非一个副本,因此就可以在原型中找到新的sayHi属性并返回保存在哪里的函数
 * 
 * 尽管可以随时为原型添加属性和方法,并且修改能够在所有实例中反映出了,但如果是重写整个原型对象,那情况就不一样了,
 * 调用构造函数时会为实例添加一个指向最初原型的[[Prototype]] 指针,而把原型修改为另一个对象就等于切断了后走啊函数与最初原型
 * 之间的联系 请记住,实例中的指针仅指向原型,而不指向构造函数
 * 如下代码:
 */
function Person(){};
var friend=new Person();
Person.prototype={
	constructor:Person,
	name:"Nicholas",
	age:29,
	job:"Software Engineer",
	sayName:function(){
		console.log(this.name);
	}
}
friend.sayName();//error

//重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系,他们引用的仍然是最初的原型.

/**
 * 5:原生对象的原型
 * 通过原生对象的原型,不仅可以取得所有默认方法的引用,而且可以定义新方法,可以像修改自定义对象的原型一样
 * 修改原生对象的原型,因此可以随时添加方法
 */

/**
 * 6:原生对象的问题
 * 原型模式也不是没有缺点.首先,它省略了为构造函数传递初始化参数的这一环节,结果所有实例在默认情况下
 * 都将取得相同的属性值,虽然这会在某种程度上带来一些不方便,但还不是原型的最大问题.原型模式的最大问题是
 * 由其共享的本性所导致的.
 * 原型中所有属性是被很多实例共享的,这种共享对于函数非常合适,对于那些包含基本值的属性倒也说得过去,
 * 毕竟通过实例上天机一个同名属性,可以隐藏原型中对应属性,然而对于包含引用类型值的属性来说,问题就比较突出了
 *如下:
 */
function Person(){}
Person.prototype={
	constructor:Person,
	name:"Nicholas",
	age:29,
	job:"Software Engineer",
	friends:["Shelby","Court"],
	sayName:function(){
		console.log(this.name);
	}
};

var person1=new Person();
var person2=new Person();

person1.friends.push('Van');
console.log(person1.friends);
console.log(person2.friends);
console.log(person1.firends==person2.friends);


































