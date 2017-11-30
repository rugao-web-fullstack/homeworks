var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(3333);
//访问 http://localhost:3333/black2.png
