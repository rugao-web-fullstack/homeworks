
var debug = require('debug')('xxx');
var hnt = require('./hanoi.js');
var arg = process.argv.splice(2)[0];
debug('log:' + hnt(arg));
