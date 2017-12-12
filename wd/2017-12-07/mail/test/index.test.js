var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');


describe('url', function () {
  it('get /users/Register', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('Register') !== -1);
        done();
      });
  });
  it('get /users/Login', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('Login') !== -1);
        done();
      });
  });
  it('get /users/Main', function (done) {
    request(app)
      .get('/users/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('Main') !== -1);
        done();
      });
  });
  it('get /emails/Write', function (done) {
    request(app)
      .get('/emails/write')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('WriteEmail') !== -1);
        done();
      });
  });
  it('get /emails/List', function (done) {
    request(app)
      .get('/emails/list')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('EmailList') !== -1);
        done();
      });
  });
  it('get /emails/Read', function (done) {
    request(app)
      .get('/emails/read')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('EmailDetail') !== -1);
        done();
      });
  });
});
