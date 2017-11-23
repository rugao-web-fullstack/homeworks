var readline = require('readline');
const fileDisplay = require("./modules/file").file;
//解析需要遍历的文件夹  
var filePath;  
var  rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.question("请输入需要遍历的文件夹绝对路径(例:/Users/pan/Documents)：", function(filepath) {
	//调用文件遍历方法  
	console.log('\n------------打印'+filepath+'下的文件----------\n');
	fileDisplay(filepath); 
    	rl.close();
});
