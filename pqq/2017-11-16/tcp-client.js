var net = require("net");
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var client = new net.Socket();
client.connect(8080, 'localhost', function() {
	console.log('连接服务器成功!');
	rl.question('请注册的输入id: ', (answer) => {
		client.write(answer);
		console.log(answer);
		rl.close();
	});
});
client.on("data", function(data) {
	if(data == '1') {
		console.log('存在，失败');
	} else if(data == '2') {
		console.log('注册成功');
		console.log("等待下一步");
		client.end();
	}
	
});
