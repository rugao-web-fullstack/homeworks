var express = require('express');
var router = express.Router();
var basic = require('../../base');
/* GET register. */
router.get('/', function(req, res, next) {
    res.render('register', { title: '注册' });
});
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email    = req.body.email;
    basic(function (con) {
        var sql = 'select username from user where username = \'' + username + '\';';
        con.query(sql,function (err, result) {
            if(err) throw err;
            if(result.length !==0){
                console.log("用户已存在");
                res.send("用户已存在");
            }else{
                basic(function (con) {
                    var sql = 'insert into user (username, password) values(\'' + username + '\',\'' + password + '\');';
                    con.query(sql,function (err, result) {
                        if (err) throw err;
                        console.log(result);
                        console.log("注册成功");
                        basic(function (con) {
                            var sql = 'insert into mailbox (user,address) values(\'' + username + '\',\'' + email + '\');';
                            con.query(sql,function (err, result) {
                                if (err) throw err;
                                res.redirect('/login');
                            })
                        });
                    })
                })
            }
        })
    })
});
module.exports = router;
