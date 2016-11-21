/**
队列是一种列表,不同的是队列只能在队尾插入元素,在队首删除元素,
队列用于存储安顺序排列的数据.先进先出.
队列是一种先进先出的数据结构FIFO (First-In-First-Out)

**/

function  Queue() {
	this.dataStore=[];
	this.enqueue=enqueue;
	this.dequeue=dequeue;
	this.front=front;
	this.back=back;
	this.toString=toString;
	this.empty=empty;
}

function enqueue(element){
	this.dataStore.push(element);
}

function dequeue(){
	return this.dataStore.shift();
}

function front(){
	return this.dataStore[0];
}

function back(){
	return this.dataStore[this.dataStore.length-1];
}

function toString(){
	var retStr="";
	var len=this.dataStore.length;
	for(var i=0;i<len;++i){
		retStr+=this.dataStore[i]+"\n";
	}
	return retStr;
}

function empty(){
	if(this.dataStore.length==0){
		return true;
	}else{
		return false;
	}
}
