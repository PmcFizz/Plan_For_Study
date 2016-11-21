/**
列表的抽象数据类型定义
listSize (属性)  列表的元素个数
pos(属性)  列表的当前位置
lenghth (属性) 返回列表中元素的个数
clear(方法)  清空列表中所有的元素
toString(方法) 返回列表的字符创形式
getElement(方法) 返回当前位置的元素
insert(方法)  在现有元素后插入新元素
append(方法) 在列表的末尾添加新元素
remove(方法) 从列表中删除元素
front(方法)  将列表的当前位置设移动到第一个元素
end(方法) 将列表的低昂为位置移动到最后一个元素
prev(方法) 将当前位置后移一位
next(方法) 将当前位置前移一位
currPos(方法) 返回列表的当前位置
noveTo(方法) 将当前位置移动到指定位置
**/

 function List(){
 	this.listSize=0;
 	this.pos=0;
 	this.dataStore=[]; //初始化一个空的数据来保存列表元素
 	this.clear=clear;
 	this.find=find;
 	this.toString=toString;
 	this.insert=insert;
 	this.append=append;
 	this.remove=remove;
 	this.front=front;
 	this.end=end;
 	this.prev=prev;
 	this.next=next;
 	this.length=length;
 	this.currPos=currPos;
 	this.moveTo=moveTo;
 	this.getElement=getElement;
 	this.length=length;
 	this.contains=contains;
 }

//给列表添加元素
 function append(element){
 	this.dataStore[this.listSize++]=element;
 }

//在列表中查找某一元素
function find(element){
	for(var i=0;i<this.dataStore.length;i++){
		if(this.dataStore[i]==element){
			return i;
		}
	}
	return -1;
}

//移除一个元素
function remove(element){
	var foundAt=this.find(element);
	if(foundAt>-1){
		this.dataStore.splice(foundAt,1);
		--this.listSize;
		return true;
	}
	return false;
}

//获取数组长度
function length(){
	return this.listSize;
}

//获得数组字符串
function toString(){
	return this.dataStore;
}

//在一个元素后插入一个元素
function insert(element,after){
	var insertPos=this.find(after);
	if(insertPos>-1){
		this.dataStore.splice(insertPos+1,0,element);
		++this.lsiSize;
		return true;
	}
	return false;
}

//情况数组
function clear(){
	delete this.dataStore;
	this.dataStore=[];
	this.listSize=this.pos=0;
}

//是否包含一个元素
function contains(element){
	var len=this.dataStore.length;
	for(var i=0;i<len;i++){
		if(this.dataStore[i]==element){
			return true;
		}
	}
	return false;
}


function front(){
	this.pos=0;
}

function end(){
	this.pos=this.listSize-1;
}

function prev(){
	if(this.pos>0){
		--this.pos;
	}
}

function next(){
	if(this.pos<this.listSize-1){
		++this.pos;
	}
}

function currPos(){
	return this.pos;
}

function moveTo(position){
	this.pos=position;
}

function getElement(){
	return this.dataStore[this.pos];
}

