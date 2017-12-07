module.exports = function (num) {
  var str = '';
  var a = 'a';
  var b = 'b';
  var c = 'c';
  Han(a, b, c, num);
  function Han(a, b, c, n) {
    if (n < 1) {
      throw new Error('error input');
    }
    if (n == 1) {
      Move(a, b);
    } else {
      Han(a, c, b, n - 1);
      Move(a, b);
      Han(c, b, a, n - 1);
    }
  }
  function Move(num1, num2) {
    str += num1 + '->' + num2 + ';';
  }
  return str;
};
