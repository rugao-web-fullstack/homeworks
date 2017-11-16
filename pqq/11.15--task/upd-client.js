const dgram =require("dgram");
const client= dgram.createSocket("udp4");
let message=Buffer.from('PQQ--UDP客户端:');
let server ='192.168.21.33';

let port =4444;
client.send(message,port,server,(err)=>{
	console.log('close');
	client.close;
});