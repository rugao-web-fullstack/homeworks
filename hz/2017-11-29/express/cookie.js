var express=require("express");
var cookieParser=require("cookie-parser");
var app=express();
app.use(cookieParser());
app.get("/",function(req,res) {
    res.cookie("name","express").send("cookie set");
})
app.listen(3000);