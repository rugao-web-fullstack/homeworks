var express = require('express');
var router = express.Router();
var User = require('../../user');
var usr = require('../../databaseCon');
/* GET users listing. */
router.route('/reg')
    .post(function (req, res) {
        var user = new User(req.body.username, req.body.password);
        var client = usr.connect();
        user.register(client, req.body.username, req.body.password, function (err) {
            if (err) {
                throw err;
                //res.send('');
            }
            //res.send('注册成功');
            res.redirect('/');
        });
    });


router.route('/login')
    .post(function (req, res) {
        //var user1 = new User(req.body.username, req.body.password);
        var client = usr.connect();
        usr.selectFun(client, req.body.username, function (result) {
            if (result[0] === undefined) {
                res.send('没有该用户');
            } else {
                if (result[0].password === req.body.password) {
                    req.session.islogin = req.body.username;
                    res.locals.islogin = req.session.islogin;
                    res.cookie('islogin', res.locals.islogin, { maxAge: 60000 });
                    res.redirect('/home');
                    //res.send('success')
                } else {
                    //res.redirect('user/login');
                    res.send('fail');
                }
            }
        });
    });

module.exports = router;
