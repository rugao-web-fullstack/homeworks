var mysql = require('mysql');
var express = require('express');
var app = express();
var options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
};
var con = mysql.createConnection(options);
var cbFunc = function cbFunc(cb) {
  return function (err) {
    if (err) {
      throw err;
    }
    if (cb instanceof Function) {
      cb(con);
    }
  };
};

exports.cbFunc = cbFunc;
exports.mysql = function (cb) {
  con.connect(cbFunc(cb));
};
exports.hello = 'hello';
exports.app = app;
