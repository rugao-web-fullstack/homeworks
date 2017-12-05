var debug = require('debug')('gq');
function hanoi(n,a,b,c){
	if(n === 1){
		debug('log:'+'Move ' + n + ' from ' + a + ' to ' + c);
	}
	else{
		hanoi(n-1,a,c,b);
		debug('log:'+'Move ' + n + ' from ' + a + ' to ' + c);
		hanoi(n-1,b,a,c);
	}
}
exports.hano = hanoi;