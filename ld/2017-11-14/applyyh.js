var yhTriangle = require('./Modules/yhTriangle.js');
var readline = require('readline');
var debug = require('debug')('ago');
var rl = readline.createInterface ({
    input : process.stdin,
    output : process.stdout
});
rl.question('请输入你想要的输出行数：', function(m) {
    debug('log; '+yhTriangle(m));
});
