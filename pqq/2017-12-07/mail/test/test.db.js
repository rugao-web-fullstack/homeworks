var assert = require('assert');
var mysql = require('mysql');
var basic = require('../src/db/base');

describe('database test------------', function () {
  before(function (done) {
    // 创建数据库
    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    });
    con.query('DROP DATABASE db', function () {
      con.query('CREATE DATABASE mail', function () {
        con.end();
        done();
      });
    });
  });
  // 测试
  it('connect to mysql', function (done) {
    basic(function (con) {
      assert(con);
      con.end();
      done();
    });
  });
  // 测试
  it('connect to db', function (done) {
    basic(function (con) {
      assert(con);
      con.end();
      done();
    }, 'db');
  });
});