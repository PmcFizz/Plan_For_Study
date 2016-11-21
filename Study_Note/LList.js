/**
数组不总是组织数据的最佳数据结构. JavaScript中数组的主要问题是,他们被实现成了对象.
请参考Crockford 那本书的第六章
如果你发现数组在实际使用中很慢,就可以考虑使用一个链表来替换它.
链表是由一组节点组成的集合,么个节点都使用一个对象的引用指向它的后继.
指向零一个节点的引用叫做链.
**/

function Node(element) {
	this.element=element;
	this.next=null;
}

function LList(){
	this.head=new Node("head");
	this.find=find;
	this.insert=insert;
	this.remove=remove;
	this.display=display;
}

function find(item){
	var currNode=this.head;
	while(currNode.element!=item){
		currNode=currNode.next;
	}
	return currNode;
}

function insert(newElement,item){
	var newNode=newNode(newElement);
	var current=this.find(item);
	newNode.next=current.next;
	current.next=newNode;
}

function display(){
	var currNode=this.head;
	while(!currNode.next==null){
		console.log(currNode.next.element);
		currNode=currNode.next;
	}
}
