var debug = require('debug')('log');
var foo = require('./fei1');

var arg = process.argv.splice(2)[0];
foo.fei1(arg);
// console.log(foo.fei1(arg));
debug('log : ' + foo.fei1(arg));
