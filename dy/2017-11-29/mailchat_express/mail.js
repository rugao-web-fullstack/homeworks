var express = require('express');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var mysql = require('mysql');
var Cookies = require('cookies');
var debug = require('debug')('log');
var app = express();

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});
app.use(bodyParser.urlencoded({
    extened: true
}));
app.use('/public', express.static(__dirname + '/public'));

// 设置 cookie
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);

    // 解析用户登录的 cookie 信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
        } catch (e) {
            debug('log' + e);
        }
    }

    next();
});
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
});
con.connect(function(err) {
    if (err) throw err;
    
    debug('log' + 'connected!');
    app.listen(3000);
});
