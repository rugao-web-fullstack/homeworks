module.exports = function(req,res,next){
    console.log('在mid1中');
    req.mid = req.mid+'-top';
    next();
}