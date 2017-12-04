var han = require('./han.js');
var arg = process.argv.splice(2);
var hanoi;
var debug = require('debug')('log');
debug('log'+ han);
hanoi(arg[0], arg[1], arg[2], arg[3]);
