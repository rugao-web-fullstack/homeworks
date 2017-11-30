module.exports = function(req, res, next){
	console.log("inside middle ware");
	req.info = req.info1 + " top";
	next();
}
