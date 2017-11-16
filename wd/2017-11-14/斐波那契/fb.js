var x = process.argv.splice(2)[0];
const fbnc = require("./fbnc");
console.log(x+"的斐波那契值为："+fbnc(x));

