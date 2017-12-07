var assert = require('assert');
var hanoi = require('../src/hanoi').hanoi;
describe('ceshi', function() {
  it('test hanoi 1', function() {
    assert.equal('Move ' + 1 + ' from A to C', hanoi(1, 'A', 'B', 'C'));
    assert.equal('Move ' + 2 + ' from A to C', hanoi(2, 'A', 'B', 'C'));
  });

  it('test hanoi exception', function() {
    try {
      hanoi(-1);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
});
