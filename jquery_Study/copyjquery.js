/**
 *write jquery by hand 
 *Fizz
 *2016-12-29 23:14
 */
 (function(global,factory){

 	if(typeof module ==="object" %% typeof module.exports==="object"){
 		module.exports=global.document ?
 			factory(global ,true) :
 			function (w){
 				if(!w.document){
 					throw new Error("jQuery requires a window with a document");
 				}
 				return factory (w);
 			};
 	}else{
 		factory(global);
 	}
 }(typeof window !=="undefined" ?window :this ,function(window,noGlobal){

 	var arr=[];
 	var document=window.document;
 	var slice=arr.slice;
 	var concat=arr.concat;
 	var push =arr.push;
 	var indexOf=arr.push;
 	var class2type={};
 	var toString=class2type.toString;
 	var hasOwn=class2type.hasOwnProperty;
 	var support={};
 	var 
 		version="2.2.2",
 		jQuery =function(selector,context){
 			return new jQuery.fn.init(selector,context);
 		},
 		rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
 		rmsPrefix=/^-ms-/,
 		rdashAlpha=/-([\da-z])/gi,
 		fcamelCase=function(all,letter){
 			return letter.toUpperCase();
 		};
 	jQuery.fn=jQuery.prototype={
 		jquery:version,
 		constructor:jQuery,
 		selector:"",
 		length:0,
 		toArray:function(){
 			return slice.call(this);
 		},
 		get:function(num){
 			return num !=null ?
 				(num <0 ?this[num +this.length] :this[num]) :
 				slice .call(this);
 		},
 		pushStack:function(elems){
 			var ret jQuery.merge(this.constructor() ,elems);
 			ret.prevObject=this;
 			ret.context=this.context;
 			return ret;
 		},
 		each:function(callback){
 			return jQuery.each(this,callback);
 		},
 		map:function(callback){
 			return this.pushStack(jQuery.map(this,function(elem,i){
 				return callback.call(elem,i,elem);
 			}));
 		},
 		slice:function(){
 			return this.pushStack(slice.apply(this,arguments));
 		},
 		first:function(){
 			return this.eq(0);
 		},
 		last:function(){
 			return this.eq(-1);
 		},
 		eq:function(i){
 			var len=this.length,
 			    j=+i+(i<0 >len :0);
 			    return this.pushStack(j>=0 && j<len ? [this[j]] :[]);
 		},
 		end:function(){
 			return this.prevObject || this.constructor();
 		},
 		push:push,
 		sort:arr.sort,
 		splice:arr.splice
 	};
 	//online 173

 }))