var express = require('express');
var nunjucks = require('nunjucks');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var base = require('./base');
var selectUser = require('./selectUser');
var selectEmailBox = require('./selectEmailBox');

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});
// for parsing application/www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: "sososo"}));

app.get('/', function (req, res) {
    res.render('main.html');
});

app.get('/register', function (req, res) {
    res.render('register.html');
});

app.get('/login', function (req, res) {
    res.render('login.html');
});

app.post('/register-success', function (req, res) {
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    // 向Emaildb中插入用户数据
    selectUser(username,(error,result)=>{
        if(error){
            console.log(error);
            
            //当用户名不存在，才执行插入user
            base(function (con) {
                var sql = "INSERT INTO user (username,password) VALUES('" + username + "','" + password + "');";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log('1 user record inserted!');
                    console.log(result);
                    // 将根据用户名返回的用户id 与email一起插入进email表中
                    selectUser(username,(error,result)=>{
                        if(error){
                            console.log(error);
                            return;
                        }
                        if(result[0]){
                            var userId = result[0].id;
                            base(function (con) {
                                var sql = "INSERT INTO emailBox (user,address) VALUES('" + userId + "','" + email + "');";
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log('1 emailBox record inserted!');
                                    console.log(result);
                                });
                            }, 'emaildb');
                            return;
                        }else{
                            return;
                        }
                    });
                });
            }, 'emaildb');

           res.render('register-success.html');
           return;
           
          
        }
        if(result[0]){
            res.render('register-failure.html');
            return;
        }
    });
     
});

app.get('/login-success', function (req, res) {
    res.render('login-success.html',{
        name:req.session.user
    });
});

app.post('/login-success', function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    var username = req.body.username;
    var password = req.body.password;
    selectUser(username,(error,result)=>{
        if(error){
            console.log(error);
            res.render('login-failure.html');
            return;
        }
        var pwd = result[0].password;
        if(pwd===password){
            console.log('inside');
            req.session.user = result[0].username;
            res.render('login-success.html',{
                name:req.session.user
            });
        }else{
            res.render('login-failure.html');
        }
    });
    
   
});

app.get('/write', function (req, res) {
    console.log(req.session.user);
    selectUser(req.session.user,(error,result)=>{
        if(error){
            console.log(error);
            return;
        }
        var uerid = result[0].id;
        selectEmailBox(uerid,(error,result)=>{
            if(error){
                console.log(error);
                return;
            }
            var address = result[0].address;
            res.render('writeEmail.html',{
                name:address
            });

        });
    });



});

app.post('/send', function (req, res) {
    console.log(req.body.sender);
    console.log(req.body.receiver);
    console.log(req.body.title);
    console.log(req.body.content);
    var sender = req.body.sender;
    var receiver = req.body.receiver;
    var title = req.body.title;
    var content = req.body.content;
    //向email中插入邮件内容
    base(function (con) {
        var sql = "INSERT INTO email (senderAddress,receiverAddress,title,content) VALUES('" + sender + "','" + receiver + "','" + title + "','" + content + "');";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('1 email record inserted!');
            console.log(result);
            var emailId=result.insertId;
            //根据收件人查询邮箱id
            base(function (con) {
                var sql = "select * from emailBox  where address='" + receiver + "';";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    var eBoxId=result[0].id;
                    console.log(eBoxId);
                    //记录邮件与邮箱的关系，即email_eBox表
                    base(function (con) {
                        var sql = "INSERT INTO email_eBox (email,ebox) VALUES('" + emailId + "','" + eBoxId + "');";
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log('1 email_eBox record inserted!');
                            console.log(result);
                            //发送成功（邮件成功存入数据库）
                            res.render('send-success.html');
                        });
                    }, 'emaildb');
                });
            }, 'emaildb');
        });
    }, 'emaildb');

});

app.get('/read', function (req, res) {
    res.render('readEmail.html');
    console.log(req.session.user);
    base(function (con) {
        var sql = "select * from user  where username='" + req.session.user + "';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            var userId=result[0].id;
            base(function (con) {
                var sql = "select * from emailbox  where user='" + userId + "';";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    var eboxId=result[0].id;
                    base(function (con) {
                        var sql = "select * from email_eBox  where ebox='" + eboxId + "';";
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            var emailId=[];
                            for(var key in result){
                                emailId.push(result[key].email);
                            }
                            console.log(emailId);

                            //var emailId=result[0].email;

                            // base(function (con) {
                            //     var sql = "select * from email where id='" + emailId + "';";
                            //     con.query(sql, function (err, result) {
                            //         if (err) throw err;
                            //         console.log(result);
                            //     });
                            // }, 'emaildb');
                        });
                    }, 'emaildb');
                });
            }, 'emaildb');
        });
    }, 'emaildb');


});

app.listen(3000);