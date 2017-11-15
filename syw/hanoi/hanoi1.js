const hannuota = require('./hannuota');
const readline = require('readline');// 引入readline模块

var  rl = readline.createInterface({//创建readline接口实例
    input:process.stdin,
    output:process.stdout
});

rl.question("黄金圆盘片数是:",function(n) {// question方法
    console.log(han(n));
})
