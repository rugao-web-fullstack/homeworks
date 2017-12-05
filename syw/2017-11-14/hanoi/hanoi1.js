let hanoi = require('./hanoi');
let moves = hanoi(2, 'A', 'B', 'C');
var debug = require('debug')('xxx');

debug('log:' + moves);

