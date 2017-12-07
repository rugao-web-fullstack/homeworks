var hanoi = function(n, x, y, z) {
  switch (n) {
  case 1:
  case '1':
    var move1 = 'Move ' + n + ' from ' + x + ' to ' + z;
    return move1;
  default:
    if (n < 0) {
      throw new Error('Error Input');
    } else {
      var move2 = 'Move ' + n + ' from ' + x + ' to ' + z;
      return move2;
    }
  }
};
exports.hanoi = hanoi;
