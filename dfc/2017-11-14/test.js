var fibonacci = require('./module/Fibonacci');
var yanghui = require('./module/yanghui');
var Hanoi = require('./module/Hanoi');
var readline = require('readline');
var debug = require('debug')('show');
var rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});
rl.question('请选择模块序号：1.斐波那契数列，2.杨辉三角，3.汉诺塔\n',function(cho){
  switch(cho){
  case '1':
    rl.question('请输入数列长度：',function(n){
      if(n<=0){
        debug('log:' + '请输入正确的数值');
      }else{
        debug('log:' + fibonacci(n));
      }
    });
    break;
  case '2':
    rl.question('请输入数列长度：',function(n){
      if(n<=0){
        debug('log:' + '请输入正确的数值');
      }else{
        var arr = yanghui(n);
        for(var i=0;i<n;i++){
          debug('log:' + arr[i]);
        }
      }
    });
    break;
  case '3':
    rl.question('请输入盘子个数：',function(n){
      if(n<=0){
        debug('log:' + '请输入正确的数值');
      }else{
        var arr = Hanoi(n);
        for(var i=0;i<arr.length;i++){
          debug('log:' + arr[i]);
        }
      }
    });
    break;
  }
});
