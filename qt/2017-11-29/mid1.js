var debug = require('debug')('log');
module.exports = function (req, res, next) {
  debug('log:' + 'inside middle ware');
  req.mid = req.info + '-mid';
  next();
};