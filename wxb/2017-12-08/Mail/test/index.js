var request = require('supertest');
//var assert = require('assert');
var app = require('../src/app');

describe('URL test', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
  it('get /users/register', function (done) {
    request(app)
      .get('/users/register')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
  it('get /users/login', function (done) {
    request(app)
      .get('/users/login')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
  it('get /users/mail', function (done) {
    request(app)
      .get('/users/mail')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
  it('get /users/mail/write', function (done) {
    request(app)
      .get('/users/mail/write')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
  it('get /users/mail/all', function (done) {
    request(app)
      .get('/users/mail/all')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

});
