var express = require('express');
var skipper = require('skipper');
var nunjucks = require('nunjucks');

var app = express();
app.use(skipper());

nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

// upload
app.post('/', function (req, res) {
  req.file('avatar').upload(function (err, uploadFiles) {
    if (err) return res.send(500, err);
    return res.json ({
      message: uploadFiles.length + 'file upload successfully!',
      files: uploadFiles
    });
  });
});

app.get('/', function (req) {
  req.render('file.html');
});
app.listen(3000);