var express = require('express');
var router = express.Router();
var User = require('../../user');
/* GET users listing. */
router.route('/reg')
    .get(function (req, res) {
        res.render('user/reg', { title: '注册' });
    });


router.route('/login')
    .get(function (req, res) {
        if (req.session.islogin) {
            res.locals.islogin = req.session.islogin;
        }

        if (req.cookies.islogin) {
            req.session.islogin = req.cookies.islogin;
        }
        res.render('user/login', { title: '用户登录', test: res.locals.islogin });
    });

router.get('/logout', function (req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;
