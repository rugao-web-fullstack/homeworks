var debug = require('debug')('xxx');

var express = require('express');
var fs = require('fs');
var app = express();

app.use(function (req, res, next) {
  res.render = function (filename, options) {
    debug('info'+'inside render');
    debug('info'+filename);
    debug('info'+options);
    fs.readFile('templates/main.html', function (err, data) {
      if (err) {
        debug('info'+err);
        return;
      }
      var content = String(data);
      var test = /{{(.*)}}/.test(content);
      debug('info'+test);
      if (test) {
        debug('info'+RegExp.$1);
        var key = RegExp.$1;
        if (key && options[key]) {
          content = content.replace('{{' + key + '}}', options[key]);
        }
      }
      res.write(content);
      res.end();
    });
  };
  next();
});
app.get('/', function (req, res) {
  res.render('main.html', { name: 'Greate' });
});
app.listen(3000);

