var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');


describe('url', function () {
  // 首页
  it('get /user/main', function (done) {
    request(app)
      .get('/user/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('main') !== -1);
        done();
      });
  });
  // 注册
  it('get /user/register', function (done) {
    request(app)
      .get('/user/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('register') !== -1);
        done();
      });
  });
  
  // 登录
  it('get /user/login', function (done) {
    request(app)
      .get('/user/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('login') !== -1);
        done();
      });
  });


  // ----------------------------邮箱部分
  it('get /mail/main', function (done) {
    request(app)
      .get('/mail/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('main') !== -1);
        done();
      });
  });
});