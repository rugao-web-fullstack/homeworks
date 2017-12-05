const hanoi = require('./hanoi');
var n = parseInt(process.argv[2]);
hanoi(n,'A','B','C');