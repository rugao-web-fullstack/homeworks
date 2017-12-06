//汉诺塔
var moves = [];

function han(num, a, b, c) {
  if (num === 1) {
    moves.push([num, a, c]);
  } else {
    han(num - 1, a, c, b);
    moves.push([num, a, c]);
    han(num - 1, b, a, c);
  }
}

function start(num, a, b, c) {
  moves = [];
  han(num, a, b, c);
  return moves;
}

exports.han1 = start;