const http = require("http");
const server = http.createServer((req, res) => {
	res.end("hello world");
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log("server started at:" + port);
});
