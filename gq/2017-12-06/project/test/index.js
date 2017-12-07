var assert = require('assert');
var hello = require('../src/').hello;
var fib = require('../src/').fib;
var hunt = require('../src/hanoi.js');
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

describe('project',function(){
  it('test hanoi 1', function () {
    assert.equal('from a to c', hunt(1));
  });
  it('test hanoi 2',function(){
    assert.equal('from a to b,from a to c,from b to c',hunt(2));
  });
  it('test hanoi exception',function(){
    try{
      hunt(0);
    }catch(e){
      assert.equal('Error Input',e.message);
    }
  });
});