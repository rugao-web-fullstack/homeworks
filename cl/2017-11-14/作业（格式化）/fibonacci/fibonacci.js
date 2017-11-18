function fibonacci(num) {
    var arr = [];
    var firstNum = 0;
    var secondNum = 1;
    var sum = 1;
    for (var i = 0; i < num; i++) {
        arr.push(sum);
        sum = firstNum + secondNum;
        firstNum = secondNum;
        secondNum = sum;
    }
    return arr;
}

module.exports = fibonacci;