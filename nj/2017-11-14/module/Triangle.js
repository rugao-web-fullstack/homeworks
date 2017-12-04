var debug = require('debug')('nj');
module.exports = function(n) {
    var arr = new Array();

    function creat(m) {
        for(var i = 0; i < m; i++) {
            arr[i] = new Array();
            for(var j = 0; j < m; j++) {
                if(j == 0)
                    arr[i][j] = 1;
                else if(i == j)
                    arr[i][j] = 1;
                else if(j > i)
                    arr[i][j];
                else
                    arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
            }
        }
    }

    function print() {
        for(var i = 0; i < n; i++) {
            debug(arr[i]);
        }
    }
    creat(n);
    print();
};
