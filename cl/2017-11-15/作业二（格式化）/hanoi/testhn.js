var debug = require('debug')('xxx');
var hnt = require('./hanoi.js');
var arg = process.argv.splice(2)[0];
// console.log(hnt(arg));
debug('log:' + hnt(arg));
