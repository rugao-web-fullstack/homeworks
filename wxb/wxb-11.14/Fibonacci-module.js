module.exports = function fib(n) {
    var array = [];

    function fn(n) {
        if (n < 2) {
            return 1;
        }
        else {
            return fn(n - 1) + fn(n - 2);
        }
    }

    for (var i = 0; i < n; i++) {
        array.push(fn(i));
        // console.log(array[i]);
    }
    return array;
};
