var debug = require('debug')('templates');
var express = require('express');
var fs = require('fs');
var app = express();

app.use(function(req, res, next) {
    res.render = function(filename, options) {
        debug('inside render');
        debug(filename);
        debug(options);
        fs.readFile('templates/main.html', function(err, data) {
            if (err) {
                debug(err);
                return;
            }
            var content = String(data);
            var test = /{{(.*)}}/.test(content);
            debug(test);
            if (test) {
                debug(RegExp.$1);
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
    res.render('main.html', { username: 'Greate' });
});
app.listen(3000);
