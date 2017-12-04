//引用模块
var yh = require('./module/2-yanghui.js');
var readline = require('readline');
var debug = require('debug')('xxx');

//创建readline借口实例
var rl = readline.createInterface({
  input: process.stdin,
  output: process.strout
});

//创建问题，调用 杨辉三角
rl.question('多少行杨辉三角', function(answer) {
  for(var i = 0; i < yh.Pascal(answer).length; i++) {
    debug(yh.Pascal(answer)[i]);
  }
  rl.close();
});
//close事件监听
rl.on('close', function() {
  process.exit(0);
});