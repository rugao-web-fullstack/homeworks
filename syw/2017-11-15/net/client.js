const dgram = require("dgram");
const client = dgram.createSocket('udp4');
let message = Buffer.from('Udp server request');
let server = '192.168.21.33';
let port = 4333;
client.send(message, port, server, (err) => {
    console.log("client close");
    client.close();
});
