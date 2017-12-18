var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');

describe('页面url测试', function () {
  //用户
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('首页') !== -1);
        done();
      });
  });
  it('get /user/register', function (done) {
    request(app)
      .get('/user/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('注册') !== -1);
        done();
      });
  });
  it('get /user/register/success', function (done) {
    request(app)
      .get('/user/register/success')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('注册成功') !== -1);
        done();
      });
  });
  it('get /user/register/failure', function (done) {
    request(app)
      .get('/user/register/failure')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('注册失败') !== -1);
        done();
      });
  });
  it('get /user/login', function (done) {
    request(app)
      .get('/user/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('登录') !== -1);
        done();
      });
  });
  it('get /user/login/success', function (done) {
    request(app)
      .get('/user/login/success')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('登录成功') !== -1);
        done();
      });
  });
  it('get /user/login/failure', function (done) {
    request(app)
      .get('/user/login/failure')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('登录失败') !== -1);
        done();
      });
  });
  //邮件
  it('get /email/write', function (done) {
    request(app)
      .get('/email/write')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('写邮件') !== -1);
        done();
      });
  });
  it('get /email/send/success', function (done) {
    request(app)
      .get('/email/send/success')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('发送成功') !== -1);
        done();
      });
  });
  it('get /email/send/failure', function (done) {
    request(app)
      .get('/email/send/failure')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('发送失败') !== -1);
        done();
      });
  });
  it('get /email/read', function (done) {
    request(app)
      .get('/email/read')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('读邮件') !== -1);
        done();
      });
  });

});
