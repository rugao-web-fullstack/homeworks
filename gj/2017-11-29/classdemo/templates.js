var debug = require('debug')('log');
var express = require('express');
var fs = require('fs');
var app = express();

app.use(function (req, res, next) {
  res.render = function (filename, options) {
    // console.log('inside render');
    debug('log : ' + 'inside render');
    // console.log(filename);
    debug('log : ' + filename);
    // console.log(options);
    debug('log : ' + options);
    fs.readFile('templates/main.html', function (err, data) {
      if (err) {
        // console.log(err);
        debug('log : ' + err);
        return;
      }
      var content = String(data);
      var test = /{{(.*)}}/.test(content);
      // console.log(test);
      debug('log : ' + test);
      if (test) {
        // console.log(RegExp.$1);
        debug('log : ' + RegExp.$1);
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

