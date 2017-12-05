var express = require('express');
var router = express.Router();
var session = require('express-session');
var app = express();
app.use(session({
  secret: '12345',
  resave: true,
  saveUninitialized: true
}));
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
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
module.exports = router;
