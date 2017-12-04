var debug = require('debug')('form');

var http = require('http');
var querystring = require('querystring');

http.createServer(function (req, res) {
  if (req.method.toLowerCase() === 'post') {
    var data = '';
    req.on('data', function (chunk) {
      data += chunk;
    });
    req.on('end', function () {
      var dataString = data.toString();
      var obj = querystring.parse(dataString);
      debug(obj.name);
      debug(obj.age);
      debug(obj.sex);
      debug(obj.checkbox);
      debug(obj.file);//获取的只是文件名，文件是没有被上传的，建议使用nodejs的formodable模块实现文件的上传。
      res.write('<head><meta charset="utf-8"/></head>');
      res.end('请求成功');
    });
  }
}).listen(8080);