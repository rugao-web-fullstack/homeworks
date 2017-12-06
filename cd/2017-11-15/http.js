var http = require('http');
var server = http.createServer(function (req,res) {
  res.writeHead(404,{'Content-type':'text/html;charset=utf-8'});
  res.end('hello world');
});
server.listen(3000,'127.0.0.1');
