const dgram = require("dgram");
const client = dgram.createSocket("udp4");
let message = Buffer.from("udp yy发起请求");
let server = "192.168.177.128";
let port = 4333;
var debug = require("debug")("xxx");
client.send(message, port, server, (err) => {
	debug("log:" + err);
	client.close();
});
