var debug = require('debug')('log');
const feib = require('./feibo');

let num = process.argv[2] || 3;
let res = feib(num);

debug('log' + num + '的斐波那契数列为' + res);