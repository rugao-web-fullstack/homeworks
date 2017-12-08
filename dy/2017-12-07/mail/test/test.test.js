var assert = require('assert');
const request = require('supertest');
const app = require('../mail').app;
var mysql = require('../mail').mysql;
var cbFunc = require('../mail').cbFunc;

// 测试 express
describe('GET /user', function () {
  it ('should response with json', function (done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// 测试 mysql
describe('#indexOf()', function () {
  it ('should return -1 when the value is not present', function () {
    assert.equal(-1, [1, 2, 3].indexOf(4));
  });
});
describe('mysql()', function () {
  it ('should test cbFunc', function () {
    var entered = false;
    var cb = cbFunc(function () {});
    try {
      cb(true);
    } catch (e) {
      entered = true;
    }
    assert(entered);
  });
  it ('should test cbFunc', function () {
    var cb = cbFunc();
    cb(false);
  });

  it ('should connect to mysql', function (done) {
    mysql(function (con) {
      assert(con);
      con.end();
      done();
    });
  });
});