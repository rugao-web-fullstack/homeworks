const yanghui = require("./yanghui");
var readline = require('readline');
var  rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
rl.question("请输入行数:",function(answer){
	yanghui(answer);
    	rl.close();
});
