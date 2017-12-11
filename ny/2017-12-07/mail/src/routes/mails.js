var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('list', {title: 'list'});
});
router.get('/write', function (req, res) {
  res.render('write', {title: 'write'});
});

router.get('/:id', function(req, res) {
  if(!isNaN(req.params.id)) {
    res.render('read', {title: 'read'});
  }else{
    res.send('404');
  }
});



module.exports = router;
