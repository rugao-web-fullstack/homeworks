var debug = require('debug')('log');
module.exports = function hanoi(n,x,y,z) {
  if(n == 1){
    debug('log:' + 'Move '+n+' from '+x+' to '+z);
  } else {
    hanoi(n-1, x, z, y);
    debug('log:' + 'Move '+n+' from '+x+' to '+z);
    hanoi(n-1, y, x, z);
  }
};

