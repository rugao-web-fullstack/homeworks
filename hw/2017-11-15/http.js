const http = require('http');
let html = `
<DOCTYPE html><html>
	<body>
	<h1>Hello hw!</h1>
	</body>
	</html>
`
const server = http.createServer((req, res) => {
	res.setHeader("Content-Type", "text/html");
	res.end(html);
	setInterval(() => {
		let date = "" + new Date() + "\n";
		res.write(Buffer.from(date));
	},100);
	//res.setHeader("Content-Type", "text-plain");
	//res.end("Hello world");
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log("Server started at: " + port);
});
