module.exports=function(x){
//外层循环打印行数
	for(var i=1; i<=x; i++){
		var k=1;
		var temp='';
		//内层循环拼接字符串
		for(var j=1; j<i; j++){
			temp+=k
			temp+=' ';
			k=k*(i-j)/j;
		}
		console.log(temp+'1');
	}	
}

