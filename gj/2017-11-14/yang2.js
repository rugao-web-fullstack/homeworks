var debug = require('debug')('log');
var foo = require('./yang1');
var arg = process.argv.splice(2)[0];

// console.log(foo(arg));
debug('log : ' + foo(arg));