const net = require('net');
const server = net.createServer();
var client = new net.Socket();
var arr = ['1']; //用来存放用户id
var flag = 1;//放在外面！


server.on("connection", function(socket) {
	console.log("------------服务建立（来自客户端连接）------------");
	//从客户端传来要注册的id
	socket.on("data", function(data) {
		//data为客户端传来的数据
		for(var i = 0; i < arr.length; i++) {
			if(data == arr[i]) {
				flag = 1;
			} else {
				flag = 0;
			}
		}

		//进行返回客户端信息
		if(flag == 1) {
			console.log("用户注册失败");
			socket.write('1');
			return socket.end();
			process.exit();
		} else {
			arr.push(data.toString());
			console.log('目前注册的用户个数：'+arr.length);
			//进行广播（没有实现！  目前不会向所有客户端发送信息   UDP可以~~~）
			console.log('服务器内广播：注册了新用户ID为' + data);
			socket.write('2');
		}
	});
	socket.on('end', function() {
		console.log('关闭');
	});
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log("======Server started at :" + port);
})