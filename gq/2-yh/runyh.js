const yh = require("./yh");
var readline = require('readline');
var  rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
rl.question("请输入数字:",function(answer){
	yh(answer);
    	rl.close();
});
