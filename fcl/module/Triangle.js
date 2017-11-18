function Hello(n) {  
	var arr = new Array(n);
	for(var i = 0; i < n; i++){
	    arr[i] = new Array(i + 1);
	    for(var j = 0; j <= i; j++){
	        if(j == 0 || j == i){
	            arr[i][j] = 1;
	        }else{
	            arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
	        }
	    }
	}
	for(var i = 0; i < arr.length; i++){
	    for(var j = 0; j < arr[i].length; j++){
	       console.log(arr[i][j]);
	    };
	 };   
};
module.exports.Hello = Hello;
