var debug = require('debug')('xxx');
module.exports = function (req, res, next) {
  debug('log:' + '在mid1中');
  req.mid = req.mid + '-top';
  next();
};