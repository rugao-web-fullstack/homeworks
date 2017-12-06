var debug = require('debug')('gq');
let hanoi = require('./hanoi');
let num = process.argv[2] || 4;
let z = hanoi(num, 'A', 'B', 'C');
debug(z);