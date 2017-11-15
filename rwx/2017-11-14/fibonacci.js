function fibonacci(n) {
  if (n < 0) {
    return -1;
  }
  switch (n) {
    case 0:
      return 0;
    case 1:
      return 1;
    default:
      return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

function fa(n) {
  let res = [];
  for (var i = 0; i < n; i++) {
    res[i] = fibonacci(i);
  }
  return res;
}

module.exports = fa;
