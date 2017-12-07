exports.hello = 'Hello World';

var fib = function (n) {
  switch (n) {
  case 0:
  case 1:
    return 1;
  default:
    if (n < 0) {
      throw new Error('error input');
    }
    return fib(n - 2) + fib(n - 1);
  }
};
exports.fib = fib;