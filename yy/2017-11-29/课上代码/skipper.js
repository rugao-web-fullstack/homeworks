//var fs = require("fs");
var express = require('express');
var skipper = require('skipper');
var nunjucks = require('nunjucks');

var app = express();
app.use(skipper());

nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

// 单图上传
app.post('/', function (req, res) {
  req.file('avatar').upload(function (err, uploadedFiles) {
    if (err) return res.send(500, err);
    return res.json({
      message: uploadedFiles.length + ' file(s) uploaded successfully!',
      files: uploadedFiles
    });
  });
});

app.get('/', function (req, res) {
  res.render('file.html');
});

app.listen(3000);