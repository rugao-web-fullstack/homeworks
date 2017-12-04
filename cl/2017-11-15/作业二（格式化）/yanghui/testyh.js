var debug = require('debug')('xxx');
var yh = require('./yanghui');
var num = process.argv.splice(2)[0];
// console.log(yh(num));
debug('log:' + yh(num));
