var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('xxx');
var base = require('./base');

var app = express();
// var mid_reg = require('./mid/reg');
// var mid_log = require('./mid/log');
// var sendmail = require('./mid/sendmail');




app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('./public'));
// app.get('/reg', function (req, res) {

//   res.send('111');
// });
// app.get('/log', function (req, res) {
//   // res.render('register');
//   res.send('222');
// });

/* 浏览器输入地址（如127.0.0.1:3000/ajax）后，显示views/ajax页面，此页面使用默认引擎（这里是jade）渲染 */
app.get('/mail.html'
// , function (req) {
//   // console.log('111');
  
// }
);


// app.post('/reg', mid_reg);

// app.post('/log', mid_log);

app.post('/sendmail', function (req, res) {

  //获取到四个数据 进行数据库交互
  var title = req.body.title;
  var content = req.body.content;
  var receiver = req.body.receiver;
  var sender = 'pqq';

  base(function (con) {
    // console.log(receiver);
    var sql1 = 'select * from users  where username = \'' + receiver + '\'';
    con.query(sql1, function (err, result) {
      if (err) {
        // console.log('失败查询用户');
        debug('chaxun shibai');
        res.json(['fail']);
        throw err;
      }
      if (result.length == 1) {
        // console.log('查询成功');
        debug('chaxun ok');
        base(function (con) {
          var sql2 = 'insert into sender_receiver (sendername, receivername,title,content) VALUES(\'' + sender + '\', \'' + receiver + '\', \'' + title + '\', \'' + content + '\');';
          con.query(sql2, function (err, result) {
            if (err) {
              // console.log('失败失败');
              debug('fail');
              res.json(['fail']);
            }
            debug('--------------------------'+result);
            // console.log();

            res.json(['success']);

          });
        }, 'mailsys');
      }
    });
  }, 'mailsys');

  // res.json(['success', '222']);

});

app.listen(3000);