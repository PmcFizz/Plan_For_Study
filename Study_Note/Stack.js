/**
栈是一种高效的数据结构,因为数据只能在栈顶添加或删除.
栈被称为后入后出的数据结构 LIFO last-in-fast-out
**/
function Stack() {
	this.dataStore=[];
	this.top=0;
	this.push=push;
	this.pop=pop;
	this.peek=peek;
}

function push(element){
	this.dataStore[this.top++]=element;
}

function pop(){
	return this.dataStore[--this.top];
}

function peek(){
	return this.dataStore[this.top-1];
}

function length(){
	return this.top;
}

function clear(){
	this.top=0;
}

