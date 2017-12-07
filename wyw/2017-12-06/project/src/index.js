var debug = require('debug')('index');
//斐波那契
var fib = function(n) {
  switch(n) {
  case 0:
  case 1:
    return 1;
  default:
    debug(n);
    if(n<0) {
      throw new Error('error input');
    }
    return fib(n-2)+fib(n-1);
  }
};
exports.fib = fib;

//汉诺塔
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
var nuo = function(n) {
  if(n <= 0) {
    throw new Error('error input');
  }else{
    var a = test(n, 'A', 'B', 'C').join('-');
    return a;
  }
};

exports.nuo = nuo;

 
