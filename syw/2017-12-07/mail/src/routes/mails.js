var express = require('express');
var router = express.Router();

// GET跳转
router.get('/write', function (req, res) {
  res.render('write',{title :'write'});
  return;
});

router.get('/read', function (req, res) {
  res.render('read',{title :'read'});
  return;
});

module.exports = router;
