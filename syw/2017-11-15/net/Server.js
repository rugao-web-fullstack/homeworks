
const net = require('net');
const readline = require("readline");
const server = net.createServer((socket) => {
  socket.write("输入close断开服务器\n");
  socket.on("data", (data) => {
    if (data == "close") {
      socket.end("与服务器断开连接");
      process.exit();
    }
  });
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  console.log("服务器正在监听" + port + "端口");
});
