module.exports = function(n) {
	var arr;
	function creat(m) {
		for (var i = 0; i < m; i++) {
			arr[i] = new Array();
			for (var j = 0; j < m; j++) {
				if (j == 0)
					arr[i][j] = 1;
				else if (i == j)
					arr[i][j] = 1;
				else if (j > i)
					arr[i][j];
				else
					arr[i][j] = arr[i-1][j-1] + arr[i-1][j];
			}
		}
	}
	function print() {
		for (var i = 0; i < n; i++) {
			console.log(arr[i]);
		}
        }
	arr = new Array();
	creat(n);
	print();
}
