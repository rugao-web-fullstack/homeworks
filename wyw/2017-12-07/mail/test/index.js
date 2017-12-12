var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');

// var cookies;

describe('页面url测试', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('登录') !== -1);
        done();
      });
  });
  it('post /users', function (done) {
    request(app)
      .post('/users')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('api之/users') !== -1);
        done();
      });
  });
  it('get /mail', function (done) {
    request(app)
      .get('/mail')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('邮箱主页') !== -1);
        done();
      });
  });
  it('post /mails', function (done) {
    request(app)
      .post('/mails')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('api之/mails') !== -1);
        done();
      });
  });
  it('post /mails/send', function (done) {
    request(app)
      .post('/mails/send')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('api之/mails/send') !== -1);
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
  it('post /users/register', function (done) {
    request(app)
      .post('/users/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('api之/users/register') !== -1);
        done();
      });
  });
  it('get /mail/write', function (done) {
    request(app)
      .get('/mail/write')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('收件人') !== -1);
        done();
      });
  });
  it('get /mail/read', function (done) {
    request(app)
      .get('/mail/read')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('序号') !== -1);
        done();
      });
  });
});
