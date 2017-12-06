var express = require('express');
var app = express();
var debug = require('debug');
var mid1 = require('./mid1');
var mid2 = require('./mid2');

app.use(mid1);

app.use(mid2);

// app.all('/', index)
// app.get('/hello', hello);
app.get(['/users/:id/:action', '/users/:id'], function (req, res) {
  res.write('inside  users\n');
  debug(req.params);
  res.write('\n');
  res.write(req.mid + '\n');
  res.end();
});

app.listen(3000);