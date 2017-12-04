var express = require('express');
var index = require('./index');
var hello = require('./hello');
var user = require('./user');
var top = require('./top');
var mid = require('./mid');
var app = express();

app.use(top);
app.use(mid);
app.get('/', index);
app.get('/hello', hello);
app.get('/users/:id', user);
app.listen(3000);
