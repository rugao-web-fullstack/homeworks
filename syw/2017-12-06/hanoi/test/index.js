var assert = require('assert');


var han = require('../src/').han;
var debug = require('debug')('xxx');

describe('project', function () {
  it('test hanoi', function () {
    assert.equal('from a to c', han(1));
  });
  it('test hanoi2', function () {
    assert.equal('from a to b,from a to c,from b to c', han(2));
  });
  it('test hanoi exception', function () {
    try {
      han(0);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
});






