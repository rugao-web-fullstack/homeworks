const net = require('net');
var debug = require('debug');
const register = require('./register.js');
const login = require('./login.js');
const mainPage = require('./mainPage.js');
const userPage = require('./userPage.js');
const sendMail = require('./sendMail.js');
const readMail = require('./readMail.js');

const port = process.env.NODE_PORT || 8080;

const server = net.createServer((socket) => {
  mainPage(socket);
  register(socket);
  login(socket);
  userPage(socket);
  sendMail(socket);
  readMail(socket);
  socket.emit('mainPage');
});
server.listen(port, () => {
  debug('服务器正在监听' + port + '端口');
});