var assert = require('assert');
var hello = require('../src/').hello;
var fib = require('../src/index').fib;
var hanio = require('../src/hanio');


describe('project', function () {
  it('has hello', function () {
    // console.log(hello);
    assert.equal('Hello World', hello);
  });

  it('test fib 1', function () {
    assert.equal(1, fib(0));
    assert.equal(1, fib(1));
    assert.equal(2, fib(2));
    assert.equal(3, fib(3));
    assert.equal(5, fib(4));
    assert.equal(8, fib(5));
    assert.equal(13, fib(6));
    assert.equal(21, fib(7));
    assert.equal(34, fib(8));
    assert.equal(55, fib(9));
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

describe('project', function () {
  it('test hanio', function () {
    assert.equal('from a to c', hanio(1));
  });
  it('test hanio2', function () {
    assert.equal('from a to b,from a to c,from b to c', hanio(2));
  });
  it('test hanio exception', function () {
    try {
      hanio(0);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
});