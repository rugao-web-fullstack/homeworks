var express = require('express');
var app = express();
var router = express.Router();

var session = require('express-session');
app.use(session({ secret: 'sosos' }));

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('这里是邮件页面');
});

router.get('/write', function (req, res) {
  res.render('mails/write', { title: '编写邮件', name: req.session.user.username });
});

router.get('/read', function (req, res) {
  res.render('mails/read', { title: '查看邮件', name: req.session.user.username });
});

router.get('/detail/:id', function (req, res) {
  // res.send(req.params.id);
  res.render('mails/detail', { title: '查看详情', name: req.session.user.username, id: req.params.id });

});

module.exports = router;