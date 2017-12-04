var debug = require('debug')('xxx');
module.exports = function(num) {
    var res = [];

    function fib(n) {
        if(n == 0 || n == 1) {
            return 1;
        } else {
            return fib(n - 1) + fib(n - 2);
        }
    }
    for(var i = 0; i < num; i++) {
        res.push(fib(i));
    }
    debug(res);

};
