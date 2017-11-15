const hanoi = require("./hanoi");
var readline = require('readline');
var  rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
rl.question("请输入盘子个数以及柱子号码（逗号间隔）：",function(an){
	var result=an.split(",");
	hanoi(result[0],result[1],result[2],result[3]);
    	rl.close();
});
