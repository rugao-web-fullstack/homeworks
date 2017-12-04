var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res) {
  res.render('login');
});
router.get('/register', function(req, res) {
  res.render('register');
});
router.get('/user', function(req, res) {
  res.render('user');
});
router.get('/mail', function(req, res) {
  res.render('mail');
});
module.exports = router;
