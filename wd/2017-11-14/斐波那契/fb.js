var x = process.argv.splice(2)[0];
var debug = require('debug')('xxx');
var fbnc = require('./fbnc');
debug('log:' + x + '的斐波那契值为：' + fbnc(x));

