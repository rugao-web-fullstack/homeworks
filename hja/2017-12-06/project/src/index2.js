//汉诺塔
var moves = [];
function han(num, a, b, c) {
  if (num === 1) {
    moves.push(num);
    moves.push(a);
    moves.push(c);
  } else {
    han(num - 1, a, c, b);
    moves.push(num);
    moves.push(a);
    moves.push(c);
    han(num - 1, b, a, c);
  }
}
function start(num, a, b, c) {
  moves = [];
  han(num, a, b, c);
  return moves.join(',');
}
exports.han1 = start;
