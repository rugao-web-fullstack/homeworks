var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var base = require('./base');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('./html'));
app.get('/log', function (reg, res) {
    // res.render('register');
    res.send('111');
});

app.post('/log', function (req, res) {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    //获得 post的数据
    //数据库
    var name = req.body.username;
    var pwd = req.body.password;

    //查询
    base(function (con) {
        var sql = "select  *  from  users  where    username='"+name+"' and password='"+pwd+"'  ";   
        con.query(sql, function (err, result) {
            if (err) {
                console.log('失败失败');
                throw err
            };



            // console.log("登录成功");

            console.log(result);
            

            //登陆成功后  把状态改为 1   为登录态

            var sql  = "updata users set status = '1' where username = '"+name+"'";


            
            //进行跳转进入邮箱
            // res.redirect('./mail.html');
        });
    }, 'mailsys');
});

app.listen(3000);