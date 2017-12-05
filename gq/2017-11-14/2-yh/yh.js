var debug = require('debug')('gq');
function yh(row) {
	var arr = new Array();
	for(var i = 0; i < row; i++) {
		if(i === 0) {
			arr.push(1);
		} else if(i === 1) {
			arr = new Array();
			arr.push(1);
			arr.push(1);
		} else {
			var arr2 = new Array();
			arr2.push(1);
			for(var j = 0;j < arr.length-1;j++){
				arr2.push(arr[j] + arr[j+1]);
			}
			arr2.push(1);
      
			arr = new Array();
			arr = arr2;
		}

		debug('log:' +arr + '');
	}
}
exports.test = yh;
