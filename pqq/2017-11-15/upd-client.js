const dgram =require('dgram');
const client= dgram.createSocket('udp4');
let message=Buffer.from('PQQ--UDP客户端:');
let server ='192.168.21.33';
var debug = require('debug')('xxx');

let port =4444;
client.send(message,port,server,(err)=>{
  if(err){
    throw err;
  }
  debug('close');
  client.close;
});