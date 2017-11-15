module.exports = function feibo(n) {
	var p = 0;
	if(n==1 || n==2) {
		p=1;
	} else {
		p=feibo(n-1)+feibo(n-2);
	}
	return p;
}