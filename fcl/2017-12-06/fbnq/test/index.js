var assert = require('assert');
var hello = require('../src/').hello;
var fib = require('../src/').fib;
describe('ceshi', function() {
  it('has hello', function() {
    assert.equal('Hello World', hello);
  });

  it('test fib 1', function() {
    assert.equal(1, fib(0));
    assert.equal(1, fib(1));
    assert.equal(2, fib(2));
    assert.equal(3, fib(3));
  });

  it('test fib exception', function() {
    try {
      fib(-1);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
});
