var assert = require('assert');
var mysql = require('../src/config/db').query;
describe('mysql', function () {
  it('connect to mysql', function (done) {
    assert.equal('connected',mysql('connected',function(){done();}));
  });
});
