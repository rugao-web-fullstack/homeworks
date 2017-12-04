var express = require('express');
var app = express();
var index = require('./index');
var hello = require('./hello');
var mid1 = require('./mid1');
var mid2 = require('./mid2');

app.use(mid1);
app.use(mid2);
app.get('/', index);
app.get('/hello', hello);
app.listen(3000);