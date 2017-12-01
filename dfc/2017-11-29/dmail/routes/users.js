var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
	res.render('login', {
		title: '登录'
	});
});

router.post('/login', function(req, res, next) {
	let userMessage = req.body;
	if(userMessage.username === 'root'){
		if(userMessage.password === '123'){
			res.redirect('/main');
		}
	}else{
		res.write('404');
	}
});
router.get('/register', function(req, res, next) {
	res.render('register', {
		title: '注册'
	});
});

module.exports = router;