var express = require('express');
var index = require("./index");
var hello = require("./hello");
var user = require("./user");
var top = require("./top");
var mid = require("./mid");
var app = express();

app.use(top);
app.use(mid);
app.get('/', index);
app.get('/hello', hello);
app.get('/users/:id', function (req, res) {
	res.write('inside  users\n');  
	console.log(req.params);
	res.write("\n");
	res.write(req.mid + "\n");
	res.end();
});
app.listen(3000);
