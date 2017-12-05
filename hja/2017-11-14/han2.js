var foo = require('./han1');
var debug = require('debug')('han2');
var arg = process.argv.splice(2);
debug('log: ' + foo.han1(arg[0], arg[1], arg[2], arg[3]));

