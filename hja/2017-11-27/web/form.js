var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('form');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    if (req.method === 'POST') {
      var data = [];
      var length = 0;
      req.on('data', function (chunk) {
        length += chunk.length;
        data.push(chunk);
      });
      req.on('end', function () {
        //--拼接
        data = Buffer.concat(data, length);
        //--qs
        var formData = qs.parse(String(data));
        debug(formData);
        // console.log(formData);
        res.write(String(data));
        res.end();
      });
    } else {
      // console.log('inside home');
      var filename = path.resolve(__dirname, 'form.html');
      var content = fs.readFileSync(filename);
      // console.log(typeof String(content));
      res.write(String(content));
      res.end();
    }
  }
});
server.listen(8000,'127.0.0.1');