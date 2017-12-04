const Tritest = require('./module/Triangle.js');
const readline = require('readline'); //引入readline模块
var rl = readline.createInterface({ //创建readline接口实例
    input: process.stdin,
    output: process.stdout
});
rl.question('请输入行数:', function(n) { // question方法
    Tritest(n);
    rl.close();
});