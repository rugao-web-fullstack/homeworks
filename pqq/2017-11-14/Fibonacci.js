//引用模块
var fab = require('./module/1-fibonacci.js');
var readline = require('readline');
var debug = require('debug')('xxx');

//创建readline借口实例
var rl = readline.createInterface({
  input: process.stdin,
  output: process.strout
});

//创建问题，调用 斐波那契数列
rl.question('输入需要前多少位斐波那契数列？', function(answer) {
  debug('数列：' + fab.fabonacci(answer));
  rl.close();
});
//close事件监听
rl.on('close', function() {
  process.exit(0);
});