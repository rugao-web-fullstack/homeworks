var assert = require('assert');
var hanoi = require('../src/').hanoi;

describe('hanoi', function () {
  it('test hanoi 1', function () {
    assert.equal('from a to c', hanoi(1));
  });
  it('test hanoi 2', function () {
    assert.equal('from a to b,from a to c,from b to c', hanoi(2));
  });
  it('test hanoi exception', function () {
    try {
      hanoi(0);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
  
});
