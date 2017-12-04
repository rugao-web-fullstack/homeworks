var tcp = require('net');
var debug = require('debug')('xxx');
var userArr = new Array();//userArr 记录用户的用户名，密码，邮箱信息
var User = require('./user.js').User;
var Message = require('./message.js').Message;
var EventEmit = require('events');
var emiter = new EventEmit();
var user = new User(emiter);
var message = new Message(emiter, userArr);
var socks = new Array();//保存socket 信息数组

debug('log:' + message);
var server = tcp.createServer((socket) => {
  socket.write('请输入用户名密码和邮箱，用空格隔开\n');
  socket.on('data', function (data) {
    var msg = data.toString();
    var name = msg.split(' ')[0];
    var pwd = msg.split(' ')[1];
    var email = msg.split(' ')[2].split('\r\n')[0];
    user.register(name, pwd, email);
    var send = Buffer.from(userArr[0]);
    Sends(send, socket);
  });
});

server.listen(process.env.NODE_PORT || 8080);
server.on('connection', (socket) => {
  socks.push(socket);

});

function Sends(send, rinfo) {
  for (var i = 0; i < socks.length; i++) {
    socks[i].write(send + '注册成功,来自用户' + rinfo.remoteAddress + '\n');
  }
}
