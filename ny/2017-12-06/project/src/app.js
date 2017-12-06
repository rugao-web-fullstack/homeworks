const express = require('express');
const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'test' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ name: 'test' });
});

exports.app = app;
