const yh= require('./yhTriangle');
const readline = require('readline');
var rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
rl.question("请输入需要的输出行数：",function(n){
	console.log(yh(n));
});
