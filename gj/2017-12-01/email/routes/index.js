var express = require('express');
var router = express.Router();
var debug = require('debug')('log');

/* GET home page. */
router.get('/', function (req, res, next) {
  debug('log : '+next);
  res.render('index', { title: 'Express' });
});

module.exports = router;
