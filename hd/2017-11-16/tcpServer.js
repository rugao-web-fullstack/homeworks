const net = require("net");
const User = require("./user");
const EventEmitter = require("events");
let port = process.env.NODE_PORT || 8080;
let socketsArr = [];
const emitter = new EventEmitter();

const server = net.createServer((socket) => {
    socket.write("请输入账号,密码和邮箱,用空格分开\n");
    socketsArr.push(socket);
    socket.on("data", (data) => {
        data = data.toString().replace(/[^a-zA-Z0-9_ ]?/g, "");
        let userName = data.split(" ")[0] || " ";
        let password = data.split(" ")[1] || " ";
        let email = data.split(" ")[2] || " ";
        let user = new User(emitter);
        user.register(userName, password, email);
    });
}).listen(port, () => {
    console.log("服务器已开启");
});


emitter.on("user-register-completed", (userName) => {
    for (let i = 0; i < socketsArr.length; i++) {
        if (socketsArr[i].destroyed) {
            socketsArr.splice(i, 1);
        } else {
            socketsArr[i].write(`"${userName}"注册成功!` + "\n");
        }
    }
})