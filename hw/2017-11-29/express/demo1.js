var express = require('express');
var mid1 = require("./mid1");
var mid2 = require("./mid2");
var hello = require("./hello");
var world = require("./world");
var user = require("./user");
var app = express();
app.use(mid1);
app.use(info);
// app.get('/', hello);
// app.get("/hello", world);
app.get("/users/:id",function(req,res){
    res.write("inside\n");
    console.log(req.params);
    res.write("\n");
    res.write(req.mid+"\n");
    res.end();
})
app.listen(3000);
