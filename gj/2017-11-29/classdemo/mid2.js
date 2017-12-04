var debug = require('debug')('log');
module.exports = function (req, res, next) {
  // console.log('inside middle ware');
  debug('log : ' + 'inside middle ware');
  req.info = req.mid + 'top';
  next();
};