function Combination(m, n) {
	if(n == 0) return 1; //每行第一个数为1  
	else if(m == n) return 1; //最后一个数为1  
	else return Combination(m - 1, n - 1) + Combination(m - 1, n); //其余都是相加而来   
}

function Pascal(n) { //杨辉三角,N为行数   
	var str = [];
	for(var i = 0; i < n; i++) { //一共N行  
		var arr = new Array();
		for(var j = 0; j <= i; j++) {
			//每行数字的个数即为行号、例如第1行1个数、第2行2个数
			arr.push(Combination(i, j));
		}
		str[i] = arr.join(' ');
	}
	return str;
}
module.exports.Pascal = Pascal;