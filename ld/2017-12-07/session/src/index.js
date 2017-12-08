var express = require('express');
var session = require('express-session');

var app = express();
app.use(session({secret:'sosososososso'}));

app.get('/',function(req,res){
    if(req.session.page){
        req.session.page++;
    }else{
        req.session.page = 1;
    }
    res.json(req.session.page);
});
//if(!module.parent){
//app.listen(8080);
//}
exports.app = app;
