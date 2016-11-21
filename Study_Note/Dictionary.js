/**
字典是一种以键值对形式存储数据的数据结构,
就像电话号码薄里的名字和电话号码一样.
**/


function Dictionary() {
	this.datastore=new Array();
	this.add=add;
	this.find=find;
	this.remove=remove;
	this.showAll=showAll;
	this.count=count;
}

function add(key,value){
	this.datastore[key]=value;
}

function find(key){
	return this.datastore[key];
}

function remove(key){
	delete this.datastore[key];
}

function showAll(){
	for(var key in Object.keys(this.datastore).sort()){
		console.log(key +" -> "+this.datastore[key]);
	}
}

function count(){
	var n=0;
	for(var key in Object.keys(this.datastore)){
		++n;
	}
	return n;
}

function clear(){
	for(var key in Object.keys(this.datastore)){
		delete this.datastore[key];
	}
}
