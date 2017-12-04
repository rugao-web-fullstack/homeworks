var Hanoi = require('./Hanoi');
var readline = require('readline');
var debug = require('debug')('xxx');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('请输入数列长度：', function(n){
  var arr = Hanoi(n);
  for(var i = 0; i < arr.length ; i++){
    debug('log:' + arr[i]);
  }
});
