const net = require("net");
let port = process.env.NODE_PORT || 8080;

const server = net.createServer((socket) => {
    socket.write("与服务器链接成功\n");
    socket.write("输入close断开服务器连接\n");
    socket.write("输入closeServer关闭服务器\n");
    socket.on("data", (data) => {
        if (data == "close") {
            socket.end("与服务器断开连接");
        }
        if (data == "closeServer") {
            socket.end("服务器已关闭");
            process.exit();
        }
    })
});
server.listen(port, () => {
    console.log("服务器正在监听" + port + "端口");
});