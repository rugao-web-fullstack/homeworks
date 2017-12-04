module.exports = function gitFib(n) {
  var fibarr = [];
  var i = 1;
  while (i <= n) {
    if (i == 1 || i == 2) {
      fibarr.push(1);
    } else {
      fibarr.push(fibarr[i - 2] + fibarr[i - 3]);
    }
    i++;
  }
  return fibarr;
};
