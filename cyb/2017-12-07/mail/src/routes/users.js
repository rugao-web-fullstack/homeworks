var express = require('express');
var router = express.Router();
var User = require('../work/user');

router.post('/login', function(req, res, next) {
  User(req, res, next);
});

router.post('/register', function(req, res, next) {
  User(req, res, next);
});

module.exports = router;
