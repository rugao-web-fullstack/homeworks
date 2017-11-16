const feib = require("./feibo");

let num = process.argv[2] || 3;
let res = feib(num);

console.log(num + "的斐波那契数列为：\n" + res);
