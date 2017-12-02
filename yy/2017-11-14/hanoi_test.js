let hanoi = require("./hanoi.js");
let num = process.argv[2] || 5;
let moves = hanoi(num, 'A', 'B', 'C');
console.log(moves);
