var express = require('express')
var app = express()
app.use('/', function(req, res) {
	console.log(req.query);
});
app.listen(3000)
