// test/test.js
const request = require('supertest');
const app = require('../src/email/app');
var assert = require('assert');


describe('when user is notlogin', function () {
  it('index should respond with html', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('主页')!==-1);
        done();
      });

  });

  it('login should respond with html', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('登录')!==-1);
        done();
      });
  });

  it('register should respond with html', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('注册')!==-1);
        done();
      });
  });

});













