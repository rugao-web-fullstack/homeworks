function evaluate(r,c){
	if(c==0) return 1;
	if(r==c) return 1;
	return evaluate(r-1,c-1)+evaluate(r-1,c);
}

module.exports=function(x){
//外层循环打印行数
	let res=[];
	for(let i=0; i<x; i++){
		//内层循环拼接字符串
		let tmp=[];
		for(var j=0; j<=i; j++){
			tmp.push(evaluate(i,j));
		}
		res.push(tmp);
	}
	return res;
}

