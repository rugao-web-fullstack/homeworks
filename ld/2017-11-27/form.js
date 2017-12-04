var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');
var server = http.createServer(function(req, res) {
    if (req.method === 'POST') {
        var data = [];
        var length = 0;
        req.on('data', function(chunk) {
            length += chunk.length;
            data.push(chunk);
        });
        req.on('end', function() {
            data = Buffer.concat(data, length);
            var formdata = qs.parse(String(data));
            req.body = formdata;
            res.write(String(data));
            res.end();
            // process(data)
        });
    } else {
        var filename = path.resolve(__dirname, 'form.html');
        var content = fs.readFileSync(filename);
        res.write(String(content));
        res.end();
    }
});
server.listen(8080);
