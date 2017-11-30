var express = require('express');
var fs = require('fs');
var app = express();
app.use(function (req, res, next) {
    res.render = function (filename, options) {
        fs.readFile("templates/index.html", function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            var content = String(data);
            var test = /{{(.*)}}/.test(content);
            if (test) {
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
    res.render('index.html', { name: "Wang" });
});
app.listen(3000);