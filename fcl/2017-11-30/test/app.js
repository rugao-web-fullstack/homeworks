var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var base = require('./base');
var index = require('./routes/index');
var users = require('./routes/users');
var url = require("url");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.post("/register", function(req, res) {
    var email = req.body.email;
    var name = email;
    var pwd = req.body.pwd;
    base(function(con) {
        var have = "select * from user where username ='" + name +"';";
        con.query(have,function(err,result){
            if (result.length === 0 && email !== "" && pwd !== "") {
                var sql = "INSERT INTO user (username, password) VALUES('" + name + "', '" + pwd + ");";
                var sql2 = "INSERT INTO mailbox (address) VALUES('" + email + "');";
                con.query(sql,function(err, result2) {
                    if (err) {
                        throw err;
                        return;
                    }
                    res.render('login');
                });
                con.query(sql2,function(err, result3) {
                    if (err) {
                        throw err;
                        return;
                    }
                });
            }else{
                 res.render('register');
            }
        })
    }, "emailSystem");
});
app.post("/login", function(req, res) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    base(function(con) {
        var sql = "select * from user where username ='" + name + "';";
        con.query(sql, function(err, result) {
            if (err) {
                throw err;
                return;
            }
            if (name === result[0].username && pwd === result[0].password) {
                var sql2 = "INSERT INTO user (states) VALUES('logined');";
                con.query(sql2, function(err, result3) {
                    if (err) {
                        throw err;
                        return;
                    }
                });
                res.render('user');
            } else {
                res.render('login');
            }
        });
    },"emailSystem")
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
