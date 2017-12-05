var hanoi = require('./hanoi.js');
var debug = require('debug');
var num = parseInt(process.argv[2]);
debug(hanoi(num));