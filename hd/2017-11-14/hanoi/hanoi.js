var step = 0;
var arr = [];

function hanoi(num) {
  move('1', '3', num);
  return arr;
}

function move(start, end, move_num) {
  if (move_num == 1) {
    arr.push('第' + (++step) + '步 ' + start + '---->' + end);
  } else {
    var other = '123'.replace(start, '').replace(end, '');
    move(start, other, move_num - 1);
    move(start, end, 1);
    move(other, end, move_num - 1);
  }
}

module.exports = hanoi;