/**
散列是一种常用的数据存储技术,散列后的数据可以快速的插入或录取,
散列使用的数据结构叫做散列表,在散列表上插入,删除和录用数据都非常快,
但是对于查找操作来说却是效率低下.
**/

function HashTable() {
	this.table=new Array(137);
	this.simpleHash=simpleHash;
	this.showDistro=showDistro;
	this.put=put;
	//this.get=get;
}

function simpleHash(data){
	var total=0;
	for(var i=0;i=data.length;i++){
		total+=data.charCodeAt(i);
	}
	return total%this.table.length;
}

function put(data){
	var pos=this.simpleHash(data);
	this.table[pos]=data;
}

function showDistro(){
	var n=0;
	for(var i=0;i<this.table.length;i++){
		if(this.table[i]!=undefined){
			console.log(i+":"+this.table[i]);
		}
	}
}

function betterHash(string,arr){
	var H=37;
	var total=0;
	for(var i=0;i<string.length;++i){
		total+=H*total+string.charCodeAt(i);
	}
	total=total%arr.length;
	return parseInt(total);
}

