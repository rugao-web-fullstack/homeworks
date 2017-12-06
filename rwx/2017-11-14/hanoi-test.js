let hanoi = require('./hanoi');
let moves = hanoi(2, 'A', 'B', 'C');
let debug = require('debug')('hanoi');
debug(moves);
