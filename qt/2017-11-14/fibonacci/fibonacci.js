function fibonacci(num) {
  var arr = [];
  var first = 0;
  var second = 1;
  var sum = 1;
  for (var i = 0; i < num; i++) {
    arr.push(sum);
    sum = first + second;
    first = second;
    second = sum;
  }
  return arr;
}
module.exports = fibonacci;