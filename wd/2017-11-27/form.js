var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
    if (req.url !== '/favicon.ico') {
        if (req.method === "POST") {
            var data = [];
            var length = 0;
            req.on("data", function (chunk) {
                length += chunk.length;
                data.push(chunk);
            });
            req.on("end", function () {
                data = Buffer.concat(data, length);
                req.body = qs.parse(String(data));
                res.write(String(data));
                res.end();
            })
        } else {
            var filepath = path.resolve(__dirname, "form.html");
            var content = fs.readFileSync(filepath);
            res.write(String(content));
            res.end();
        }
    }
}).listen(8080);
