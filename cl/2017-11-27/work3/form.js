var debug = require('debug')('xxx');
var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');

//create a server object:
http.createServer(function (req, res) {
  if (req.method === 'POST') {
    var data = [];
    var length = 0;
    req.on('data', function (chunk) {
      debug('info'+'data');
      // 接收数据
      length += chunk.length;
      data.push(chunk);
    });
    req.on('end', function () {
      // 拼接数据
      data = Buffer.concat(data, length);
      // 分析数据
      var formData = qs.parse(String(data));
      req.body = formData;
      debug('info'+formData);
      res.write(String(data));
      res.end();
    });
  } else {
    debug('info'+'inside home');
    var filename = path.resolve(__dirname, 'form.html');
    debug('info'+filename);
    var content = fs.readFileSync(filename);
    debug('info'+String(content));
    res.write(String(content)); //write a response to the client
    res.end(); //end the response
  }
}).listen(8080); //the server object listens on port 8080