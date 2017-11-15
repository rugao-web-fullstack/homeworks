const yanghui = require('./yanghui');
const readline = require('readline');// 引入readline模块

var  rl = readline.createInterface({//创建readline接口实例
    input:process.stdin,
    output:process.stdout
});

rl.question("杨辉三角的高度是:",function(n) {// question方法
    console.log(yanghui(n));
})
