var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');


describe('url', function () {
  it('get /users/register', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('register') !== -1);
        done();
      });
  });
  it('get /users/login', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('login') !== -1);
        done();
      });
  });
  it('get /users/logout', function (done) {
    request(app)
      .get('/users/logout')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('login') !== -1);
        done();
      });
  });
  it('get /users/main', function (done) {
    request(app)
      .get('/users/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('main') !== -1);
        done();
      });
  });
});