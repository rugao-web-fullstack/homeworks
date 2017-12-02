var express = require("express");

var app = express();

app.use("/",function(req,res,next){
    console.log("inside middle we");
    req.info = req.mid + "top";
    //只有调用了next函数，才能进入到下面的函数
    next();
});

app.use("/",function(req,res,next){
    console.log("inside middle we");
    req.mid = req.info + "mid";
    //只有调用了next函数，才能进入到下面的函数
    next();
});

app.get("/",function(req,res){
    res.write(req.info + "\n");
    res.write(req.mid + "\n");
    res.end("hello world");
});

app.get("/sb",function(req,res){
    res.end("hello sb");
});
app.listen(3000);