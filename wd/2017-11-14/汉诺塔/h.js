var hnt = require('./hnt.js');
var debug = require('debug')('xxx');
var arg = process.argv.splice(2)[0];
debug('log:' + hnt(arg));
