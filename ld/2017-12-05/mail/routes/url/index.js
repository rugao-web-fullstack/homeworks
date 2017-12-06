var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    res.render('index', { title: 'HOME', test: res.locals.islogin });
});

router.get('/home', function (req, res) {
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    res.render('home', { title: 'Home', user: res.locals.islogin });
});
module.exports = router;