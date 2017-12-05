var express = require('express');
var router = express.Router();
var conn = require('../mysql');
/* GET register. */
router.get('/', function(req, res, next) {
    res.render('register', { title: '注册' });
});
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var address    = req.body.email;
    conn(function (con) {
        var sql = 'SELECT username FROM user WHERE username = \'' + username + '\';';
        con.query(sql,function (err, result) {
            if(err) throw err;
            if(result.length !==0){
                console.log("注册失败，该账号已经存在");
                res.send("该账号已存在");
            }else{
                conn(function (con) {
                    var sql = "INSERT INTO user (username , password , address) values ('" + username + "', '" + password + "','"+address+"')";
                    con.query(sql,function (err, result) {
                        if (err) throw err;
                        console.log(result);
                        console.log("注册成功");
                        res.redirect('/login');
                    })
                })
            }
        })
    })
});
module.exports = router;
