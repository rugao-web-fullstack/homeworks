var express = require('express');
var User = require('../models/User');
var router = express.Router();
var debug = require('debug')('log');

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
router.post('/register', function (req, res) {
    var username = req.body.username;
    var address = req.body.mail;
    var password = req.body.password;
    var repassword = req.body.repassword;

    // 判断注册信息不能为空
    if (username == '' || address == '' || password == '' || repassword == '') {
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
    var sql = 'select * from user where username="' + username + '" or address="' + address + '"';
    User.query(sql, function (err, rs) {
        if (err) {
            debug('log' + err);
        }
        debug('log' + rs);
        if (rs.length >= 1) {
            // 表示数据库中有该记录
            responseData.code = 3;
            responseData.message = '用户已经被注册！';
            res.json(responseData);
            return;
        }
        // 保存数据到数据库中
        var sql = 'INSERT INTO user (username, password, address) VALUES("'+ username + '", "' + password + '", "' + address + '");';
        User.query(sql, function (err) {
            if (err) throw err;
            debug('log' + '1 record inserted');
            responseData.code = 0;
            responseData.message = '注册成功，赶快去登录吧！(3秒后自动跳转…)';
            res.json(responseData);
        });
    });
});
router.post('/login', function (req, res) {
    var email = req.body.email;
    var pwd = req.body.pwd;

    // 判断登录信息不能为空
    if (email == '' || pwd == '') {
        responseData.code = 4;
        responseData.message = '请准确填写登录信息！';
        res.json(responseData);
        return;
    }

    // 判断邮箱及密码是否正确
    var sql = 'select * from user where address="' + email + '" and password="' + pwd + '"';
    User.query(sql, function (err, rs) {
        debug('log' + 'rs : ' + JSON.stringify(rs));
        if (err) {
            throw err;
        }
        if (rs.length >= 1) {
            
            // 表示数据库中有该记录
            responseData.code = 5;
            responseData.message = '登录成功！(3秒后跳转…)';
            
            var infos = {
                _id: rs[0].id,
                address: rs[0].address,
                username: rs[0].username
            };
            debug('log' + 'infos: ' + JSON.stringify(infos));
            responseData.userInfo = infos;
            req.cookies.set('userInfo', JSON.stringify(infos));
            
            res.json(responseData);
            return;
        } else {
            responseData.message = '请准确填写登录信息！';
            res.json(responseData);
            return;
        }
    });
});

router.get('/logout', function (req, res) {
    req.cookies.set('userInfo', null);
    res.json(responseData);
});

module.exports = router;