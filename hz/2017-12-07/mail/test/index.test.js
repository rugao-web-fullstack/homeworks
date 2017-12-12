var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');


describe('url', function () {
  it('get /users/register', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('注册') !== -1);
        done();
      });
  });
  it('get /users/Login', function (done) {
    request(app)
      .get('/users/Login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('登录') !== -1);
        done();
      });
  });
  it('get /users/main', function (done) {
    request(app)
      .get('/users/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('主页') !== -1);
        done();
      });
  });
});