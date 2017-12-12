var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');

describe('URL test', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('欢迎页面') !== -1);
        done();
      });
  });
  it('get /main', function (done) {
    request(app)
      .get('/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('主页') !== -1);
        done();
      });
  });
  it('get /user/login', function (done) {
    request(app)
      .get('/user/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('登录页面') !== -1);
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
  it('get /user/register', function (done) {
    request(app)
      .get('/user/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('注册页面') !== -1);
        done();
      });
  });
  it('get /mail', function (done) {
    request(app)
      .get('/mail')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('邮件列表页面') !== -1);
        done();
      });
  });
  it('get /mail/send', function (done) {
    request(app)
      .get('/mail/send')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('发送邮件页面') !== -1);
        done();
      });
  });
  it('get /mail/1', function (done) {
    request(app)
      .get('/mail/1')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('邮件信息页面') !== -1);
        done();
      });
  });

});