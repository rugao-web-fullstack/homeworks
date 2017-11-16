function yanghui(m, n) {
    if (n == 0) return 1;
    if (m == n) return 1;
    return yanghui(m - 1, n - 1) + yanghui(m - 1, n);
}

function test(num) {
    var res = [];
    for (var i = 0; i < num; i++) {
        var tmp = [];
        for (var j = 0; j <= i; j++) {
            tmp.push(yanghui(i, j));
        }
        res.push(tmp);
    }
    return res;
}

module.exports = test
