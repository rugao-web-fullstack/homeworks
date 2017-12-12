exports.cbMannage = function (next, cb) {
  return function (err, result) {
    if (err) {
      cb(true);
      return;
    } else {
      next(result);
    }
  };
};

exports.cbRouters = function (next, res) {
  return function (err, data) {
    if (err) {
      res.json('0');
      return;
    } else {
      next(data);
    }
  };
};
