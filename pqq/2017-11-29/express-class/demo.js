var express = require('express');
var app = express();
var hi = require('./module/hi');
var hello = require('./module/hello');
var mid1 = require('./module/mid1');
var mid2 = require('./module/mid2');

app.use(mid1);
app.use(mid2);

app.get('/hi',hi);
app.get('/hello',hello);

app.listen(3333);
