var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var app = express();
var base = require('./connectServer');
nunjucks.configure('public', {
  autoescape: true,
  express: app
});
app.get("/",function(req,res){
	res.render("homepage.html");
});
app.get("/user/register",function(req,res){
	res.render("register.html");
});
app.get("/user/login",function(req,res){
	res.render("login.html");
});
app.get("/writeemail",function(req,res){
	res.render("writeemail.html");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/home",function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	base(function(con){
		var sql = "select * from user where username = '"+username+"';";
		con.query(sql, function (err,result){
			if(err) throw err;
			if(result == ""){
				console.log("username is not existed!");			
			}else{
				res.render("emailpage.html");			
			}
		});
	},'emaildb');
});
app.post("/user/login",function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	base(function(con){
		var sql = "select * from user where username = '"+username+"';";
		con.query(sql, function (err,result){
			if(err) throw err;
			if(result == ""){
				base(function(con){
					var sql1 = "insert into user(username,password) values('"+username+"','"+password+"');";
					con.query(sql1, function (err1,result1){
						if(err1) throw err;
						console.log(username+" inserted successfully");
					});
				},'emaildb');
				res.render("login.html");
			}else{
				console.log("data is existed");	
			}
		});
	},'emaildb');
});
app.post("/mail/write",function(req,res){
	var title = req.body.title;
	var content = req.body.content.replace(/[\'\"\\\/\b\f\n\r\t]/g, ''); 
	var receiver = req.body.receiveraddr;
	base(function(con){
		var sql = "select * from user where username = '"+receiver+"';";
		con.query(sql, function (err,result){
			if(err1) throw err;
			if(result==""){
				console.log("receiver is not existed");
				return;
			}
		});
	},'emaildb');
	
});
app.listen(8080);
