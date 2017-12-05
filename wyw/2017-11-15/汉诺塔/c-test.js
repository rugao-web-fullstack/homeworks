const hanoi = require('./c');
var debug = require('debug')('c-test');
var test = hanoi(3, 'A', 'B', 'C');
debug('log'+test);

