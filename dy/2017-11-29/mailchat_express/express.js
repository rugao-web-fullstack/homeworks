var express = require('express');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var fs = require('fs');
var app = express();
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({
    extened: true
}));

// 用户注册
app.get('/register', function (req, res) {  
    fs.readFile('register.html', function (err, data) {
        console.log('inside register');
        if (err) {
            throw err;
        }
        res.end(data.toString());
    });  
});
app.post('/register', function (req, res) {
    console.log(req.body);
    // res.send("register: received your request!");
});

// 用户登录
app.get('/login', function (req, res) {  
    fs.readFile('login.html', function (err, data) {
        console.log('inside login');
        if (err) {
            throw err;
        }
        res.end(data.toString());
    });  
});
app.post('/login', function (req, res) {
    console.log(req.body);
    // res.send("login: received your request!");
    if (req.body.user === 'dy' && req.body.pwd === '123') {
        console.log('登录成功！');
        res.render('mailmain.html', {name: req.body.user});
    } else {
        console.log('登录失败！请检查用户名和用户密码是否正确！');
        return false;
    }
});

// 编写邮件
app.get('/login/writemail', function (req, res) {  
    console.log('inside writemail');
    fs.readFile('./templates/writemail.html', function (err, data) {
        if (err) {
            throw err;
        }
        res.end(data.toString());
    }); 
    console.log(req.body);
    // res.send("login/writemail: received your request!"); 
    res.render('writemail.html');
});

// 查看邮件
app.get('/login/readmail', function (req, res) { 
    console.log('inside readmail'); 
    fs.readFile('./templates/readmail.html', function (err, data) {
        if (err) {
            throw err;
        }
        res.end(data.toString());
    });  
    console.log(req.body);
    // res.send("login/readmail: received your request!");
    res.render('readmail.html');
});

app.listen(3000);