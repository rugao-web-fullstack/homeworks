var Hanoi = require('./Modules/Hanoi');
var readline = require('readline');
var debug = require('debug')('ago');
var rl = readline.createInterface ({
    input : process.stdin,
    output : process.stdout
});

rl.question('请输入盘子的个数：', function(num) {
    let move = Hanoi(num, 'A', 'B', 'C');
    debug('log : '+num + '的汉诺塔顺序为：\n' + move);
});

