var n = process.argv.splice(2)[0];
var yhsj = require("./yhsj.js");
if(n<=0){
	console.log("input error");
	return 0;
}else{
	var arr = yhsj(n);
	for(var i=0;i<n;i++){
		console.log(arr[i]);
	}
}


