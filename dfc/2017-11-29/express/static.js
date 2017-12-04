var express = require('express');
var app = express();

app.use(express.static('123'));

app.use('/static', express.static('123'));

app.listen(3000);