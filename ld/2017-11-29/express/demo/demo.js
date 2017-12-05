var express = require('express');
var app = express();
var mid1 = require('./mid1');
var mid2 = require('./mid2');
var debug = require('debug')('ago');
app.use(mid1);

app.use(mid2);

//app.get('/', index)
//app.get('/hello', hello);

app.get('users/:id', function (req, res) {
    res.write('inside');
    debug('log :'+req.params);
    res.write('\n');
    res.write(req.mid + '\n');
    res.end();
});

app.listen(3000);
