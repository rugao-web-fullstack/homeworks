var assert = require('assert');
var hanoi = require('../src/hanoi').hanoi;
describe('test hanoi', function () {
    it('test normal', function () {
        assert.equal('1,A,C', hanoi(1, 'A', 'B', 'C'));
        assert.equal('1,A,B,2,A,C,1,B,C', hanoi(2, 'A', 'B', 'C'));
    //assert.equal('1,A->C;2,A->B;1,C->B;3,A->C;1,B,A;2,B,C;1,A,C;', hanoi(3, 'A', 'B', 'C'));
    });
    it('test hanoi exception', function () {
        try {
            hanoi(-100);
        } catch (e) {
            e;
        }
    });
});
