var n = parseInt(process.argv[2]);
var a1 = 1;
var a2 = 1;
var a3 = 0;
console.log(a1);
console.log(a2);
for(var i = 2; i <= n; i++){	
	a3 = a1 + a2;	
	a1 = a2;		
	a2 = a3;	
	
	console.log(a3);	
}

