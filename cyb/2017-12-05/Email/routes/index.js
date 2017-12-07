var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {//未登录
  if (req.session.user) {
    //console.log(req.session.user);
    res.render('main', {
      title: 'home',
      username: req.session.user
    });
  } else {
    res.render('index', {
      title: 'Welcome'
    });
  }
});
router.get('/main', function (req, res) {//已登录
  if (req.session.user) {
    //console.log(req.session.user);
    res.render('main', {
      title: 'home',
      username: req.session.user
    });
  } else {
    res.render('index', {
      title: 'Welcome'
    });
  }
});
module.exports = router;