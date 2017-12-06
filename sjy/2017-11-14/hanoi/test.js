var debug = require('debug')('xxx');
var hanoi = require('./hanoi.js');
var num = parseInt(process.argv[2]);
debug('log:' + hanoi(num));