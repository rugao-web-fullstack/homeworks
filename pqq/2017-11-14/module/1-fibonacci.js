var fabonacci = function(val) {
  var arr = [];
  if(val <= 2) {
    for(var i = 0; i < val; i++) {
      arr[i] = 1;
    }
  } else {
    arr[0] = 1;
    arr[1] = 1;
    for(var j = 2; j < val; j++) {
      arr[j] = arr[j - 1] + arr[j - 2];
    }
  }
  return arr;
};
module.exports.fabonacci = fabonacci;