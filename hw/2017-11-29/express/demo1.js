var debug = require('debug')('xxx');
var express = require('express');
var mid1 = require('./mid1');
var mid2 = require('./mid2');
var hello = require('./hello');
var world = require('./world');
var user = require('./user');
var app = express();
debug('log:' + mid2);
debug('log:' + hello);
debug('log:' + world);
debug('log:' + user);

var info;
app.use(mid1);
app.use(info);

// app.get('/', hello);
// app.get("/hello", world);
app.get('/users/:id', function (req, res) {
  res.write('inside\n');
  debug('log:' + req.params);
  res.write('\n');
  res.write(req.mid + '\n');
  res.end();
});
app.listen(3000);
