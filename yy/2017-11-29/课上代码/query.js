var express = require("express");
var app = express();
var debug = require("debug")("xxx");
app.use("/", function(req, res) {
	debug("log:" + req.query);
});
app.listen(3000);