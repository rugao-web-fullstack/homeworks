const http = require('http');
const server = http.createServer((req,res) => {
	res.writeHead(200,{'Content-type':'text/plain'});
	res.end('访问成功');
});
let port = process.env.NODE_POST || 8080;

server.listen(port,() => {
	console.log('Server started at:' + port);
});
