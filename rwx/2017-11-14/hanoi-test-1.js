let hanoi = require('./hanoi-1');
let num = process.argv[2] || 5;
let moves = hanoi(num, 'A', 'B', 'C');
let debug = require('debug')('hanoi');
debug(moves);
