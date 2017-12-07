var express = require('express');
var router = express.Router();

router.route('/write')
    .get(function (req, res) {
        res.render('mail/write', { title: '写邮件' });
    });

router.route('/:id')
    .get(function (req, res) {
        //process
        res.render('mail/info', {
            title: '邮件信息'
        });
    });

module.exports = router;