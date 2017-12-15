var debug = require('debug')('mail');

exports.cb = function(next) {
  debug('log:' + '******');
  return function(err, data) {
    if (err) {
      debug('log:' + err + 'XXXXXXXX---------------');        
      debug('log: ' + err);
      return;
    }
    next(data);
  };
};