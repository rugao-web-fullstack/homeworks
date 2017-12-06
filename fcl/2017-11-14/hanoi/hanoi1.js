var han = require('./hanoi.js');
var arg = process.argv.splice(2);
han(arg[0], arg[1], arg[2], arg[3]);

