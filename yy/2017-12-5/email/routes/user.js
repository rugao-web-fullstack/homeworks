var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  // next();
});
router.get('/register', function(req, res, next) {
    res.render('register',{
      title:'注册'
    });
    // next();
});

module.exports = router;
