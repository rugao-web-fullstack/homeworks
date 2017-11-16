const dgram = require("dgram");
const client = dgram.createSocket("udp4");
let message = Buffer.from("Hello Panda");
let server = "192.168.21.33";
client.send(message, 4333, server, (err) => {
	console.log("what");
	client.close();
})
