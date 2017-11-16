function move(n, a, c, moves) {
	moves.push([n, a, c]);
	if (process.env.NODE_DEBUG) {
		console.log("Move " + n + " from " + a + " to " + c);
	}
}

function hanoi(n, a, b, c, moves) {
	if (n == 1) {
		move(n, a, c, moves);
		return;
	} else {
		hanoi(n - 1, a, c, b, moves);
		move(n, a, c, moves);
		hanoi(n - 1, b, a, c, moves);
	}
	return move;
}
function records(n, a, b, c) {
	let moves = [];
	hanoi(n, b, c, a, moves);
	return moves;
}

module.exports = records;
