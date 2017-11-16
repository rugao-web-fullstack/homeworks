const net = require("net");
const server = net.createServer((socket) => {

	socket.write("请输入你想要的操作:\n");
	socket.on('data', (data) => {
		let Data = data.toString();
		let closeSocket = Buffer.from('closeSocket');
		let closeServer = Buffer.from('closeServer');
		if(Buffer.compare(data, closeSocket) === 0){
			socket.end();
		}
		if(Buffer.compare(data, closeServer) === 0){
			socket.end();
			server.close();
		}
	})
});
server.listen(process.env.NODE_POST || 8088, () => {
	console.log('TCP开启');
});
