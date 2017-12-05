var express = require('express');
var router = express.Router();
var base = require('./base');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(session({
    secret: '12345',
    resave: true,
    saveUninitialized: true
}));
router.get('/mail', function(req, res, next) {
    var sql4 = "select *from mail where receiver ='" + req.session.userInfo + "';";
    base(function(con) {
        con.query(sql4, function(err, result4) {
            if (err) {
                throw err;
                return;
            }
            var title = result4[0].title;
            var content = result4[0].content;
            var sender = result4[0].sender;
            res.render('mail', { name: req.session.userInfo, sender: sender, title: title, content: content });
        })
    }, "emailSystem");
});
