module.exports = function(req, res, next) {
    var debug = require('debug')('log');
    debug('log' + 'inside middle ware');
    //console.log('inside middle ware');
    req.info = req.mid + 'top';
    next();
};
