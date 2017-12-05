var http = require('http');
var debug = require('debug')('ago');
let html = '<Doctype html><html><h2>HTML测试</h2></html>';
let a = 1;
var server = http.createServer((req,res) => {
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.end(html);
    setInterval(() => {
        let date = new Date();
        let str = 'NO.'+a+' 时间: '+date.getHours()+'时'+date.getMinutes()+'分'+date.getSeconds()+'秒'+'<br/>';
        res.write(str);
        a++;
    },1000);
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
    debug('你现在进入的端口为：'+port);
});
