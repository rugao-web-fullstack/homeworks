var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get(session({ secret: 'sosos' }));
var debug = require('debug')('log');


/* GET home page. */
router.get('/write', function (req, res, next) {
  res.render('write', { name: req.session.user.username });
  debug('log : '+next);
});
router.get('/read', function (req, res, next) {
  res.render('read', { name: req.session.user.username });
  debug('log : '+next);
});

router.get('/readcontent/:id', function (req, res, next) {
  res.render('readcontent', { name: req.session.user.username, id: req.params.id });
  debug('log : '+next);
});
router.get('/index', function (req, res, next) {
  req.session.user = null;
  res.redirect('/');
  debug('log : '+next);
});

module.exports = router;
