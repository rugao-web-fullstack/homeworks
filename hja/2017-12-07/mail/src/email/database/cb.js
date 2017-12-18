var debug = require('debug')('dmail');

exports.cb = function (next, cb) {
  return function (err, data) {
    if (err) {
      cb(true);
      debug('log: ' + err);
      return;
    }
    next(data);
  };
}; 