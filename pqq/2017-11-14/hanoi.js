//引用模块
var han = require('./module/3-hanoi.js');
var readline = require('readline');
var debug = require('debug')('xxx');

//创建readline借口实例
var rl = readline.createInterface({
  input: process.stdin,
  output: process.strout
});

//创建问题，调用 斐波那契数列
rl.question('输入多少个盘子？', function(answer) {
  let move = han(answer, 'A', 'B', 'C');
  debug(answer + '的汉诺塔顺序为：\n' + move);
  rl.close();
});
//close事件监听
rl.on('close', function() {
  process.exit(0);
});