module.exports=function fib(n){
	var p=0;
	if(n==1 || n==2){
		p=1;
	}
	 else{
		p=fib(n-1)+fib(n-2);
	}
	  
	return p;

}