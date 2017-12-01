var express = require('express');
var fs = require('fs');
var app = express();

app.use(function (req, res, next) {
  res.render = function (filename, options) {
    console.log("inside render");
    console.log(filename);
    console.log(options);
    fs.readFile("templates/main.html", function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      var content = String(data);
      var test = /{{(.*)}}/.test(content);
      console.log(test);
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
  res.render('main.html', { name: "Greate" });
});
app.listen(3000);

