var debug = require('debug')('mid2');
module.exports = function(req, res, next) {
  debug('log'+'inside middle ware');
  req.info = req.mid + 'top';
  next();
};