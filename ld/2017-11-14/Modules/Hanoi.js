module.exports = function Hanoi(n, a, b, c) {
    var debug = require('debug')('ago');
    if (n == 1) {
        debug('log: '+'Move ' + n + ' from ' + a + ' to ' + c);
    } else {
        Hanoi(n - 1, a, c, b);
        debug('log: '+'Move ' + n + ' from ' + a + ' to ' + c);
        Hanoi(n - 1, b, a, c);
    }
};
