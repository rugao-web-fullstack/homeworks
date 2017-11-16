const Fib= require('./Fibonacci');
const readline = require('readline');
var rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
rl.question("请输入需要的输出长度：",function(n){
	console.log(Fib(n));
})