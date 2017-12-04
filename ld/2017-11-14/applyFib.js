var Fibnacci = require('./Modules/Fibonacci');
var readline = require('readline');
var debug = require('debug')('ago');
var rl = readline.createInterface ({
    input : process.stdin,
    output : process.stdout
});

rl.question('请输入你想要的输出长度：', function(n) {
    debug('log: '+Fibnacci(n));
});

