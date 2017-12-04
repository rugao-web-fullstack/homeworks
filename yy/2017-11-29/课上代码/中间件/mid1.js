module.exports = function(req,res,next){
  req.mid = req.info+'-mid';
  next();
};