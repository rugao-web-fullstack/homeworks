module.exports = function(m) {
  var array = new Array();
  for (var i = 0; i < m; i++) {
    array[i] = new Array();
    for (var j = 0; j < m; j++) {
      if (j == 0){
        array[i][j] = 1;
      } else if (i == j){
        array[i][j] = 1;
      } else if (j > i){
        array[i][j];
      } else {
        array[i][j] = array[i - 1][j - 1] + array[i - 1][j];
      }
    }
  }
  return array;
};