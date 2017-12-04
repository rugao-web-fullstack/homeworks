var http = require('http');
var debug = require('debug')('http');
http.createServer(function (req, res) {
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    res.write('hello nodejs');
    res.end();
    debug('8080');
}).listen(3000);