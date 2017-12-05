function fib(m) {
	var arr = new Array();
	var debug = require('debug')('gq');
	for(var i = 0; i < m; i++) {
		if(i === 0){
			arr.push(1);
		} else if(i === 1) {
			arr.push(1);
		} else {
			arr.push(arr[i-1] + arr[i-2]);
		}
	}
	debug('log:' + arr);
}
exports.fib = fib;
