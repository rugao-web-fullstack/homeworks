module.exports = function (req, res) {
  if (req.body) {
    res.write(req.body);
  }
  res.write(req.info + '\n');
  res.write(req.mid + '\n');
  res.end('Hello World! 1\n');
};