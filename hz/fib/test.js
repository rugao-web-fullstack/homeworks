var n = process.argv.splice(2)[0];
var fbnc = require("./fbnc.js");
if(n<=0){
	console.log("input error");
	return 0;
}
var num = fbnc(n);
console.log("前"+n+"个fibonacci数是"+num);
