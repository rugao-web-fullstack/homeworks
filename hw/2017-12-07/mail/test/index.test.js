var assert = require('assert');
var request = require('supertest');
var app = require('../src/app');

describe('url测试', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('主页') !== null);
        done();
      });
  });
  it('get /main', function (done) {
    request(app)
      .get('/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('邮箱功能选择界面') !== null);
        done();
      });
  });
  it('get /user/login', function (done) {
    request(app)
      .get('/user/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('登录界面') !== null);
        done();
      });
  });
  it('get /user/register', function (done) {
    request(app)
      .get('/user/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('注册界面') !== null);
        done();
      });
  });
  it('get /mail/list', function (done) {
    request(app)
      .get('/mail')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('邮件列表界面') !== null);
        done();
      });
  });
  it('get /mail/send', function (done) {
    request(app)
      .get('/mail/send')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('发送邮件页界面') !== null);
        done();
      });
  });
});