module.exports = function (req, res) {
  res.write(req.body);
  res.write(req.info + '\n');
  res.write(req.info1 + '\n');
  res.end('inside hello\n');
};
