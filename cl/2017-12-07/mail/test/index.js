var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');
var debug = require('debug')('xxx');

describe('url', function () {
  it('get /users/main', function (done) {
    request(app)
      .get('/users/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('main') !== -1);
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
  it('get /mails/write', function (done) {
    request(app)
      .get('/mails/write')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('write') !== -1);
        done();
      });
  });
  it('get /mails/read', function (done) {
    request(app)
      .get('/mails/read')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('read') !== -1);
        done();
      });
  });

  it('post /users/login', function (done) {
    request(app)
      .post('/users/login')
      .expect(200, function (err, res) {
        debug('info'+res);
        done();
      });
  });
  it('post /users/register', function (done) {
    request(app)
      .post('/users/register')
      .expect(200, function (err, res) {
        debug('info'+res);
        done();
      });
  });
 
});