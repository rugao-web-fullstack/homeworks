var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');

// var cookies;

describe('url', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('Express') !== -1);
        done();
      });
  });
  it('get /users/home', function (done) {
    request(app)
      .get('/users/home')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('home') !== -1);
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
  it('get /users/register', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('register') !== -1);
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
  it('get /mails/write', function (done) {
    request(app)
      .get('/mails/write')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('write') !== -1);
        done();
      });
  });
  it('get /mails/readcontent/:id', function (done) {
    request(app)
      .get('/mails/readcontent/:id')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('readcontent') !== -1);
        done();
      });
  });

});