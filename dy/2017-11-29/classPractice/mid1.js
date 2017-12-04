module.exports = function (req, res, next) {
  req.mid = req.info + ' - mid1';
  next();
};