var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get(session({ secret: '12345' }));


/* GET home page. */
router.get('/write', function (req, res) {
  res.render('write', { title: "write" });
});
router.get('/read', function (req, res) {
  res.render('read', { title: "read" });
});

router.get('/readcontent/:id', function (req, res) {
  res.render('readcontent', { title: "readcontent" });
});
// router.get('/index', function (req, res) {
//   req.session.user = null;
//   res.redirect('/');
// });

module.exports = router;
