function fibonacci(num) {
    if (num < 0) {
        return -1;
    } else if (num == 0) {
        return 0;
    } else if (num == 1) {
        return 1;
    } else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
}

function test(num) {
    var res = [];
    for (var i = 0; i < num; i++) {
        res[i] = fibonacci(i);
    }
    return res;
}

module.exports = test;

