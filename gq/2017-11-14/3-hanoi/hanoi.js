function mv(n, x, y, z) {
	z.push([n, x, y]);
	if(process.env.NODE_DEBUG){
		console.log("at "+ n +" layer,from "+ x +" to "+ z);
	}
}

function hanoi(n, x, m, y, z){
	if(n === 1){
		mv(n, x, y, z);
		return
	}
	hanoi(n - 1, x, y, m, z);
	mv(n, x, y, z);
	hanoi(n - 1, m, x, y, z)
}

function records(n, x, m, y){
	let z = [];
	hanoi(n, x, m, y, z);
	return z;
}

module.exports = records;
