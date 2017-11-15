const dgram = require("dgram");
const client = dgram.createSocket("udp4");
let message = Buffer.from("udp wyw请求");
let server = "192.168.21.31";
let port = 4333;
client.send(message, port, server, (err) => {
	console.log("client close");
	client.close();
});
