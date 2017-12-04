var debug = require('debug')('nj');
const hanoi = require('./module/hanoi');
let num = process.argv[2] || 5;
let move = hanoi(num, 'A', 'B', 'C');
debug(num + '的汉诺塔顺序为：\n' + move);
