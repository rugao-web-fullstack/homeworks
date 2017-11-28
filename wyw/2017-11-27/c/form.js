var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');

http.createServer(function (req,res) {
    if(req.method === 'POST') {
        //res.writeHead(200,{'Content-Type':'text/html'});
        var data = "";
        // var length = 0;
        req.on('data', function (chunk) {
            console.log('data');
            //接收数据
            data += chunk;
            //data.push(chunk);
        });
        req.on('end', function () {
            var datastring = data.toString();
            var obj = qs.parse(datastring);
            console.log(obj.a);
            console.log(obj.b);
            console.log(obj.c);
        })
    }
}).listen(8080);