module.exports = function (req, res, next) {
    var debug = require('debug')('ago');
    debug('log: inside middle ware');
    req.mid = req.info + '-mid';
    next();
};
