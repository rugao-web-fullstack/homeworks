var assert = require('assert');
var mysql = require('../src/emaildb/base1').init;
var cbFunc = require('../src/emaildb/base1').cbFunc;
  
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
    },'emaildb');
  });
});
