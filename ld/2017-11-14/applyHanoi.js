var Hanoi = require('./Modules/Hanoi');
var readline = require('readline');
var debug = require('debug')('ago');
var rl = readline.createInterface ({
    input : process.stdin,
    output : process.stdout
});

rl.question('请输入盘子的个数：', function(n) {
    debug('log: '+Hanoi(n,'A','B','C'));
});

