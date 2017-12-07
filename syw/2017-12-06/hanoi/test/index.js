var assert = require('assert');
var hunt = require('../src/hnt.js');

describe('project', function () {
  it('test hnt', function () {
    assert.equal('from a to c', hunt(1));
    assert.equal('from a to b,from a to c,from b to c', hunt(2));
  });
  it('test hnt exception', function () {
    try {
      hunt(0);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
});