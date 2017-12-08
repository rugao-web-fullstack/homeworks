var request = require('supertest');
var assert = require('assert');
var app = require('../src/app').app;

// var cookies;

describe('页面url测试', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
       assert((res.body.H).indexOf('欢 迎 使 用 邮 件 系 统') !== -1);
        done();
      });
  });
  it('get /users/home', function (done) {
    request(app)
      .get('/users/home')
      .expect(200, function (err, res) {
        assert((res.body.H).indexOf('请选择您需要的服务') !== -1);
        done();
      });
  });
  it('get /users/login', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, function (err, res) {
        assert((res.body.H).indexOf('登录') !== -1);
        done();
      });
  });
  it('get /users/register', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        assert((res.body.H).indexOf('注册') !== -1);
        done();
      });
  });
  it('get /mails/read', function (done) {
    request(app)
      .get('/mails/read')
      .expect(200, function (err, res) {
        assert((res.body.H).indexOf('邮 件 列 表') !== -1);
        done();
      });
  });
  it('get /mails/write', function (done) {
    request(app)
      .get('/mails/write')
      .expect(200, function (err, res) {
        assert((res.body.H).indexOf('填 写 邮 件') !== -1);
        done();
      });
  });
  it('get /readcontent/:id', function (done) {
    request(app)
      .get('/readcontent/:id')
      .expect(200, function (err, res) {
        assert((res.body.H).indexOf('readcontent') !== -1);
        done();
      });
  });

});