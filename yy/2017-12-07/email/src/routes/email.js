var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with email');
//   // next();
// });

router.get('/write', function(req, res) {
  res.render('writeEmail',{
    title:'写邮件',
    senderAddress:req.session.sender
  });
  // next();
});
router.get('/send/success', function(req, res) {
  res.render('send-result',{
    title:'发送',
    message:'恭喜发送成功！'
  });
  // next();
});
router.get('/send/failure', function(req, res) {
  res.render('send-result',{
    title:'发送',
    message:'发送失败！收件地址不存在'
  });
  // next();
});
router.get('/read', function(req, res) {
  res.render('readEmail',{
    title:'读邮件'
  });
  // next();
});


module.exports = router;
