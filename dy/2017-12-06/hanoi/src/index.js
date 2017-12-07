var arr = [];
function hanoi(n) {
  move(n, 'a', 'b', 'c');
  var arrs = arr.join();
  arr = [];
  return arrs;
}
function move(n, a, b, c) {
  if (n === 1) {
    arr.push('from ' + a + ' to ' + c);
  } else if (n <= 0) {
    throw new Error('Error Input');
  } else {
    move(n - 1, a, c, b);
    arr.push('from ' + a + ' to ' + c);
    move(n - 1, b, a, c);
  }
}
exports.hanoi = hanoi;