const yhTriangle = require("./Modules/yhTriangle.js");
const readline = require('readline');
var rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
rl.question("请输入你想要的输出行数：",function(m){
	console.log(yhTriangle(m));
});
