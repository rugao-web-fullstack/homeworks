function evaluate(r, c) {
  if (c == 0) return 1;
  if (r == c) return 1;
  return evaluate(r - 1, c - 1) + evaluate(r - 1, c);
}
function y(n) {
  let res = [];
  for (let i = 0; i < n; i++) {
    let tmp = [];
    for (let j = 0; j <= i; j++) {
      tmp.push(evaluate(i, j));
    }
    res.push(tmp);
  }
  return res;
}

module.exports = y;

