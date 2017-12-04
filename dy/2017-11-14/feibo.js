function feibo (n) {
  if (n < 0) {
    return -1;
  }
  switch (n) {
  case 0:
    return 1;
  case 1:
    return 1;
  default:
    return feibo(n-1) + feibo(n-2);
  }
}

function fa (n) {
  let res = [];
  for (var i = 0; i < n; i++) {
    res[i] = feibo(i);
  }
  return res;
}

module.exports = fa;
