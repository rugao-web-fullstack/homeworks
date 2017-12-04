const yanghui = require('./yanghui');
var readline = require('readline');
var  rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('请输入行数:', function(answer){
  var debug = require('debug')('log');
  debug('log'+ yanghui(answer));
  //console.log(yanghui(answer));
  rl.close();
});
