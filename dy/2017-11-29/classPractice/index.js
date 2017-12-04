module.exports = function (req, res) {
  res.write(req.info + '\n');
  res.end('Hello World!\n');
};