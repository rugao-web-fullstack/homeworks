var debug = require('debug')('gq');
module.exports = function (req, res, next) {
	debug('inside middle ware');
	req.mid = req.info + '-mid';
	next();
};