const fib = require("./fib");
var num = process.argv.splice(2)[0];
for (var i = 1; i <= num; i++) {
    console.log(fib(i));
}