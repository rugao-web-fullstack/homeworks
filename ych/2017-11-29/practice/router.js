var http = require("http");
var url = require("url");

function userLogin(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('inside user login\n');
	res.end();
}
http.createServer(function(req,res){
	var parsed = url.parsed(req,url);
	console.log(parsed);
	if(parsed.pathname === '/user/login'){
		return userLogin(req,res);
	}
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('hello 你请求了地址：'+ req.url + '\n');
	res.end();
}).listen(8080);
