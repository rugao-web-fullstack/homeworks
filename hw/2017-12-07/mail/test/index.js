var assert = require('assert');
var request = require('supertest');
var app = require('../src/index').app;

describe('', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('首页') !== null);
        done();
      });
  });
});