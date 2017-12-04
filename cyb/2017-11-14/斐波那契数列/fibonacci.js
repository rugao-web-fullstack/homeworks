var fibonacci1 = require('./fibonacci1');
var readline = require('readline');// 引入readline模块
var debug = require('debug')('xxx');

var rl = readline.createInterface({//创建readline接口实例
  input: process.stdin,
  output: process.stdout
});

rl.question('数列长度是:', function (n) {// question方法
  debug('log:' + fibonacci1(n));
});
