var readline = require('readline');
const fileDisplay = require("./fileDisplay").fileDisplay;
var filePath;
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.question("请输入需要遍历的文件夹绝对路径,如果不输入默认当前路径：", function (filepath) {
	//调用文件遍历方法 
	if (filepath == "") {
		fileDisplay("./");
	} else {
		fileDisplay(filepath);
	}

	rl.close();
});


