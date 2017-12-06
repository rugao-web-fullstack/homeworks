var fibonacci = require('./fibonacci');
var debug = require('debug');
var num = parseInt(process.argv[2]);
debug(fibonacci(num));