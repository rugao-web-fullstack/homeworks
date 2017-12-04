module.exports = function (req, res) {
  res.write(req.data + '\n');
  res.end('Hello World!\n');
};