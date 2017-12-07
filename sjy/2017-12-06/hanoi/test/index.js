var assert = require('assert');
var hannuota = require('../src/hannuota.js');
describe('project', function () {
  it('test hannuota', function () {
    assert.equal('from a to c', hannuota(1));
    assert.equal('from a to b,from a to c,from b to c', hannuota(2));
  });
  it('test hannuota exception', function () {
    try {
      hannuota(0);
    } catch (e) {
      assert.equal('Error Input', e.message);
    }
  });
});
