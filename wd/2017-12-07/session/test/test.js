var request = require('supertest');
var assert = require('assert');
var app = require('../src/').app;
var debug = require('debug')('xxx');

var cookies;
describe('POST /user/login', function() {
  it('should respond with json', function(done) {
    request(app)
      .get('/')
      .expect(200, function(err, res) {
        debug('log:' + res.headers);
        cookies = res.headers['set-cookie'];

        assert(cookies !== null);
        assert(res.body, 1);
        done();
      });
  });

  it('should respond with json', function(done) {
    var req = request(app)
      .get('/');
    req.cookies = cookies;
    req
      .expect(200, function(err, res) {
        assert(res.body, 2);
        done();
      });
  });

});
