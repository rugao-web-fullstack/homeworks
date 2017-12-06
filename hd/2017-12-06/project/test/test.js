var assert = require('assert');
var fib = require('../src/fib');

describe('project',function(){

  it('test fib',function(){
    assert.equal(1,fib(1));
    assert.equal(1,fib(2));
    assert.equal(2,fib(3));
    assert.equal(3,fib(4));
    assert.equal(5,fib(5));
  });
  
});
