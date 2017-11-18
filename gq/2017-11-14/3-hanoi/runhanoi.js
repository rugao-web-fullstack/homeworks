let hanoi = require("./hanoi");
let num = process.argv[2] || 4;
let z = hanoi(num, 'A', 'B', 'C');
console.log(z);