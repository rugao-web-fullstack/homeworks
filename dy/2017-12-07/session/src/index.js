var express = require('express');
var session = require('express-session');

var app = express();
app.use(session({secret: 'sososososos'}));

app.get('/', function (req, res) {
  if (req.session.page) {
    req.session.page++;
  } else {
    req.session.page = 1;
  }
  res.json(req.session.page);
});

exports.app = app;