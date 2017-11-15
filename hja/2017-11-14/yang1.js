//杨辉三角

function evaluate(r, c) {
    if (c == 0) return 1;
    if (r == c) return 1;
    return evaluate(r - 1, c - 1) + evaluate(r - 1, c);
}
function y(n) {
    var res = [];
    for (var i = 0; i < n; i++) {
        var tmp = [];
        for (var j = 0; j <= i; j++) {
            tmp.push(evaluate(i, j));
        }
        res.push(tmp);
    }
    return res;
}

module.exports = y;