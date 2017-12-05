var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('xxx');

http.createServer(function (req, res) {
  if (req.method === 'POST') {
    var data = [];
    var length = 0;

    req.on('data', function (chunk) {
      // console.log('data');
      debug('data');
      //接收数据
      length += chunk.length;
      data.push(chunk);
    });
    req.on('end', function () {
      //拼接数据
      data = Buffer.concat(data, length);
      //分析数据
      var formData = qs.parse(String(data));
      req.body = formData;
      // console.log(formData);
      debug(formData);
      res.write(String(data));
      res.end();
    });
  } else {
    // console.log('------');
    var filename = path.resolve(__dirname, 'form.html');
    // console.log();
    debug(filename);
    var content = fs.readFileSync(filename);
    // console.log();
    debug(String(content));
    res.write(String(content));
    res.end();
  }
}).listen(8080);