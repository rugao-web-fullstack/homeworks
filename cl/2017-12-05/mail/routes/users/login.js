var express = require('express');
var router = express.Router();
var basic = require('../../base');
/* GET login. */
router.get('/', function(req, res, next) {
    res.render('login', { title: '登录' });
});
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    basic(function (con) {
        var sql = 'select username from user where username = \'' + username + '\';';
        con.query(sql,function (err, result) {
            if(err) throw err;
            if(result.length === 0){
                console.log("用户名不存在");
                res.send("用户名不存在");
            }else{
                basic(function (con) {
                    var sql = 'select username,password from user where username = \'' + username + '\' and password = \'' + password + '\';';
                    con.query(sql,function (err, result) {
                        if(err) throw err;
                        if(result.length !== 0){
                            console.log("登录成功");
                            res.redirect('/main');
                        }else {
                            console.log("密码不正确");
                            res.send("密码不正确");
                        }
                    })
                })
            }
        })
    })
});
module.exports = router;
