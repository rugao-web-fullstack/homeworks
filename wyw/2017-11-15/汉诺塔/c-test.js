const hanoi = require('./c');
var debug = require('debug')('c-test');
var test = hanoi(2, 'A', 'B', 'C').join('-');
debug(test);

