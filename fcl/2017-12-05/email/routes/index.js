var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var base = require('./base');
var session = require('express-session');
var app = express();
app.use(session({
    secret: '12345',
    resave: true,
    saveUninitialized: true
}));
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/user/login', function(req, res, next) {
    res.render('login');
});

router.get('/user/register', function(req, res, next) {
    res.render('register');
});
module.exports = router;
