var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/maillist', function(req, res, next) {
	res.render('maillist', {
		title: '邮件列表'
	});
});
router.get('/mailsend', function(req, res, next) {
	res.render('mailsend', {
		title: '发送邮件'
	});
});
router.get('/mailcon', function(req, res, next) {
	res.render('mailcon', {
		title: '登出'
	});
});

module.exports = router;