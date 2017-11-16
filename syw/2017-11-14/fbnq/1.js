function fei(m) {
    var arr = new Array();

    if (i === 0 || i === 1) {
        return 1;
    } else {
        return fei(n - 1) + fei(n - 2);
    }
    for (var i = 0; i < m; i + +) {
        arr.push(fei(i));
    }
    return arr;
}
exports.fei = fei;