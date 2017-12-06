var express = require('express');
var fs = require('fs');
var app = express();

app.use(function(req, res, next) {
  res.render = function(filename, method) {
    fs.readFile('templates/index.html', function(err, data) {
      if (err) {
        return;
      }
      var content = String(data);
      var test = /{{(.*)}}/.test(content);
      if (test) {
        var key = RegExp.$1;
        if (key && method[key]) {
          content = content.replace('{{' + key + '}}', method[key]);
        }
      }
      res.write(content);
      res.end();
    });
  };
  next();
});
app.use('/', function(req, res) {
  res.render('index.html', { name: 'sb' });
});
app.listen(3000);
