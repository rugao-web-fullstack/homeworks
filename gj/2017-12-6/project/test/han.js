var assert = require('assert');
var start = require('../src/han');
describe('han test', function() {
  it('test fib 1', function() {
    assert.equal('1,A,C', start.han(1,'A','B','C'));
    assert.equal('1,A,B,2,A,C,1,B,C', start.han(2,'A','B','C'));
    assert.equal('1,A,C,2,A,B,1,C,B,3,A,C,1,B,A,2,B,C,1,A,C', start.han(3,'A','B','C'));


  });

	
});
