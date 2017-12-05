module.exports = function (n) {
  var arr = [];

  for(var i = 0; i < n; i++) {
    arr[i] = [];
  }

  if(n >= 1){
    for(i = 0; i < n; i++) {
      for(var j = 0; j < i+1; j++) {
        if(j == 0 || j == i) {
          arr[i][j] = 1;
        }else{
          arr[i][j] = arr[i-1][j-1] + arr[i-1][j];
        }
      }
    }
  }
  return arr;
};