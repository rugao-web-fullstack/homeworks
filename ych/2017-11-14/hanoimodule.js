module.exports = function () {
    var hanoiArr = [];
    var hanoi = function (disc, src, aux, dst) {
        if (disc > 0) {
            hanoi(disc - 1, src, dst, aux);
            hanoiArr.push(' 把 ' + disc + ' 号圆盘 ' + ' 从 ' + src + ' 移动到 ' + dst);
            hanoi(disc - 1, aux, src, dst)
        }
        return hanoiArr;
    }
    return hanoi(3, 'A', 'B', 'C')
}

