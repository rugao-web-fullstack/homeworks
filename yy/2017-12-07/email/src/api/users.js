var express = require('express');
var router = express.Router();
var User = require('../operations/usersTest').User;
var user = new User();
router.post('/register', function (req, res) {
  user.register(req, res);
  // next();
});
router.post('/login', function (req, res) {
  user.login(req, res);
  // next();
});
module.exports = router;
