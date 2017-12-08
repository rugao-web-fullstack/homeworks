var express = require('express');
var router = express.Router();

router.get('/:action', function (req, res) {
  var action = req.params.action;
  switch (action) {
  case 'register':
    res.render('register', {title: 'register'});
    break;
  case 'login':
    res.render('login', {title: 'login'});
    break;
  case 'logout':
    res.render('index', {title: 'index'});
    break;
  }
});

module.exports = router;
