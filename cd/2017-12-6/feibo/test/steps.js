var debug = require('debug')('xxx');
describe('hooks', function() {
    
  before(function() {
    debug('log:' +'before');
    // runs before all tests in this block
  });
    
  after(function() {
    debug('log:' +'after');
    // runs after all tests in this block
  });
    
  beforeEach(function() {
    debug('log:' +'before each');
    // runs before each test in this block
  });
    
  afterEach(function() {
    debug('log:' +'after each');
    // runs after each test in this block
  });
    
  // test cases
  it('should ok1', function() {
    debug('log:' +'inside ok1');
  });
  it('should ok2', function() {
    debug('log:' +'inside ok2');
  });
  it('should ok3', function() {
    debug('log:' +'inside ok3');
  });
});
