var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('main', {
      title: '主页',
      username:req.session.user
    });
    next();
  }else{
    res.render('index', {
      title: '欢迎'
    });
  }
});
router.get('/main', function(req, res, next) {
  if(req.session.user){
    res.render('main', {
      title: '主页',
      username:req.session.user
    });
    next();
  }else{
    res.render('index', {
      title: '欢迎'
    });
  }
});
router.get('/out', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
  next();
});
module.exports = router;