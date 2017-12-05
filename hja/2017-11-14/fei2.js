var foo = require('./fei1');
var debug = require('debug')('fei2');
var arg = process.argv.splice(2)[0];
foo.fei1(arg);
debug('log:' + foo.fei1(arg));

