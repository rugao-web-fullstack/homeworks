var assert = require('assert');
var fib = require('../src/').fib;
var nuo = require('../src/').nuo;
describe('project',function() {
  //斐波那契测试
  it('test fib',function() {
    assert.equal(1,fib(0));
    assert.equal(1,fib(0));
    assert.equal(2,fib(2));
    assert.equal(3,fib(3));
    assert.equal(5,fib(4));
    assert.equal(8,fib(5));
  });
  it('test fib exception',function() {
    try {
      fib(-1);
    } catch(e) {
      assert.equal('error input',e.message);
    }
  });
  //汉诺塔测试
  it('test nuo',function() {
    assert.equal('1,A,C',nuo(1));
    assert.equal('1,A,B-2,A,C-1,B,C',nuo(2));
    assert.equal('1,A,C-2,A,B-1,C,B-3,A,C-1,B,A-2,B,C-1,A,C',nuo(3));
  });
  it('test hanoi exception',function() {
    try {
      nuo(0);
    } catch(e) {
      assert.equal('error input',e.message);
    }
  });
  it('test nuo exception',function() {
    try {
      nuo(-1);
    } catch(e) {
      assert.equal('error input',e.message);
    }
  });
});

