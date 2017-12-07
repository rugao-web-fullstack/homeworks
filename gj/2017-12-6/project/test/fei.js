var assert = require('assert');
var hello = require('../src/fei').hello;
var fib = require('../src/fei').fib;
var debug = require('debug')('log');
describe('project', function() {
  it('test fei hello', function() {
    //console.log(hello);
    debug('log:'+'heoolw');
    assert.equal('Hello World', hello);
  });

  it('test fib', function() {
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

	
  it('tset fib esception',function(){
    try{
      fib(-1);		
    }catch(e){
      assert.equal('Error Input',e.message);
    }
  });

	
});
