const Hanoi = require("./Modules/Hanoi");
const readline = require('readline');
var rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

rl.question("请输入盘子的个数：",function(n){
	console.log(Hanoi(n,'A','B','C'));
})

