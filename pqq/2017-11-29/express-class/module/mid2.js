module.exports = function(req,res,next){
    console.log('在mid2中');
    req.mid = req.info+'-mid';
    next();
}