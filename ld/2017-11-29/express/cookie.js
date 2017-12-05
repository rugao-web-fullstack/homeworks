var express = require('express');
var cp = require('cookie-parser');
var app = express();

app.use(cp());

app.get('/', function(req, res) {
    res.cookie('name', 'express').send('cookie has been written');
});

app.listen(8080);
