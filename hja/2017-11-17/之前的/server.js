const net = require('net');
//---引入主页模块
const Index = require('./index');
//引入注册模块
const Register = require('./Register');
//引入登录模块
const Login = require('./login');
//引入主页面模块
const MainPage = require('./MainPage');
//引入发送模块
const SendMail = require('./SendMail');
//引入读取模块
const ReadMail = require('./ReadMail');
const port = process.env.NODE_PORT || 8080;
var server = net.createServer(function (socket) {
    Index(socket);
    Register(socket);
    Login(socket);
    MainPage(socket);
    SendMail(socket);
    ReadMail(socket);
    socket.emit('Index');


});

server.listen(port, function () {
    console.log('启动服务');
});