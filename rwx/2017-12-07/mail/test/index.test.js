var assert = require('assert');
var mysql = require('../src/').mysql;
var cbFunc = require('../src/').cbFunc;

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });

  describe('mysql()', function () {
    it('should test cbFunc', function () {
      var entered = false;
      var cb = cbFunc(function () { });
      try {
        cb(true);
      } catch (e) {
        entered = true;
      }
      assert(entered);
    });

    it('should test cbFunc', function () {
      var cb = cbFunc();
      cb(false);
    });

    it('should connect to mysql', function (done) {
      mysql(function (con) {
        assert(con);
        con.end();
        done();
      });
    });
  });
});
