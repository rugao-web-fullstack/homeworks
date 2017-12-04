var http = require('http');
var debug = require('debug')('log');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');

// create a server object
http.createServer(function (req, res) {
  if (req.method === 'POST') {
    var data = [];
    var length = 0;
    req.on('data', function (chunk) {
      debug('log' + 'data');
      // receive data
      length += chunk.length;
      data.push(chunk);
    });
    req.on('end', function () {
      // joint data
      data = Buffer.concat(data, length);
      // analyze data
      var formData = qs.parse(String(data));
      req.body = formData;
      debug('log' + formData);
      res.write(String(data));
      res.end();
    });
  } else {
    debug('log' + 'inside home');
    var filename = path.resolve(__dirname, 'form.html');
    debug('log' + filename);
    var content = fs.readFileSync(filename);
    debug('log' + String(content));
    res.write(String(content)); // write a response to the client
    res.end();  // end the response
  }
}).listen(8080);