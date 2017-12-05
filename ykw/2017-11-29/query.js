var express = require('express');
var app = express();
app.use('/', function(req, res) {
    var debug = require('debug')('log');
    debug('log' + req.query);
    debug('log' + res);
    //console.log(req.query);
});
app.listen(3000);
