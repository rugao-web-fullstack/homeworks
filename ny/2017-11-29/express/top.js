var debug = require('debug')('user');
module.exports = function(req, res, next){
  debug('log' + 'inside middle ware');
  req.info = req.info1 + ' top';
  next();
};
