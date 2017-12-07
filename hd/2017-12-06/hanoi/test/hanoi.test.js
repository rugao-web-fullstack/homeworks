var assert = require('assert');
var hanoi = require('../src/hanoi.js');

describe('project',function(){
  it('test hanoi',function(){
    assert.deepEqual([[1,'1','3']],hanoi(1));
    assert.deepEqual([[1,'1','2'],[2,'1','3'],[3,'2','3']],hanoi(2));
    assert.deepEqual([[1,'1','3'],[2,'1','2'],[3,'3','2'],[4,'1','3'],[5,'2','1'],[6,'2','3'],[7,'1','3']],hanoi(3));
  });

  it('test hanoi error',function(){
    try{
      hanoi(-1);
    }catch(e){
      assert.equal('Error Input',e.message);
    }
  });

});