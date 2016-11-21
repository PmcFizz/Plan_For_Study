/**
集合(Set) 是一种包含不同元素的数据结构,集合中的元素成为成员.
集合的二个最重要特性是:首先集合中的成员是无序的,其次集合中不允许相同成员存在.
集合的定义:
1:不包含任何成员的集合成为空集,全集则是包含一切可能可能成员的集合
2:如果二个集合的成员完全相同,则称二个集合相等.
3:如果一个集合中所有的成员都属于另一个集合,则前一集合称为后一集合的子集.
**/

function Set() {
	this.dataStore=[];
	this.add=add;
	this.remove=remove;
	this.size=size;
	this.union=union;
	this.intersect=intersect;
	this.subset=subset;
	this.difference=difference;
	this.show=show;
}

function add(data){
	if(this.dataStore.indexOf(data)<0){
		this.dataStore.push(data);
		return true;
	}else{
		return false;
	}
}

function remove(data){
	var pos=this.dataStore.indexOf(data);
	if(pos>-1){
		this.dataStore.splice(pos,1);
		return true;
	}else{
		return false;
	}
}

function show(){
	return this.dataStore;
}

function contains(data){
	if(this.dataStore.indexOf(data)>-1){
		return true;
	}else{
		return false;
	}
}

function union(set){
	var tempSet=new Set();
	for(var i=0;i<this.dataStore.length;i++){
		tempSet.add(this.dataStore[i]);
	}
	for(var i=0;i<set.dataStore.length;i++){
		if(!tempSet.contains(set.dataStore[i])){
			tempSet.dataStore.push(set.dataStore[i]);
		}
	}
	return tempSet;
}

function intersect(set){
	var tempSet=new Set();
	for(var i=0;i<this.dataStore.length;i++){
		if(set.contains(this.dataStore[i])){
			tempSet.add(this.dataStore[i]);
		}
	}
	return tempSet;
}


function subset(set){
	if(this.size() >set.size()){
		return false;
	}else{
		for(var member in this.dataStore){
			if(!set.contains(member)){
				return false;
			}
		}
	}
	return true;
}

function size(){
	return this.dataStore.length;
}


function difference(set){
	var tempSet=new Set();
	for(var i=0;i<this.dataStore.length;i++){
		if(!set.contains(this.dataStore[i])){
			tempSet.add(this.dataStore[i]);
		}
	}
	return tempSet;
}
