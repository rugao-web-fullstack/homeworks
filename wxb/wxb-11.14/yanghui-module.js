var array1 = new Array();
module.exports=function yanghui(n) {
    function array(i, j) {
        if (j == 0) {
            return 1;
        } else if (i == j) {
            return 1;
        } else {
            return array(i - 1, j - 1) + array(i - 1, j);
        }
    }
    for (var i = 0; i < n; i++) {
        for (var j = 0; j <= i; j++) {
            array1.push(array(i,j));
        }
        // documen"<br/>");
        array1.push(" ");
    }
    return array1;
}
