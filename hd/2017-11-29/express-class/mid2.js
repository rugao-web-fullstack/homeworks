var debug = require('debug');
module.exports = function(req, res, next) {
  debug('inside middle ware');
  req.info = req.mid + 'top';
  next();
};