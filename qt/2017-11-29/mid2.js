var debug = require('debug')('log');
module.exports = function(req, res, next) {
  debug('log:' + 'inside middle ware');
  req.info = req.mid + 'top';
  next();
};