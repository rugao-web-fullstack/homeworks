module.exports = function (req, res, next) {
    req.info = req.mid + 'mid2 top';
    next();
}