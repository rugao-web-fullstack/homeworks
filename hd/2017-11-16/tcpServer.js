const net = require("net");
const User = require("./user");
const EventEmitter = require("events");
let port = process.env.NODE_PORT || 8080;
let sockets_arr = [];
const emitter = new EventEmitter();

const server = net.createServer((socket) => {
    socket.write("请输入账号,密码和邮箱,用空格分开\n");
    sockets_arr.push(socket);
    socket.on("data", (data) => {
        data=data.toString().replace(/[^a-zA-Z0-9_ ]?/g,"");
        let userName=data.split(" ")[0]||" ";
        let password=data.split(" ")[1]||" ";
        let email=data.split(" ")[2]||" ";
        let user = new User(emitter);
        user.register(userName,password,email);
    });
}).listen(port, () => {
    console.log("服务器已开启");
});


emitter.on("user-register-completed", (userName) => {
    for (let i = 0; i < sockets_arr.length; i++) {
        if(sockets_arr[i].destroyed){
            sockets_arr.splice(i,1);
        }else{
            sockets_arr[i].write(`"${userName}"注册成功!`+"\n");
        }
    }
})