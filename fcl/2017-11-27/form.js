var http = require("http");
var fs = require("fs");
var path = require("path");
var qs = require("querystring");

http.createServer(function(req, res) {
    if (req.method === "POST") {
        var data = [];
        var length = 0;
        req.on("data", function(chunk) {
            console.log("data");
            //接收数据
            length += data.length;
            data.push(chunk);
        });
        req.on("end", function() {
            //拼接数据
            data = Buffer.concat(data, length);
            //分析数据
            var formData = qs.parse(String(data));
            req.body = formData;
            console.log(formData);
            res.write(String(data));
            res.end();
        });
    } else {
        console.log("inside home");
        var filename = path.resolve(__dirname, "form.html");
        var content = fs.readFileSync(filename);
        res.write(String(content));
        res.end();
    }
}).listen(8000);
