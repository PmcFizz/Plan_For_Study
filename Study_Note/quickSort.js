var quickSort=function(arr){
	if(arr.length<=1){return arr};
	var jizhunIndex=Math.floor(arr.length/2);
	var jizhun=arr.splice(jizhunIndex,1)[0];
	var right=[],left=[];
	for(var i=0;i<arr.length;i++){
		if(jizhun<arr[i]){
			right.push(arr[i])
		}else{
			left.push(arr[i]);
		}
	}
	return quickSort(left).concat([jizhun],quickSort(right));
}
var ar=[12,345,5,567,576,6797,34,34,45,346,23234,64647,456];
quickSort(ar);