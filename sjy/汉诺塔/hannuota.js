module.exports = function hanoi(n,x,y,z) {
	if(n==1){
		console.log("Move "+n+" from "+x+" to "+z);
	}
	else{
		hanoi(n-1,x,z,y);
		console.log("Move "+n+" from "+x+" to "+z)
		hanoi(n-1,y,x,z);
	}
}

