var request = require('supertest');
var assert = require('assert');
var mysql = require('mysql');
var basic = require('../src/db/base');

describe('数据库链接测试', function () {
    before(function (done) {
      // 创建数据库
      var con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD
      });
      con.query('DROP DATABASE db', function () {
        con.query('CREATE DATABASE dmail', function () {
          con.end();
          done();
        });
      });
    });
    it('connect to mysql', function (done) {
      basic(function (con) {
        assert(con);
        con.end();
        done();
      });
    });
    it('connect to db', function (done) {
      basic(function (con) {
        assert(con);
        con.end();
        done();
      }, 'db');
    });
  });