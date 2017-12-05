var express = require('express');
var router = express.Router();
var usr = require('../../databaseCon');

router.route('/write')
    .get(function (req, res) {
        if (req.session.islogin) {
            res.locals.islogin = req.session.islogin;
        }
        if (req.cookies.islogin) {
            req.session.islogin = req.cookies.islogin;
        }
        res.render('mail/write', { title: '写邮件' });
    });

router.route('/')
    .get(function (req, res) {
        Mail = usr.Mail();
        var mail = new Mail();
        mail.readMail(function (err, result) {
            if (err) {
                res.status(404).end(err);
            } else {
                res.render('mail/read', {
                    title: '读邮件',
                    items: result
                });
            }
        });
    });
router.route('/:id')
    .get(function (req, res) {
        //process
        res.render('mail/info',{
            title:'邮件信息'
        });
    });

module.exports = router;