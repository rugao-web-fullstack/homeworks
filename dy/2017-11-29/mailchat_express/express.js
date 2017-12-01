var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
    extened: true
}));

app.post('/register', function (req, res) {
    console.log(req.body);
    res.send("received your request!");
});
app.post('/get', function (req, res) {
    console.log(req.body);
    res.send("received your request!");
});

app.listen(3000);