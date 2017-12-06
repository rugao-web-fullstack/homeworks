const hanoi = require('./hanoi');
var debug = require('debug')('log');

let num = process.argv[2] || 4;
let move = hanoi(num, 'A', 'B', 'C');
debug('log' + num + '的汉诺塔顺序为：\n' + move);
