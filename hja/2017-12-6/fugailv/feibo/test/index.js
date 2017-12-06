var assert = require('assert');

var hello = require('../src/').hello;
var fib = require('../src/').fib;

describe('project', function () {

  it('should return hello', function () {
    assert.equal('hello world', hello);

  });

  it('fib 1', function () {
    assert.equal(1, fib(0));
    assert.equal(1, fib(1));
    assert.equal(2, fib(2));
    assert.equal(89, fib(10));
  });

  it('test fib exception', function () {
    try {
      fib(-1);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });

});
