var assert = require('assert');
var han = require('../src/index');


describe('This is hannuo test', function(){
  it('true hannuo', function(){
    assert.equal('1,A,C', han.han1(1,'A','B','C'));
    assert.equal('1,A,B,2,A,C,1,B,C', han.han1(2,'A','B','C'));
    assert.equal('1,A,C,2,A,B,1,C,B,3,A,C,1,B,A,2,B,C,1,A,C', han.han1(3,'A','B','C'));
  });

});
