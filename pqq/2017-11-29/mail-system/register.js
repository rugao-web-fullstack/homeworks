var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var base = require('./base');

var mid_reg = require('./mid/reg');
var mid_log = require('./mid/log');


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('./html'));
app.get('/reg', function (reg, res) {
    // res.render('register');
    res.send('111');
});
app.get('/log', function (reg, res) {
    // res.render('register');
    res.send('222');
});



app.post('/reg', mid_reg);

app.post('/log',mid_log);

app.listen(3000);