module.exports = function yhTriangle(num) {
	var array = new Array(num);
	for (var k = 0; k < num; k++) {
		array[k] = new Array();
	}
	var type = '';
	for (var i = 0; i < num; i++) {
		for (var j = 0; j <= i; j++) {
			if (0 == j || i == j) {
				array[i][j] = 1;
				type += array[i][j] + " ";
			} else {
				array[i][j] = array[i - 1][j - 1] + array[i - 1][j];
				type += array[i][j] + " ";
			}
		}
		type += "\n";
	}
	return type;
}
