var array = new Array();
module.exports = function yanghui(n) {
    function add(i, j) {
        if (j == 0) {
            return 1;
        } else if (i == j) {
            return 1;
        } else {
            return add(i - 1, j - 1) + add(i - 1, j);
        }
    }

    for (var i = 0; i < n; i++) {
        for (var j = 0; j <= i; j++) {
            array.push(add(i, j));
        }
        // documen"<br/>");
        array.push(' ');
    }
    return array;
};
