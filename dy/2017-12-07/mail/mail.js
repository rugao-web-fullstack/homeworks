var express = require('express');
var mysql = require('mysql');
var path = require('path');
var nunjucks = require('nunjucks');
var app = express();

var dir = path.resolve(__dirname, './src/templates');
     
nunjucks.configure(dir, {
  autoescape: true,
  express: app
});

// 设置静态文件托管
app.use('/public', express.static(__dirname + '/src/public'));
app.use('/', require('./src/routers/main'));

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