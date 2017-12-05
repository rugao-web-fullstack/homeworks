var debug = require('debug')('xxx');
var fibonacci = require('./fibonacci');
var num = parseInt(process.argv[2]);
debug('log:' + fibonacci(num));