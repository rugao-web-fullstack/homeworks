const dgram =require('dgram');
var debug = require('debug')('xxx');
const server = dgram.createSocket('udp4');

server.on('message',(message,rinfo)=>{
  debug(rinfo);
  debug(' server got:${message} from ${rinfo.address}:${rinfo.port}');
  server.send('message');
});
server.bind(4444);

