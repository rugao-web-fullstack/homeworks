module.exports = function fib(num){
	var arr = [];
	function fbnq(n){
		if(n<=0){
			return 1;
		}
		if(n==1 || n==2){
			return 1;
		}
		return fbnq(n-2)+fbnq(n-1);
	}
	
	for(var i=1;i<=num;i++){
		arr.push(fbnq(i));
	}
	return arr;
}
