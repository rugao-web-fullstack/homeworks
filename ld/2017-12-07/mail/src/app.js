var express = require('express');
var path = require('path');
//var favicon = require('static-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/url/index');
var user = require('./routes/url/user');
var mail = require('./routes/url/mail');

/* var users = require('./routes/api/users');
var mails = require('./routes/api/mails'); */

var session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser('An'));
app.use(session({
    secret: 'an',
    resave: 'false',
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//url
app.use('/', index);
app.use('/user', user);
app.use('/mail', mail);
//api
//app.use('/users', users);
//app.use('/mails', mails);

/// catch 404 and forwarding to error handler
/* app.use(function (req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    //next(err);
}); */

/// error handlers

// development error handler
// will print stacktrace
/* if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
 */
// production error handler
// no stacktraces leaked to user
/* app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
 */

module.exports = app;
