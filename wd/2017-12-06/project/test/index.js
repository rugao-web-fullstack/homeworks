var assert = require('assert');
var hello = require('../src/').hello;
var fib = require('../src/index.js').fib;
var hunt = require('../src/hnt.js');
describe('project', function () {
  it('has hello', function () {
    assert.equal('Hello world', hello);
  });
  it('test fib', function () {
    assert.equal(1, fib(0));
    assert.equal(1, fib(1));
    assert.equal(2, fib(2));
    assert.equal(3, fib(3));
    assert.equal(5, fib(4));
    assert.equal(89, fib(10));
  });
  it('test fib exception', function(){
    try{
      fib(-1);	
    }catch(e){
      assert.equal('Error Input', e.message);		
    }
  });
});

describe('project', function () {
  it('test hnt', function () {
    assert.equal('from a to c', hunt(1));
  });
  it('test hnt2', function () {
    assert.equal('from a to b,from a to c,from b to c', hunt(2));
  });
  it('test hnt exception', function () {
    try {
      hunt(0);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
});
