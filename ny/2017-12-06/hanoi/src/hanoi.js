var arr = [];
var hanoi = function(n) {
  hnt(n, 'a', 'b', 'c');
  var arrs = arr.join();
  arr = [];
  return arrs;
};
function hnt(n, a, b, c) {
  if (n === 1) {
    arr.push('from ' + a + ' to ' + c);
  } else if (n <= 0) {
    throw new Error('error input');
  } else {
    hnt(n - 1, a, c, b);
    arr.push('from ' + a + ' to ' + c);
    hnt(n - 1, b, a, c);
  }
}
exports.hanoi = hanoi;
