var express = require('express');
var User = require('../models/User');
var router = express.Router();

// 设置统一返回的格式
var responseData;

// 设置返回的错误码及错误信息
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});
User.connect();
/**
 * 用户注册：
 */
router.post('/register', function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var repassword = req.body.repassword;

    // 判断注册信息不能为空
    if (username == '' || email == '' || password == '' || repassword == '') {
        responseData.code = 1;
        responseData.message = '注册信息不能为空，请补全！';
        res.json(responseData);
        return;
    }
    // 判断用户名、密码、邮箱的格式是否正确

    // 判断两次密码是否一致
    if (password != repassword) {
        responseData.code = -1;
        responseData.message = '两次密码输入不一致，请重新输入！';
        res.json(responseData);
        return;
    }
    // 判断用户是否已经注册
    User.query('select * from user', function (err, rs) {
        if (err) {
            console.log(err);
        }
        if (rs) {
            // 表示数据库中有该记录
            responseData.code = 3;
            responseData.message = '用户名已经被注册！';
            res.json(responseData);
            return;
        }
        // 保存数据到数据库中
        var sql = 'INSERT INTO user (username, password) VALUES(\'username\', \'password\');';
        User.query(sql, function (err, result) {
            if (err) throw err;
            console.log('1 record inserted');
            responseData.code = 0;
            responseData.message = '注册成功，赶快去登录吧！';
            res.json(responseData);
        });
    });
});
router.get('/login', function (req, res, next) {
    res.render('login.html');
});

module.exports = router;