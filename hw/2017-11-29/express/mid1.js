module.exports = function(req, res, next){
    console.log("inside middle ware");
    req.mid = req.info + "-mid";
    next();
}
