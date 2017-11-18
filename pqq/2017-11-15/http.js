const html =`
<DOCTYPE html><html>
	<body>
	<h1>Hi </h1>
	</body>
	</html>
`;
const http=require('http');
const server = http.createServer((req,res) => {
	res.setHeader("content-Type","text/html");
//	res.end('hello');
	res.end(html);

}).listen(4444);
//let port =process.env.NODE_PORT || 8080;
//server.listen(port,()=>{
//	
//})
