var debug = require('debug')('log');
module.exports = function (req, res) {
  res.write('inside  users\n');
  // console.log(req.params);
  debug('log : ' + req.params);
  res.write('\n');
  res.write(req.mid + '\n');
  res.end();
};