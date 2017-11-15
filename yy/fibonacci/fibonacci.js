module.exports=function(x){
	var a=1;
	var b=1;
	if(x==1){
		console.log("1");
	}else if(x==2){
		console.log("1 1");
	}else{
		var temp='';
		temp='1 1 ';
		for(var i=0; i<=x; i++){
			b=a+b;
			a=b-a;
			temp+=b;
			temp+=' ';
		}
		console.log(temp);
	}
}
