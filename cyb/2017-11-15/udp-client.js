const dgram = require("dgram");
const client = dgram.createSocket("udp4");
let message = Buffer.from("我是最帅的");
let server = '127.0.0.1';
let port = 4333;

client.send(message, port, server, (err) => {
  console.log("Client close");
  client.close();
});