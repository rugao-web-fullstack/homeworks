var debug = require('debug')('mid');
module.exports = function(req, res, next){
  debug('log' + 'inside middle ware');
  req.info1 = req.info + ' mid';
  next();
};
