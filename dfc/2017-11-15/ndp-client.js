const dgram = require("dgram");
const client = dgram.createSocket("udp4");
let message = Buffer.from("我访问到服务器啦");
let server = '127.0.0.1';
let port = 4333;

client.send(message,port,server,(err) => {
 console.log("Client close");
 client.close();
});