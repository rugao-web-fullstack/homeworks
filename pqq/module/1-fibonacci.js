var  arr=[];

var fabonacci=function (val){
		if (val<=2) {
			for(var i=0;i<val;i++){
				arr[i]=1;
			}
		} else{
			arr[0]=1;
			arr[1]=1;
			for (var i=2;i<val;i++) {
				
				arr[i]=arr[i-1]+arr[i-2];
			}
		}
		console.log(arr);
	}


module.exports.fabonacci =fabonacci; 