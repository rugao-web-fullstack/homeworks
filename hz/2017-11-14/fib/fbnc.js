module.exports = function(n){
	var arr = [];
	var p = 0;
	function fib(a){
		if ( a==1 || a==2 ){
			p = 1;		
		}else{
			p = fib(a-1)+fib(a-2);
		}
		return p;
	}

	for(var i = 1; i <= n; i++){
		arr.push(fib(i));
	}
	return arr;

}
