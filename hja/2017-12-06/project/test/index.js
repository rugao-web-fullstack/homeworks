var assert = require('assert');

var hello = require('../src/').hello;
var fib = require('../src/index').fib;
var han = require('../src/index2');

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


describe('This is hannuo test', function () {
  it('true hannuo', function () {

    assert.equal('1,A,C', han.han1(1, 'A', 'B', 'C'));
    assert.equal('1,A,B,2,A,C,1,B,C', han.han1(2, 'A', 'B', 'C'));
    assert.equal('1,A,C,2,A,B,1,C,B,3,A,C,1,B,A,2,B,C,1,A,C', han.han1(3, 'A', 'B', 'C'));
  });

});



