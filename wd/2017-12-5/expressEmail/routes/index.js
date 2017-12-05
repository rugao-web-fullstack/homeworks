var express = require('express');
var router = express.Router();
var base = require("./base");
/* GET home page. */
router.get("/", function (req, res) {
  res.render('index', { title: 'Express' });
  return;
});

router.get("/register", function (req, res) {
  res.render('register');
  console.log("register");
  return;
});

router.get("/login", function (req, res) {
  res.render("login");
  console.log("login");
  return;
});

router.get("/main", function (req, res) {
  res.render("main");
  console.log("main");
  return;
});

router.get("/write", function (req, res) {
  res.render("write");
  console.log("writeEmail");
});

router.get("/list", function (req, res) {
  res.render("list");
  console.log("EmailList");
});
//--------------------------------------------------------register
router.post('/register', function (req, res) {
  var name = req.body.username,
    email = req.body.email,
    password = req.body.password;
  return base(function (con) {
    var sql = "INSERT INTO user (username, password, email) VALUES ?;";
    var data = [[name, password, email]];
    con.query(sql, [data], function (err, result) {
      if (err) throw err;
      console.log("userdata inserted");
      res.send(200);
      return;
    });
  }, "mydb");
  // res.end();
});
//---------------------------------------------------------login
router.post('/login', function (req, res) {
  var name = req.body.username,
    password = req.body.password;
  return base(function (con) {
    var sql = "select * from user where username = '" + name + "';";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length === 0) {
        console.log("用户不存在");
        res.send("0");
        return;
      } else {
        for (var i = 0; i < result.length; i++) {
          if (result[i].password === password) {
            console.log("success");
            console.log("user " + name + " login in");
            res.send(result[i].email);
            return;
          }
        }
        console.log("password failed");
        res.send("0");
        return;
      }
    });
  }, "mydb");
});
//---------------------------------------------------------writeEmail
router.post("/write", function (req, res) {
  var receiver = req.body.receiver,
    title = req.body.title,
    content = req.body.cont,
    sender = req.body.sender;

  return base(function (con) {
    var sql = "INSERT INTO email (title, content, receiver, sender) VALUES ?;";
    var data = [[title, content, receiver, sender]];
    con.query(sql, [data], function (err, result) {
      if (err) throw err;
      console.log("emaildata inserted");
      res.send(200);
      return;
    });
  }, "mydb");
})
//---------------------------------------------------------List
router.post('/list', function (req, res) {
  var receiver = req.body.receiver;
  return base(function (con) {
    var sql = "select * from email where receiver = '" + receiver + "';";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length === 0) {
        console.log("no emaillist");
        res.send("0");
        return;
      } else {
        res.send(result);
        return;
      }
    });
  }, "mydb");
});
module.exports = router;
