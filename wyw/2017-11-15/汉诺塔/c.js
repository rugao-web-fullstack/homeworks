var debug = require('debug')('c');

function mv(n, src, des,moves) {
  moves.push([n, src, des]);
}
function hanoi(n, src, mid, des,moves) {
  if (n == 1) {
    mv(n, src, des,moves);
    return;
  }
  hanoi(n - 1, src, des, mid,moves);
  mv(n, src, des,moves);
  hanoi(n - 1, mid, src, des,moves);
}
function test(n, src, mid, des) {
  let moves = [];
  hanoi(n, src, mid, des,moves);
  return moves;
}
function nuo(n){
  var a = test(n, 'A', 'B', 'C').join('-');
  debug(a);
}
nuo(2);


