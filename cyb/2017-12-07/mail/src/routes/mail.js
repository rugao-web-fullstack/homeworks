var express = require('express');
var router = express.Router();
//var Mail = require('../../mov/mail');

/* GET users listing. */
router.get('/', function (req, res) {
  res.render('mail/list', {
    title: '邮件列表页面'
  });
});
router.get('/send', function (req, res) {
  res.render('mail/send', {
    title: '发送邮件页面'
  });
});
router.get('/:id', function (req, res) {
  res.render('mail/content', {
    title: '邮件信息页面'
  });
});

module.exports = router;