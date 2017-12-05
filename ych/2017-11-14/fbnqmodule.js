module.exports = function () {
  function fbnq(m) {
    if (m <= 2) {
      return 1;
    }
    return fbnq(m - 1) + fbnq(m - 2);
  }
  function print(n) {
    var fbnqArr = [];
    for (var i = 1; i <= n; i++) {
      fbnqArr.push(fbnq(i));

    }
    return fbnqArr;
  }
  return print(5);
};
