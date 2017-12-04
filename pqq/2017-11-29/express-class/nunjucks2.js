var express = require('express');
var fs = require('fs');
var app = express();
var debug = require('debug')('xxx');

app.use(function (req, res, next) {
  //render 实现
  res.render = function (filename, options) {
    debug('log:' + '在render中');
    debug('log:' + filename);
    debug('log:' + options); //模板参数

    fs.readFile('templates/nunjuck.html', function (err, data) {
      if (err) {
        debug('error:' + err);
        return;
      }
      var content = String(data);
      var test = /{{(.*)}}/.test(content);
      debug('log:' + '是否匹配到：' + test);

      if (test) {
        debug('log:' + RegExp.$1);

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
  res.render('nunjuck.html', {
    name: 'QQ'
  });
});

app.listen(3000);