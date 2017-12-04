var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('log');

http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var data = [];
        var length = 0;
        req.on('data', function (chunk) {
            //console.log('data');
            debug('log' + 'data');

            // 接收数据
            length += chunk.length;
            data.push(chunk);
        });
        req.on('end', function () {
            // 拼接数据
            data = Buffer.concat(data, length);
            // 分析数据
            var formData = qs.parse(String(data));
            req.body = formData;
            debug('log' + formData);
            //console.log(formData);
            res.write(String(data));
            res.end();
        });
    } else {
        debug('log'+ 'insde home');
        //console.log('inside home');
        var filename = path.resolve(__dirname, 'form.html');
        debug('log' + filename);
        //console.log(filename);
        var content = fs.readFileSync(filename);
        debug('log' + String(content));
        //console.log(String(content));
        res.write(String(content)); 
        res.end(); 
    }
}).listen(8080);
