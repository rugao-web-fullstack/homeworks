var request = require('supertest');
var assert = require('assert');
var app = require('../src/app'); 

describe('页面测试', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('欢迎页面') !== -1);
        done();
      });
  });
  it('get /user/register', function () {
    request(app)
      .get('/user/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('注册') !== -1);
      });
  });
  it('get /user/login', function () {
    request(app)
      .get('/user/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('登录') !== -1);
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
  it('get /user/logout', function (done) {
    request(app)
      .get('/user/logout')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('Found. Redirecting to /') !== -1);
        done();
      });
  });
  it('get /mail/send', function () {
    request(app)
      .get('/mail/send')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('发送邮件') !== -1);
      });
  });
  it('get /mail', function () {
    request(app)
      .get('/mail')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('邮件列表') !== -1);
      });
  });
 
  it('get /mail/1', function () {
    request(app)
      .get('/mail/1')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('邮件信息') !== -1);
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
});