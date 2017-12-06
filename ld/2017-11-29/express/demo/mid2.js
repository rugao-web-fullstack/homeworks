module.exports = function(req, res, next) {
    var debug = require('debug')('ago');
    debug('log: inside middle ware');
    req.info = req.mid + 'top';
    next();
};
