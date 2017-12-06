
var fib = function(n){
	switch(n) {
		case 0:
		case '0':
		case 1:
		case '1':
			return 1;
		default:
			if(n>1){
				return fib(n-1) + fib(n-2);
			}
			if(n<0){
				throw new Error("Error");
			}
	}
};
exports.fib = fib;
