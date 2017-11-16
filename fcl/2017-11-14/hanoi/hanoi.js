let moves = [];
function mv(num, a, c) {
    moves.push([num, a, b]);
}

function hanoi(num, a, b, c) {
    if (n === 1) {
        mv(num, a, c);
        return
    }
    hanoi(n - 1, a, b, c);
    mv(num, a, b);
    hanoi(n - 1, a, b, c)
}

function records(num, a, b, c) {
    moves = [];
    hanoi(num, a, b, c);
    return moves;
}

module.exports = records;
