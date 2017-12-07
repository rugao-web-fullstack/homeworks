
var arr = [];
function hunt(n) {
  hanoi(n, 'a', 'b', 'c');
  var arrs = arr.join();
  arr = [];
  return arrs;
}
function hanoi(n, a, b, c) {
  if (n === 1) {
    arr.push('from ' + a + ' to ' + c);
  } else if (n <= 0) {
    throw new Error('Error Input');
  } else {
    hanoi(n - 1, a, c, b);
    arr.push('from ' + a + ' to ' + c);
    hanoi(n - 1, b, a, c);
  }
}
module.exports = hunt;