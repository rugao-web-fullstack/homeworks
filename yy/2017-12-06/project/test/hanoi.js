var assert = require ('assert');
var hanoi=require('../src').hanoi;
describe('hanoi',function(){
  it('test hanoi',function(){
    //let num = process.argv[2] || 3;
    //var h1=[ [ 1, 'A', 'C' ] ];
    assert.deepEqual([ [ 1, 'A', 'C' ] ],hanoi(1, 'A', 'B', 'C'));
    assert.deepEqual([ [ 1, 'A', 'B' ], [ 2, 'A', 'C' ], [ 1, 'B', 'C' ] ],hanoi(2, 'A', 'B', 'C'));
    assert.deepEqual([ [ 1, 'A', 'C' ],[ 2, 'A', 'B' ],[ 1, 'C', 'B' ],[ 3, 'A', 'C' ],[ 1, 'B', 'A' ],[ 2, 'B', 'C' ],[ 1, 'A', 'C' ]],hanoi(3, 'A', 'B', 'C'));
  });
});
