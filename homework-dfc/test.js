const fibonacci = require('./module/Fibonacci');
const yanghui = require('./module/yanghui');
const Hanoi = require('./module/Hanoi');
const readline = require('readline');
var rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
rl.question('请选择模块序号：1.斐波那契数列，2.杨辉三角，3.汉诺塔\n',function(cho){
	console.log(cho);
	switch(cho){
		case '1':
			rl.question('请输入数列长度：',function(n){
				console.log(fibonacci(n));
			});
			break;
		case '2':
			rl.question('请输入数列长度：',function(n){
				var arr = yanghui(n);
				for(var i=0;i<n;i++){
					console.log(arr[i]);
				}
			});
			break;
		case '3':
			rl.question('请输入盘子个数：',function(n){
				var arr = Hanoi(n);
				for(var i=0;i<arr.length;i++){
					console.log(arr[i]);
				}
			});
			break;
	}
});
