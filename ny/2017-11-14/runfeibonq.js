const feibo = require("./feibonq");
var readline = require('readline');
var  rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.question("请输入数字:", function(n) {
	for(var i=1; i<=n; i++){
		console.log(feibo(i));
	}
	rl.close();
});