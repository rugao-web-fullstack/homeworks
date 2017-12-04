module.exports = function(req,res,next){
  req.info = req.mid+'top';
  next();
};