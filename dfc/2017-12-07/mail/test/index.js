var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');
var mysql = require('mysql');
var basic = require('../src/db/basic');

// var cookies;

describe('页面url测试', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('-欢迎页面') !== -1);
        done();
      });
  });
  it('get /main', function (done) {
    request(app)
      .get('/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('-主页') !== -1);
        done();
      });
  });
  it('get /user/login', function (done) {
    request(app)
      .get('/user/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('-登录页面') !== -1);
        done();
      });
  });
  it('get /user/register', function (done) {
    request(app)
      .get('/user/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('-注册页面') !== -1);
        done();
      });
  });
  it('get /user/logout', function (done) {
    request(app)
      .get('/user/logout')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('Found. Redirecting to /') !== -1);
        done();
      });
  });
  it('get /mail', function (done) {
    request(app)
      .get('/mail')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('-邮件列表页面') !== -1);
        done();
      });
  });
  it('get /mail/send', function (done) {
    request(app)
      .get('/mail/send')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('-发送邮件页面') !== -1);
        done();
      });
  });
  it('get /mail/1', function (done) {
    request(app)
      .get('/mail/1')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('-邮件信息页面') !== -1);
        done();
      });
  });
  it('get /mail/wwww', function (done) {
    request(app)
      .get('/mail/wwww')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('404') !== -1);
        done();
      });
  });

  describe('数据库链接测试', function () {
    before(function () {
      // 创建数据库
      var con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD
      });
      con.query('DROP DATABASE dmail', function () { });
      con.query('CREATE DATABASE dmail', function () { });
      con.end();
    });
    it('connect to mysql', function (done) {
      basic(function (con) {
        assert(con);
        con.end();
        done();
      });
    });
    it('connect to dmail', function (done) {
      basic(function (con) {
        assert(con);
        con.end();
        done();
      }, 'dmail');
    });
    it('should not connect to ss', function () {
      basic('', 'ss');
    });
  });
  // it('should respond with json', function (done) {
  //   var req = request(app)
  //     .get('/');
  //   req.cookies = cookies;
  //   req
  //     .expect(200, function (err, res) {
  //       assert(res.body, 2);
  //       done();
  //     });
  // });

});