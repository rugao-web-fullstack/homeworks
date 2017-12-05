var express = require('express');
var router = express.Router();
var usr = require('../../databaseCon');

router.route('/write')
    .post(function (req, res) {
        client = usr.connect();
        usr.writeFun(client, req.body.receiver, req.session.islogin, req.body.title, req.body.content, function (err) {
            if (err) throw err;
            //res.send('发送成功');
            res.redirect('/home');
        });
    });

router.route('/')
    .post(function (req, res) {
    /* Mail = usr.Mail();
    var mail = new Mail();
    mail.readMail(function (err, result) {
      if (err) {
        res.status(404).end(err);
      } else {
        res.render('readMail', {
          title: '读邮件',
          items: result
        });
      }
    }) */
    });

router.route('/:id')
    .post(function (req, res) {
    /* process */
    });

module.exports = router;