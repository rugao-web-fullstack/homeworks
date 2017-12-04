var debug = require('debug')('form');
var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var data = [];
        var length = 0;
        req.on('data', function (chunk) {
            debug('data');
            length += chunk.length;
            data.push(chunk);
        });
        req.on('end', function () {
            data = Buffer.concat(data, length);
            var formData = qs.parse(String(data));
            req.body = formData;
            debug(formData);
            res.write(String(data));
            res.end();
        });
    } else {
        debug('inside home');
        var filename = path.resolve(__dirname, 'form.html');
        debug(filename);
        var content = fs.readFileSync(filename);
        debug(String(content));
        res.write(String(content));
        res.end();
    }
}).listen(8080); 
