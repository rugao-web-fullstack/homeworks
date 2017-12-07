var assert = require('assert');
var Hanoi = require('../src/').Hanoi;
describe('project', function () {
  it('test hnt', function () {
    assert.equal(['from a to c'], Hanoi(1));
  });
  it('test hnt2', function () {
    assert.equal(['from a to b,from a to c,from b to c'], Hanoi(2));
  });
  it('test hnt exception', function () {
    try {
      Hanoi(0);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
});
