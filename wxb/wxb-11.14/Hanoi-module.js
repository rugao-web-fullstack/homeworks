var array = [];

module.exports = function hanoi(n, a, b, c) {
  if (n == 1) {
    array.push('Move ' + n + ' from ' + a + ' to ' + c);
  }
  else {
    hanoi(n - 1, a, c, b);
    array.push('Move ' + n + ' from ' + a + ' to ' + c);
    hanoi(n - 1, b, a, c);
  }
  return array;
};
