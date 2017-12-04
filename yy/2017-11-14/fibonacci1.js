function fibonacci(n) {
	if (n < 0) {
		return -1;
	}
	switch (n) {
	case 0:
		return 0;
	case 1:
		return 1;
	default:
		return fibonacci(n - 1) + fibonacci(n - 2);
	}
}

module.exports = function(x) {
	let res = [];
	for (var i = 0; i < x; i++) {
		res[i] = fibonacci(i);
	}
	return res;
};
