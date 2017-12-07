var move = [];
function han(n, a, b, c) {
    if (n === 1) {
        move.push(n);
        move.push(a);
        move.push(c);
    } else {
        han(n - 1, a, c, b);
        move.push(n);
        move.push(a);
        move.push(c);
        han(n - 1, b, a, c);
    }
}
function records(n, a, b, c) {
    move = [];
    han(n, a, b, c);
    return move.join(',');
}

module.exports.hanoi = records;