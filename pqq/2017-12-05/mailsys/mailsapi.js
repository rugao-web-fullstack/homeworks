var router = require('express').Router();
var Mail = require('./api/mails').Mail;

function handler(req, res) {
  // console.log('inside handler');
}

function defaultHandler(req, res) {
  // console.log('inside default handler');
}

var mailGet = function (req, res) {
  // process
  // console.log('mail get');
  // console.log(req.params);
  // console.log(req.params.id);
  // var id = req.params.id;
};

router.get(['/mails'], mailGet);

router.post(['/mails'], function (req, res) {
  // process
  var body = req.body;
  var action = body && body.action;
  var user = new Mail();

  var actions = {
    send: send,
    update: update
  };

  var handler = mail[action];
  if (handler instanceof Function) {
    handler.call(mail, req, res);
  } else {
    defaultHandler.call(mail, req, res);
  }
});
exports.mailsapi = router;
