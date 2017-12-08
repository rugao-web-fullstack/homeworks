var assert = require('assert');
const request = require('supertest');
const app = require('../mail').app;
var mysql = require('../mail').mysql;
var cbFunc = require('../mail').cbFunc;

// 测试 express
describe('GET index.html', function () {
  it ('should response with index.html', function (done) {
    request(app)
      .get('/')
      .set('Accept', 'application/html')
      .expect('Content-Type', /text\/html; charset=utf-8/)
      .expect(200, done);
  });
});

// 测试 mysql
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

  it ('should connect to mysql', function () {
    mysql(function (con) {
      assert(con);
      con.end();
    });
  });
});

// 测试 nunjucks
// describe('test nunjucks', function () {
//     it ('should get files', function () {

//     });
// });