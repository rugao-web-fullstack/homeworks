var readline = require('readline');
const fileDisplay = require("./fileDisplay").fileDisplay;
var filePath;  
var  rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.question("请输入需要遍历的文件夹绝对路径：", function(filepath) {
	fileDisplay(filepath); 
    	rl.close();
});
   

