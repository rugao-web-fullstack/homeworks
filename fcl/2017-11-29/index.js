module.exports = function(req,res,next){
    console.log("inside middle we");
    req.info = req.mid + "top";
    //只有调用了next函数，才能进入到下面的函数
    next();
}