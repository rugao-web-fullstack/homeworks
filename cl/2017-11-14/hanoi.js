var debug = require('debug')('xxx');
module.exports = function hanoi(n, a, b, c) {
  if (n == 1) {
    // console.log('Move ' + n + ' from ' + a + ' to ' + c);
    debug('log:' + 'Move ' + n + ' from ' + a + ' to ' + c);
  }
  else {
    hanoi(n - 1, a, c, b);
    // console.log('Move ' + n + ' from ' + a + ' to ' + c);
    debug('log:' + 'Move ' + n + ' from ' + a + ' to ' + c);
    hanoi(n - 1, b, a, c);
  }
};
