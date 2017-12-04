var debug = require('debug')('mid1');
module.exports = function (req, res, next) {
  debug('inside middle ware');
  req.mid = req.info + '-mid';
  next();
};
