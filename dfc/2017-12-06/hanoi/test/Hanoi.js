var hanoi = require('../src/Hanoi');
var assert = require('assert');
describe('project', function () {
  it('Hanoi test 1', function () {
    assert.equal('a->b;', hanoi(1));
  });
  it('Hanoi test >1', function () {
    assert.equal('a->c;a->b;c->b;', hanoi(2));
    assert.equal('a->b;a->c;b->c;a->b;c->a;c->b;a->b;', hanoi(3));
  });
  it('Hanoi test <1', function () {
    try {
      hanoi(-1);
    } catch (e) {
      e;
    }
  });
});
