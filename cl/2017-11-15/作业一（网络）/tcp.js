const net = require("net");
const server = net.createServer((socket)=>{
        socket.end("hello from tcp server!");
});
let port = process.env.NODE_PORT || 8080;
server.listen(port,()=>{
        console.log("Sever started at" + port);
});

