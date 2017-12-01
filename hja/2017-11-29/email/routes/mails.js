var express = require('express');
var app = express();
var router = express.Router();
var session = require('express-session');
app.use(session({ secret: "sosos" }));

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('这里是邮件页面');
});

router.get('/write', function (req, res, next) {
    res.render('write', { title: '编写邮件', name: req.session.user.username });
});

router.get('/read', function (req, res, next) {
    res.render('read', { title: '查看邮件' });
});

module.exports = router;