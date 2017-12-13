var debug = require('debug')('xxx');
var express = require('express');
var router = express.Router();
//var session = require('express-session');
//router.get(session({ secret: 'sosos' }));

/* GET users listing. */
router.get('/', function (req, res, next) {
  debug('log:' + next);
  res.render('mail/list', {
    title: '邮件列表'
  });
});
router.get('/send', function (req, res, next) {
  debug('log:' + next);
  if (req.param)
    res.render('mail/send', {
      title: '发送邮件'
    });
});
router.get('/:id', function (req, res, next) {
  debug('log:' + next);
  if (!isNaN(req.params.id)) {
    res.render('mail/content', {
      title: '邮件信息'
    });
  }
});

module.exports = router;