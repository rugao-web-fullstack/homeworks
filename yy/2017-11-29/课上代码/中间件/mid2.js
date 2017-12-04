module.exports = function(req,res,next){
	console.log("inside middle2 ware");
	req.info = req.mid+"top";
	next();
};