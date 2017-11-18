const hanoi = require("./hanoi");

let num = process.argv[2] || 4;
let move = hanoi(num, "A", "B", "C");
console.log(num + "的汉诺塔顺序为：\n" + move);
