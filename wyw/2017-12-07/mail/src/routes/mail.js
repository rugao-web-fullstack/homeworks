var express = require('express');
var router = express.Router();

/*
    URL: /main
	作用：选择写邮件和查看邮件功能
*/
router.get('/', function(req, res) {
  res.render('mail');
});
/*
    URL：/main/mail/write
    作用：写邮件和发送邮件功能
    */
router.get('/write', function(req, res) {
  res.render('write');
});
/*
    URL：/main/mail/read
    作用：读取邮件信息功能
    */
router.get('/read', function(req, res) {
  res.render('read');
});

module.exports = router;