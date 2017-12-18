var assert = require('assert');
var mysql = require('mysql');
var base = require('../src/db/base');

describe('mydb connected', function () {
  before(function (done) {
    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    });
    con.query('DROP DATABASE mydb', function () {
      con.query('CREATE DATABASE mydb', function () {
        con.end();
        done();
      });
    });
  });
  it('connect to mysql', function (done) {
    base(function (con) {
      assert(con);
      con.end();
      done();
    });
  });
  it('connect to mydb', function (done) {
    base(function (con) {
      assert(con);
      con.end();
      done();
    }, 'mydb');
  });
});