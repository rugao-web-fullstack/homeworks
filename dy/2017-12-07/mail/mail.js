var express = require('express');
var mysql = require('mysql');
var app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'test' });
});

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
});

var cbFunc = function cbFunc (cb) {
  return function (err) {
    if (err) throw err; 

    if (cb instanceof Function) {
      cb(con);
    }
  };
};
exports.mysql = function (cb) {
  con.connect(cbFunc(cb));
};
exports.cbFunc = cbFunc;
exports.app = app;