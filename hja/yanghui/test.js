var test = require('./test2.js');
//获取参数
var arg = process.argv.splice(2)[0];
test.test(arg);