//二分法查找

//非递归算法
function binary_search(arr,key) {
	var low=0,
		high=arr.length-1;
		while(low<=high){
			var mid=parseInt((high+low)/2);
			if(key==arr[mid]){
				return arr[mid]
			}else if(key>arr[mid]){
				low=mid+1;
			}else if(key<arr[mid]){
				high=mid-1;
			}else{
				return -1;
			}
		}
}

//递归算法
function binarySearch(arr,low,high,key){
	if(low>high){
		return -1;
	}
	var mid=parseInt((high+low)/2);
	if(arr[mid]==key){
		return arr[mid];
	}else if(arr[mid]>key){
		high=mid-1;
		return binarySearch(arr,low,high,key);
	}else if(arr[mid]<key){
		low=mid+1;
		return binarySearch(arr,low,high,key);
	}
}
var arr=[1,2,3,4,5,6,7,8,9,10,11,23,44,86];
var result=binarySearch(arr,0,13,10);