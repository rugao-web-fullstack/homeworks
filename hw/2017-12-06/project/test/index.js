var debug = require('debug')('xxx');
var assert = require('assert');
var hello = require('../src/').hello;
debug('log' + hello);
var fib = require('../src/').fib;

describe('Project', function () {
  it('hello', function () {
    assert.equal(-1, [1, 2, 3].indexOf(4));
  });

  it('test fib', function () {
    assert.equal(1, fib(0));
    assert.equal(1, fib(1));
    assert.equal(2, fib(2));
    assert.equal(3, fib(3));
    assert.equal(5, fib(4));
    assert.equal(8, fib(5));
  });

  it('test fib exception', function () {
    try {
      fib(-100);
    } catch (e) {
      e;
    }
  });
});