var mainpage = require("./mainpage");
var register = require("./register");
var login = require("./login");
var userpage = require("./userpage");
var sendmail = require("./sendmail");
// var receivemail = require("./receivemail");
var server = require("net").createServer(function (socket) {
    mainpage(socket);
    register(socket);
    login(socket);
    userpage(socket);
    sendmail(socket);
    // receivemail(socket);
    socket.emit("mainpage");
});
server.on("connection", function () {
    console.log("connect");
});
server.listen(8080);



// console.log("new connection");
// socket.write("成功连接服务器，请选择功能：\n 1.注册 2.登录\n");
// socket.on("data", function fn(data) {
//     data = data.toString().replace(/[^a-zA-Z0-9_ ]?/g, "");
//     if (data == "1") {
//         socket.write(data);
//         socket.removeListener("data", fn);
//         socket.emit("login");
//     } else if (data == "2") {
//         socket.write(data);
//         socket.removeListener("data", fn);
//         socket.emit("register");
//     }
// })