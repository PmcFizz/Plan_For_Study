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

 	jQuery.extend=jQuery.fn.extend=function(){
 		var options,name,src,copy,copyIsArray,clone,
 			target=arguments[0]||{},
 			i=0,
 			length=arguments.length,
 			depp=false;
 			if(typeof target ==="boolean"){
 				deep=target;
 				target=arguments[i] ||{};
 				i++;
 			}

 			if(typeof target !=="object" && !jQuery.isFunction(target)){
 				target={};
 			}

 			if(i===length){
 				target =this;
 				i--;
 			}

 			for(;i<length;i++){
 				if((options =arguments[i]) !=null){
 					for(name in options){
 						src=target[name];
 						copy=options[name];
 						if(target ===copy){
 							continue;
 						}

 						if(deep && copy && (jQuery.isPlainObject(copy) || 
 							(copyIsArray =jQuery(copy)))){
 							if(copyIsArray){
 								copyIsArray=false;
 								clone=src && jQuery.isArray(src)?src :[];
 							}else{
 								clone=src&& jQuery.isPlainObject(src) ? src :{};
 							}

 							target[name]=jQuery.extend(deep,clone,copy);
 						}else if(copy!=undefined){
 							target[name]=copy;
 						}
 					}
 				}

 			}
 			return target;
 	};

 	jQuery.extend({
 		expando:"jQuery"+(version+Math.random()).replace(/\D/g,""),
 		isReady:true,
 		error:function(msg){
 			throw new Error(msg);
 		},
 		noop:function(){},
 		isFunction:function(obj){
 			return jQuery.type(obj) ==="function";
 		},
 		isArray:Array.isArray,
 		isWindow:function(obj){
 			return obj!=null && obj===obj.window;
 		},
 		isNumeric:function(obj){
 			var realStringObj=obj && obj.toString();
 			return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj)+1)>=0;
 		},
 		isPlainObject:function(){
 			var key;
 			if(jQuery.type(obj) !="object" ||obj.nodeType ||jQuery.isWindow(obj)){
 				return false;
 			}

 			if(obj.constructor && 
 					!hasOwn.call(obj,"constructor")&&
 					!hasOwn.call(obj.constructor.prototype ||{},"isPlainObject")){
 				return false;
 			}
 			for(key in obj){}
 			return key ===undefined || hasOwn.call(obj,key);
 		},
 		isEmptyObjct:function(obj){
 			var name;
 			for(name in obj){
 				return false;
 			}
 			return true;
 		},
 		type :function(obj){
 			if(obj==null){
 				return obj+"";
 			}

 			return typeof obj==="object" || typeof obj ==="function"?
 				class2type[toString.call(obj)] ||"object":
 				typeof obj;
 		},
 		globalEval:function(code){
 			var script,
 				indirect=eval;
 			code=jQuery.trim(code);
 			if(code){
 				if(code.indexOf("use strict") ===1){
 					script=document.createElement("script");
 					script.text=code;
 					document.head.appendChild(script).parentNode.removeChild(script);
 				}else{
 					indirect(code);
 				}
 			}
 		},
 		cameClass:function(string){
 			return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);
 		},
 		nodeName:function(elem,name){
 			return elem.nodeName &&elem.nodeName.toLowerCase()===name.toLowerCase();
 		},
 		each:function(obj,callback){
 			var length,i=0;
 			if(isArrayLike(obj)){
 				length=obj.length;
 				for(;i<length;i++){
 					if(callback.call(obj[i],i,obj[i])==false){
 						break;
 					}
 				}
 			}else{
 				for(i in obj){
 					if(callback.call(obj[i],i,obj[i])===false){
 						break;
 					}
 				}
 			}
 			return obj;
 		},
 		trim:function(text){
 			return text==null ?
 				"":
 				(text+"").replace(rtrim,"");
 		},
 		makeArray:function(arr,results){
 			var ret=results ||[];
 			if(arr!=null){
 				if(isArrayLike(Object(arr))){
 					jQuery.merge(ret,
 						typeof arr ==="string" ?
 						[arr] :arr);
 				}else{
 					push.call(ret,arr);
 				}
 			}
 			return ret;
 		},
 		merge:function(first,second){
 			var len=+second.length,
 				j=0,
 				i=first.length;
 				for(;j<len;j++){
 					first[i++]=second[j];
 				}
 				first.length=i;
 				return first;
 		},
 		grep:function(elems,callback,invert){
 			var callbackInverse,
 				matches=[],
 				i=0,
 				length=elems.length,
 				callbackExpect=!invert;
 				for(;i<length;i++){
 					callbackInverse=!callback(elems[i],i);
 					if(callbackInverse!==callbackExpect){
 						matches.push(elems[i]);
 					}
 				}
 				return	matches
 		},

 		map:function(elems,callback,arg){
 			var length,value,
 				i=0,
 				ret=[];
 				if(isArrayLike(elems)){
 					length=elems.length;
 					for(;i<length;i++){
 						value=callback(elems[i],i,arg);
 						if(value !=null){
 							ret.push(value);
 						}
 					}
 				}else{
 					for(i in elems){
 						value=callback(elems[i],i,arg);
 						if(value !=null){
 							ret.push(value);
 						}
 					}
 				}
 				return concat.apply([],ret);
 		},
 		guid:1,
 		proxy:function(fn,context){
 			var tmp,args,proxy;;
 			if(typeof context ==="string"){
 				tmp=fn[context];
 				context=fn;
 				fn=tmp;
 			}
 			if(!jQuery.isFunction(fn)){
 				return undefined;
 			}
 			args=slice.call(arguments,2);
 			proxt=function(){
 				return fn.apply(context||this,args.concat(slice.call(arguments)));
 			};
 			proxy.guid=fn.guid=fn.guid||jQuery.guid++;
 			return proxy;
 		},
 		now:Date.now,
 		support:support
 	});
 	//line 512

 	if(typeof Symbol ==="function"){
 		jQuery.fn[Symbol.iterator]=arr[Symbol.iterator];
 	}
 	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(""),
 	function(i,name){
 		class2type["[object"+name+"]"]=name.toLowerCase();
 	});

 	function isArrayLike(obj){
 		var length=!!obj && "length" in obj && obj.length,
 			type =jQuery.type(obj);
 			if(type ==="function" ||jQuery.isWindow(obj)){
 				return false;
 			}

 			return type ==="array" ||length===0||
 				typeof length ==="number" && length >0&&(length-1) in obj;
 	}

 	var Sizzle=

 	(function(window){

 		var i,
 			support,
 			Expr,
 			getText,
 			isXML,
 			tokenize,
 			compile,
 			select,
 			outermostContext,
 			sortInput,
 			hasDuplicate,

 			setDocument,
 			document,
 			docElem,
 			documentIsHTML,
 			rbuggyQSA,
 			rbuggyMatches,
 			matches,
 			contains,

 			expando="sizzle"+1*new Date(),
 			preferredDoc=window.document,
 			dirruns=0,
 			done=0,
 			classCache=createCache(),
 			tokenCache=createCache(),
 			compilerCache=createCache(),
 			sortOrder=function(a,b){
 				if(a===b){
 					hasDuplicate=true,
 				}
 				return 0;
 			},
 			MAX_NEGATIVE=1<<31,
 			hasOwn=({}).hasOwnProperty,
 			arr=[],
 			pop=arr.pop,
 			push_native=arr.push,
 			push=arr.push,
 			slice=arr.slice,
 			indexOf=function(list,elem){
 				var i=0,
 					len=list.length;
 				for(;i<len;i++){
 					if(list[i]===elem){
 						return i;
 					}
 				}
 				return -1;
 			},

 			booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|mutiple|open|readonly|required|scoped",

 			whitespace="[\\x20\\t\\r\\n\\f]",
 			identifier="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
 			attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+
 				"*([*^$|!~]?=)"+whitespace+
 				//line 632







 	})



 }))