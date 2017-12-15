var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  res.send('api之/mails');
});

/*POST /mails
    action=send*/
router.post('/send', function(req, res) {
  res.send('api之/mails/send');
});

module.exports = router;
