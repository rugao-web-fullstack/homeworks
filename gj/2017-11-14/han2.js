var debug = require('debug')('log');
var foo = require('./han1');

var arg = process.argv.splice(2);
// console.log(foo.han1(arg[0], arg[1], arg[2], arg[3]));
debug('log : ' + foo.han1(arg[0], arg[1], arg[2], arg[3]));