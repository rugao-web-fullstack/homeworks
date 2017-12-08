var assert = require('assert');
var mysql = require('../src/').mysql;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });

  describe('mysql()', function() {
    it('should connect to mysql', function(done) {
      mysql(function(con) {
        assert(con);
        con.end();
        done();
      });
    });
    it('should connect to mysql', function() {
      try {
        mysql();
      } catch(e) {
        assert(e);
      }
    });
  });
});
