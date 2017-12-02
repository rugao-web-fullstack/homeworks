var express = require("express");
var app = express();
var index = require("./index");
var index2 = require("./index2");
var index3 = require("./index3");
var sb = require("./sb");

app.use("/",index);

app.use("/",index2);

app.get("/",index3);

app.get("/sb",sb);

app.get("/users/:id",function (req,res) {
    console.log(req.params);
    res.write("hello :" + req.params.id);
    res.end();
});
app.listen(3000);