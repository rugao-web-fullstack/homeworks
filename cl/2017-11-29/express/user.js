var debug = require('debug')('xxx');
module.exports = function (req, res) {
  res.write('inside  users\n');
  debug('info'+req.params);
  res.write('\n');
  res.write(req.mid + '\n');
  res.end();
};