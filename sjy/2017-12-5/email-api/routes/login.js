var express = require('express');
var router = express.Router();
var conn = require('../mysql');
/* GET login. */
router.get('/', function(req, res, next) {
    res.render('login', { title: '登陆' });
});
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    conn(function (con) {
        var sql = 'SELECT username FROM user WHERE username = \'' + username + '\';';
        con.query(sql,function (err, result) {
            if(err) throw err;
            if(result.length === 0){
                console.log("登陆失败，账号不存在");
                res.send("登陆失败，账号不存在");
            }else{
                conn(function (con) {
                    var sql = 'SELECT username,password FROM user WHERE username = \'' + username + '\' AND password = \'' + password + '\';';
                    con.query(sql,function (err, result) {
                        if(err) throw err;
                        if(result.length !== 0){
                            console.log("登陆成功");
                            res.redirect('/main');
                        }else {
                            console.log("密码错误");
                            res.send("密码错误");
                        }
                    })
                })
            }
        })
    })
});
module.exports = router;
