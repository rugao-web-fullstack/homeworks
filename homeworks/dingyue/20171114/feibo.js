//var n = parseInt(process.argv[2]);
//var a1 = 1;
//var a2 = 1;
//var a3 = 0;
//console.log(a1);
//console.log(a2);
//for(var i = 2; i <= n; i++){	
//	a3 = a1 + a2;	
//	a1 = a2;		
//	a2 = a3;	
	
//	console.log(a3);	
//}
function feibo (n) {
	if (n < 0) {
		return -1;
	}
	switch (n) {
		case 0:
			return 1;
		case 1:
			return 1;
		default:
			return feibo(n-1) + feibo(n-2);
	}
}

function fa (n) {
	let res = [];
	for (var i = 0; i < n; i++) {
		res[i] = feibo(i);
	}
	return res;
}

module.exports = fa;




