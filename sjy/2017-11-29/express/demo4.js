var debug = require('debug')('xxx');
var express = require('express');
var app = express();
var index = require('./index');
var hello = require('./hello');
var mid1 = require('./mid1');
var mid2 = require('./mid2');

app.use(mid1);

app.use(mid2);

app.all('/', index);
app.get('/hello', hello);
app.get('/users/:id', function (req, res) {
  res.write('inside  users\n');
  debug('log' + req.params);
  res.write('\n');
  res.write(req.mid + '\n');
  res.end();
});

app.listen(3000);