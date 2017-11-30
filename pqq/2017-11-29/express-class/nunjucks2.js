var express = require('express');
var fs = require('fs');
var app = express();

app.use(function(req, res, next) {
  //render 实现
  res.render = function(filename, options) {   
    console.log("在 rende中");
    console.log(filename);
    console.log(options); //模板参数
    
    fs.readFile("templates/nunjuck.html", function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      var content = String(data);
      var test = /{{(.*)}}/.test(content);
      console.log('是否匹配到：'+test);
      if (test) {
        console.log(RegExp.$1);
        var key = RegExp.$1;
        if (key && options[key]) {
          content = content.replace("{{" + key + "}}", options[key]);
        }
      }
      res.write(content);
      res.end();
    });
  };
  next();
});

app.get('/', function (req, res) {
  res.render('nunjuck.html', { name: "QQ" });
});

app.listen(3000);