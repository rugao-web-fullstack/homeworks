var request = require('supertest');
var assert = require('assert');
var app = require('../src/app').app;


describe('url', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('index') !== -1);
        done();
      });
  });
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
        assert((res.text).indexOf('index') !== -1);
        done();
      });
  });
  it('get /main', function (done) {
    request(app)
      .get('/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('main') !== -1);
        done();
      });
  });
  it('get /mails', function (done) {
    request(app)
      .get('/mails')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('list') !== -1);
        done();
      });
  });
  it('get /mails/write', function (done) {
    request(app)
      .get('/mails/write')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('write') !== -1);
        done();
      });
  });
  it('get /mails/1', function (done) {
    request(app)
      .get('/mails/1')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('read') !== -1);
        done();
      });
  });
  it('get /mails/ny', function (done) {
    request(app)
      .get('/mails/ny')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('404') !== -1);
        done();
      });
  });
});

