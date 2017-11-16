function fib(n) {
  if (n < 0) {
    return -1;
  }
  switch (n) {
    case 0:
      return 0;
    case 1:
      return 1;
    default:
      return fib(n - 1) + fib(n - 2);
  }
}

function fa(n) {
  let res = [];
  for (var i = 0; i < n; i++) {
    res[i] = fib(i);
  }
  return res;
}

module.exports = fa;