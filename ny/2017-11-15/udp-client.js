var debug = require('debug')('xxx');
var udp = require('dgram');
var client = udp.createSocket('udp4');
var message = Buffer.from('客户端请求');
var server = 'localhost';
var port = 4333;
client.send(message,port,server,function () {
  debug('log:' +'client close');
  client.close();
});