var debug = require('debug')('log');
const fib = require('./1');
var num = process.argv.splice(2)[0];
for (var i = 1; i <= num; i++) {
  debug('log:' + fib(i));
}
