var router = require('express').Router();
var Mail = require('./api/mails').Mail;

function handler() {
  // console.log('inside handler');
}

function defaultHandler() {
  // console.log('inside default handler');
}

var mailGet = function () {
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
  var mail = new Mail();

  // var actions = {
  //   send: send,
  //   update: update
  // };

  var handlers = mail[action];
  if (handlers instanceof Function) {
    handler.call(mail, req, res);
  } else {
    defaultHandler.call(mail, req, res);
  }
});
exports.mailsapi = router;
