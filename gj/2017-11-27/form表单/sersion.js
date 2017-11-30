var http = require('http');
var qs = require('querystring');
//querystring.parse(str,separator,eq,options):parse这个方法是将一个字符串反序列化为一个对象。
// querystring.stringify(obj,separator,eq,options):stringify这个方法是将一个对象序列化成一个字符串
var fs = require('fs');
var path = require('path');

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var data = [];
        var length = 0;
        req.on('data', function (chunk) {
            length += chunk.length;
            data.push(chunk);
        });
        req.on('end', function () {
            data = Buffer.concat(data, length); //concat拼接BUFFER类型的对象，将一组Buffer对象合并为一个BUffer对象
            var formData = qs.parse(String(data));
            console.log(formData);
            res.write(String(data));
            res.end();
        })
    }
    //先运行else，读出html文件，然后提交时再运行if里面的代码
    else {
        console.log('inside home');
        var filename = path.resolve(__dirname, 'form.html');
        var content = fs.readFileSync(filename);
        res.write(String(content));//content：Buffer类型，String转换为string类型
        res.end();//当返回的内容发送完毕以后，必须要结束一次。如果不调用该函数，客户端将永远处于等待状态
    }
}).listen('8080', '127.0.0.1');