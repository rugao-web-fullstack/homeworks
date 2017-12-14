var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('main', {
    title: '主页',
    username: req.session.user
  });
});

module.exports = router;
