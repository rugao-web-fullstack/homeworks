var assert = require('assert');
var hello = require('../src/').hello;
var fib = require('../src').fib;
describe('project1', function () {
  it ('has hello', function () {
    assert.equal('Hello World', hello);
  });
  it ('test fib', function () {
    assert.equal(1, fib(0));
    assert.equal(1, fib(1));
    assert.equal(2, fib(2));
    assert.equal(3, fib(3));
    assert.equal(5, fib(4));
    assert.equal(8, fib(5));
  });
});
