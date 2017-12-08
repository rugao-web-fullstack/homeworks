var express = require('express');
var router = express.Router();

router.get('/write', function (req, res) {
  res.render('write', { title: 'WriteEmail' });
  return;
});

router.get('/list', function (req, res) {
  res.render('list', { title: 'EmailList' });
  return;
});
router.get('/read', function (req, res) {
  res.render('read', { title: 'EmailDetail' });
  return;
});

module.exports = router;