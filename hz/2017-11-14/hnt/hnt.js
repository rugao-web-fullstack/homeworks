var debug = require('debug')('xxx');
function hnt(n, a, b, c) {
  if (n === 1) {
    debug('log:' + 'Move ' + n + ' from ' + a + ' to ' + c);
  } else {
    hnt(n - 1, a, c, b);
    debug('log:' + 'Move ' + n + ' from ' + a + ' to ' + c);
    hnt(n - 1, b, a, c);
  }
}
module.exports = hnt;
