var readline = require('readline');
const fileDisplay = require("./fileDisplay").fileDisplay;
//解析需要遍历的文件夹  
var filePath;  
var  rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.question("请输入需要遍历的文件夹绝对路径(例:/home/niyi/Documents)：", function(filepath) {
	//调用文件遍历方法  
	fileDisplay(filepath); 
    	rl.close();
});
   
