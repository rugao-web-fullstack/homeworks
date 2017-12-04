var debug = require('debug')('xxx');
module.exports = function yanghui(n) {
  var tArray = new Array();
  for (var i = 0; i < n; i++) {

    tArray[i] = new Array();

    for (var j = 0; j < n; j++) {

      tArray[i][0] = 1;
      tArray[i][i] = 1;
    }

  }
  for (i = 2; i < n; i++) {

    for (j = 1; j < i; j++) {

      tArray[i][j] = tArray[i - 1][j - 1] + tArray[i - 1][j];
    }

  }

  for (i = 0; i < n; i++) {

    // console.log(tArray[i] + ' ');
    debug('log:' + tArray[i] + ' ');

  }



};
