var foo = require('./yang1');
var debug = require('debug')('yang2');
var arg = process.argv.splice(2)[0];
debug('log: '+foo(arg));

