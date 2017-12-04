var exprese = require('express');
var app = exprese();

app.use(function (req,res,next) {
	req.data = 'mid';
	next();
});
app.get('/',function (req,res) {
	res.send('Hello world\n');
}).listen(3000);