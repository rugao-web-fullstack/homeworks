var debug = require('debug')('xxx');
module.exports = function(req, res, next){
  debug('log:'+'inside middle ware');
  req.mid = req.info + '-mid';
  next();
};