var express = require('express');
var router = express.Router();
var Email=require ('../operations/emailsTest').Email;
var email=new Email();
//var fs=require('fs');
var cb=require('../operations/cb').cb;
router.post('/write', function(req, res) {
  email.write(req,res);
  // next();
});
router.get('/read', function(req, res) {
  email.read(req,res,cb((emails)=>{
    // if(err){
    //     console.log(err);
    //     return;
    // }

    // console.log('邮件列表');
    // console.log(emails);
    // console.log(__dirname);
    // fs.writeFile(__dirname+'/json/emails.json', JSON.stringify(emails),function(err){  
    //     if(err) throw err;  
    //     console.log('write JSON ');  
    // });  
    res.render('readEmail',{
      title:'收件箱',
      id:emails[0][0].id,
      sender:emails[0][0].senderAddress,
      emailTitle:emails[0][0].title,
      content:emails[0][0].content
    });
  }));
  
   
  // next();
});

module.exports = router;
