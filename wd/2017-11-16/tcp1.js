const net = require('net');
const server = net.createServer();
var debug = require('debug')('xxx');
let clientList = [];
server.on('connection', (client) => {
  let arr = [];
  let flag = 0;
  client.name = client.remoteAddress + ':' + client.remotePort;
  clientList.push(client);
  client.write('Hi ' + client.name + '\n');
  client.write('please enter \'zc\' to register!\nplease enter \'q\' to out!');
  client.on('data', (data) => {
    if(flag === 0) {
      if (data.toString().split('\r')[0] === 'zc') {
        flag = 1;
        client.write('please enter username and password!\nusername:');
      } else if (data.toString().split('\r')[0] === 'q') {
        client.end('bye!');
      } else {
        for (var i = 0; i < clientList.length; i++) {
          if (client !== clientList[i]) {
            clientList[i].write(client.name + ' says ' + data.toString().split('\r')[0]);
          }
        }
      }
    } else {
      if (arr.length === 0) {
        arr.push(data.toString().split('\r')[0]);
        client.write('password:');
      } else {
        arr.push(data.toString().split('\r')[0]);
        debug('log:' + arr);
        flag = 0;
        for ( i = 0; i < clientList.length; i++) {
          if (client !== clientList[i]) {
            clientList[i].write('congratulate ' + client.name + ' register!');
          }
        }
      }
    }
  });
});
server.listen(8080);
