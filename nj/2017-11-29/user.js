var debug = require('debug')('xxx');
module.exports = function (req, res) {
  res.write('inside  users\n');
  debug(req.params);
  res.write('\n');
  res.write(req.mid + '\n');
  res.end();
};
