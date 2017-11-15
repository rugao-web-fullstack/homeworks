module.exports = function (num, a, b, c) {
    var arr = [];
    function hannuota(n, a, b, c) {
        if (n == 1) {
            /*console.log("把" + n + "从" + a + "移动到" + c);*/
            arr.push("把" + n + "从" + a + "移动到" + c);
        }
        else {
            hannuota(n - 1, a, c, b);
            /*console.log("把" + n + "从" + a + "移动到" + c)*/
            arr.push("把" + n + "从" + a + "移动到" + c);
            hannuota(n - 1, b, a, c);
        }
    }

    hannuota(num, "A", "B", "C");
    return arr;
}

