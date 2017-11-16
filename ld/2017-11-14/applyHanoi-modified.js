const Hanoi = require("./Hanoi");
const readline = require('readline');
var rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

rl.question("请输入盘子的个数：",function(num){
	let move = Hanoi(num, "A", "B", "C");
	console.log(num + "的汉诺塔顺序为：\n" + move);
});

