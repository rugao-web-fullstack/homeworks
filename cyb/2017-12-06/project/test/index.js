var assert = require('assert');
var hello = require('../src/').hello;

describe('project', function() {
  it('has hello', function() {
    //console.log(hello);
    assert.equal('Hello World', hello);
  });
});

exports.hello = 'Hello World';
