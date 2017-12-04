var moves = [];

function mv(n, src, des) {
	moves.push([n, src, des]);
}

function hanoi(n, src, mid, des) {
	if (n === 1) {
		mv(n, src, des);
		return;
	}
	hanoi(n - 1, src, des, mid);
	mv(n, src, des);
	hanoi(n - 1, mid, src, des);
}

function test(n, src, mid, des) {
	moves = [];
	hanoi(n, src, mid, des);
	return moves;
}

module.exports = test;
