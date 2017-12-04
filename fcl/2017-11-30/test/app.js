var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var base = require('./base');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');


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
app.use(session({
  secret: '12345',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.post('/register', function(req, res) {
  var email = req.body.email;
  var name = email;
  var pwd = req.body.pwd;
  base(function(con) {
    var have = 'select *from user where username =\'' + name + '\';';
    con.query(have, function(err, result) {
      if (result.length === 0 && email !== '' && pwd !== '') {
        var sql = 'INSERT INTO user (username,password) VALUES(\'' + name + '\',\'' + pwd + '\');';
        var sql2 = 'INSERT INTO mailbox (address) VALUES(\'' + email + '\');';
        con.query(sql, function(err) {
          if (err) {
            throw err;
          }
          res.render('login');
        });
        con.query(sql2, function(err) {
          if (err) {
            throw err;
          }
        });
      } else {
        res.render('register');
      }
    });
  }, 'emailSystem');
});
app.post('/login', function(req, res) {
  var name = req.body.Name;
  var pwd = req.body.pwd;
  base(function(con) {
    var sql = 'select *from user where username =\'' + name + '\';';
    con.query(sql, function(err, result) {
      if (err) {
        throw err;
      }
      if (result.length !== 0) {
        if (name === result[0].username && pwd === result[0].password) {

          var sql2 = 'UPDATE user set states = \'logined\' where id = ' + result[0].id + ';';
          con.query(sql2, function(err) {
            if (err) {
              throw err;
            }
          });
          req.session.userInfo = name;
          res.render('user', { name: req.session.userInfo });
        } else {
          res.render('login');
        }
      } else {
        res.render('login');
      }

    });
  }, 'emailSystem');
});
app.post('/user', function(req, res) {
  var receiver = req.body.receiver;
  var content = req.body.content;
  var title = req.body.title;
  var userInfo = req.session.userInfo;
  base(function(con) {
    if (receiver !== '' && content !== '' && title !== '') {
      var sql = 'select *from mailbox where address =\'' + receiver + '\';';
      con.query(sql, function(err, result) {
        if (err) {
          throw err;
        }
        if (result.length !== 0) {
          var sql2 = 'INSERT INTO mail (sender,title,content,receiver) VALUES(\'' + userInfo + '\',\'' + title + '\',\'' + content + '\',\'' + receiver + '\');';
          con.query(sql2, function(err) {
            if (err) {
              throw err;
            }
            var sql3 = 'UPDATE user set states = \'receivedMail\' where id = ' + result[0].id + ';';
            con.query(sql3, function(err) {
              if (err) {
                throw err;
              }
            });
            res.render('mail', { name: userInfo });
          });
        } else {
          res.render('user');
        }
      });
    } else {
      res.render('user');
    }
  }, 'emailSystem');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
