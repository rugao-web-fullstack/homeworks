module.exports = function (req, res) {
	if (req.body) {
		res.write(req.body);        
	}
	res.write(req.info + "\n");
	res.write(req.info1 + "\n");
	res.end('Hello World\n');
}
