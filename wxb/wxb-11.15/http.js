var http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, {
        "content-type": "text/plain"
    });
    res.write("hello nodejs");
    res.end();
}).listen(3000);