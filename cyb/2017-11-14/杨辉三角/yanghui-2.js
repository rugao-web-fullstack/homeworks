var yanghui = require('./yanghui-1');
var readline = require('readline');
var debug = require('debug')('xxx');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('请输入数列长度：', function (n) {
  var arr = yanghui(n);
  for(var i = 0; i < n; i++){
    debug('log:' + arr[i]);
  }
});
