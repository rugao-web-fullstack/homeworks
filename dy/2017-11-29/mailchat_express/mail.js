var express = require('express');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var mysql = require('mysql');
var debug = require('debug')('log');
var app = express();
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});
app.use(bodyParser.urlencoded({
    extened: true
}));
app.use('/public', express.static(__dirname + '/public'));

app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
});
con.connect(function(err) {
    if (err) throw err;
    debug('log' + 'connected!');
    app.listen(3000);
});
