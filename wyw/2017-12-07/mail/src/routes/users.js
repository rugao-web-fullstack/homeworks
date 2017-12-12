var express = require('express');
var router = express.Router();

/* 
用户登录
	POST /users 
	action=login
*/
router.post('/', function(req, res) {
  res.send('api之/users');
});
/* 
用户注册
	POST /users 
	action=register
*/
router.post('/register', function(req, res) {
  res.send('api之/users/register');
});

module.exports = router;
