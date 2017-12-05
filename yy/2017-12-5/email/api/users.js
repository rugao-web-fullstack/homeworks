var express = require('express');
var router = express.Router();
var base = require('../emaildb/base');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
    // next();
});
router.post('/register', function(req, res, next) {
    res.send('respond');
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    // 先查询user表中的该用户名是否被占用
    base(function (con) {
        var sql = "select * from user  where username='" + username + "';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result[0]) {
                req.session.register=0;
                res.redirect('/user');

            } else {
                //当用户名不存在，才执行插入user
                base(function (con) {
                    var sql = "INSERT INTO user (username,password) VALUES('" + username + "','" + password + "');";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log('1 user record inserted!');
                        console.log(result);
                        // 将该用户的id 与email一起插入进email表中
                        var userId=result.insertId;
                        base(function (con) {
                            var sql = "INSERT INTO emailBox (user,address) VALUES('" + userId + "','" + email + "');";
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log('1 emailBox record inserted!');
                                console.log(result);
                                req.session.register=1;
                                res.redirect('/user');

                            });
                        }, 'emaildb');
                    });
                }, 'emaildb');
            }
        });
    }, 'emaildb');

    // next();
});

module.exports = router;
