var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

app.get('/',function (req,res) {
  //把name：sb存在cookie里面
  res.cookie('name','sb').send('cookie set');
  // 读取cookie
  // console.log("cookie: ",req.cookies);
  //删除cookie
  // res.clearCookie('name');
});
app.listen(3000);