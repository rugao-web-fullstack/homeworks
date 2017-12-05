var fib = require('./fib.js');
var arg = process.argv.splice(2)[0];
fib.fib(arg);
