module.exports = function Hanoi(n, a, b, c) {

	if (n == 1) {
		console.log("Move " + n + " from " + a + " to " + c);
	} else {
		Hanoi(n - 1, a, c, b);
		console.log("Move " + n + " from " + a + " to " + c);
		Hanoi(n - 1, b, a, c);
	}
}
