var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get(session({ secret: 'sosos' }));

/* GET users listing. */
router.get('/login', function (req, res, next) {
    res.render('user/login', {
        title: '登录'
    });
});

router.get('/register', function (req, res, next) {
    res.render('user/register', {
        title: '注册'
    });
});
module.exports = router;