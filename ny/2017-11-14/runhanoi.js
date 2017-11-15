const hanoi = require("./hanoi");
var readline = require('readline');
var  rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.question("请输入要移动的总数以及3根柱子的编号（以逗号间隔）：", function(an) {
	var result = an.split(",");
	hanoi(result[0], result[1], result[2], result[3]);
    	rl.close();
});
