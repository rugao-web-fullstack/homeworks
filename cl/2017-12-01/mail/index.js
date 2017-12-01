var express = require('express');
var app = express();
var basic = require("./base");
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var currentUser = "11";
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "login.html");
})

app.post('/main', urlencodedParser, function (req, res) {
    basic(function (con) {
        var username = req.body.username;
        var password = req.body.password;
        var sql = "select * from user where username = '" + username + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length === 0) {
                console.log("用户名不存在！请重新输入");
                res.location('/login');
            } else {
                result.forEach(function (item) {
                    if (item.password !== password) {
                        console.log("密码不正确！");
                        res.location('/login');
                    } else {
                        console.log("user " + username + " login in");
                        currentUser = username;
                        res.sendFile(__dirname + "/" + "main.html");
                    }
                });
            }
        });
    }, "mail");
})

app.get('/write', function (req, res) {
    res.sendFile(__dirname + "/" + "write.html");
})
app.get('/read', function (req, res) {
    res.sendFile(__dirname + "/" + "read.html");
})
app.post('/login', urlencodedParser, function (req, res) {
    basic(function (con) {
        var username = req.body.username;
        var password = req.body.password;
        var address = req.body.address;
        var sql = "insert into user(username,password) values('" + username + "','" + password + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Data inserted");
            console.log(result);
        });
        var sql2 = "insert into mailbox(user,address) values('" + username + "','" + address + "')";
        con.query(sql2, function (err, result) {
            if (err) throw err;
            console.log("mailbox-Data inserted");
        });
    }, "mail");

    console.log("用户注册成功!");
    res.sendFile(__dirname + "/" + "login.html");

})

app.post("/send", function (req, res) {
    basic(function (con) {
        var receiver = req.body.receiver;
        var title = req.body.title;
        var content = req.body.content;
        var sender = currentUser;
        var sql = "insert into mail(title,content,sender,receiver) values('" + title + "','" + content + "','" + sender + "','" + receiver + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("mail sended");
            console.log(result);
        });
    }, "mail");
    console.log("邮件发送成功!");
    res.sendFile(__dirname + "/" + "main.html");
})

app.listen(3000);