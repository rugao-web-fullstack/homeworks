module.exports = function(num){
	var arr = [];
	function fbn(n){
		if(n<0){
			console.log('输入错误');
		}else if(n==0||n==1){
			return 1;
		}else if(n>=2){
			return fbn(n-1)+fbn(n-2);
		}
	}
	for(var i=0;i<num;i++){
		arr.push(fbn(i));
	}
	return arr;
}

