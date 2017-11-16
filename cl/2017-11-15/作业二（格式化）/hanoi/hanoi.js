var arr = [];
function hunt(n) {
    hanoi(n, "a", "b", "c");
    return arr;
}
function hanoi(n, a, b, c) {
    if (n === 1) {
        arr.push([n,a,c]);
    } else {
        hanoi(n - 1, a, c, b);
        arr.push([n,a,c]);
        hanoi(n - 1, b, a, c);
    }
}
module.exports = hunt;
