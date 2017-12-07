var assert = require ('assert');
var fib=require('../src').fib;
describe('project',function(){
  it('test fib',function(){
    assert.equal(1,fib(0));
    assert.equal(1,fib(1));
    assert.equal(2,fib(2));
    assert.equal(3,fib(3));
    assert.equal(5,fib(4));
    assert.equal(8,fib(5));
    assert.equal(13,fib(6));
  });
  it('test fib exception',function(){
    try {
      fib(-1);
    } catch (e){
      assert.equal('Error Input',e.message);
    }
  });
});
