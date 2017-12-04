var debug = require('debug')('xxx');
const Fib = require('./fibonacci');
const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Please enter what you want:', function (n) {
  debug('log:' +Fib(n));
});
