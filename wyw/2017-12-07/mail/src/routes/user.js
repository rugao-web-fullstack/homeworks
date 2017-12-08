var express = require('express');
var router = express.Router();


/* 
  URL：/user/register
	作用：注册用户功能
*/
router.get('/register', function(req, res) {
  res.render('register');
});

module.exports = router;