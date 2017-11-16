const Fibtest = require("./module/Fibonacci.js");
const readline = require('readline'); // 引入readline模块
var rl = readline.createInterface({ //创建readline接口实例
	input: process.stdin,
	output: process.stdout
});
rl.question("请输入你想要的数字:", function(n) { // question方法
	console.log(Fibtest(n));
})