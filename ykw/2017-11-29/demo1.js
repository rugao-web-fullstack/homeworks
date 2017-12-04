var express = require('express');
var app = express();
//var index = require('./index');
//var hello = require('./hello');
var mid1 = require('./mid1');
var mid2 = require('./mid2');

app.use(mid1);

app.use(mid2);

var debug = require('debug')('log');
// app.get('/', index)
// app.get('/hello', hello);
app.get('/user/:id', function (req, res) {
    res.write('inside usera\n');
    debug('log' + req.params);
    //console.log(req.params);
    res.write('\n');
    res.write(req.mid + '\n');
    res.end();
});

app.listen(3000);
