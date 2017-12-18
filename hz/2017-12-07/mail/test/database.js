var assert = require('assert');
var mysql = require('../src/api/base').init;
describe('mysql', function () {
  it('connect to mysql', function (done) {
    mysql(function (con) {
      assert(con);
      con.end();
      done();
    }, 'mail');
  });
});