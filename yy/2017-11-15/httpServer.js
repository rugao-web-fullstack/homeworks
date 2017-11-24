const http = require('http');
const server = http.createServer((req, res) => {
	res.setHeader("Content-Type", "text/html");
	setInterval(() => {
		let date = '' + new Date();
		res.write(Buffer.from(date));
		//res.end("Hello world!");
	}, 100);
	let port = process.env.NODE_PORT || 8080;
	server.listen(port, () => {
		console.log("Server started at:" + port);
	});
