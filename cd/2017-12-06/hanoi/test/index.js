var assert = require('assert'); 
var hanio = require('../src/index.js');
 
describe('hanio', function () {
  it('test hanio', function () {
    assert.equal('from a to c', hanio(1));
  });
  it('test hanio2', function () {
    assert.equal('from a to b,from a to c,from b to c', hanio(2));
  });
  it('test hanio exception', function () {
    try {
      hanio(0);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
});
