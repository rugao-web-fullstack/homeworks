var router = require('express').Router();
var User = require('./api/users').User;

function handler() {
  // console.log('inside handler');
}

function defaultHandler() {
  // console.log('inside default handler');
}

var userGet = function () {
  // process
  // console.log('user get');
  // console.log(req.params);
  // console.log(req.params.id);
  // var id = req.params.id;
};

router.get(['/users'], userGet);

router.post(['/users'], function (req, res) {
  // process
  var body = req.body;
  // console.log(body);
  // console.log(req.query);
  var action = body && body.action;
  var user = new User();

  // var action = {
  //   register: register,
  //   login: login,
  //   logout: logout
  // };
  
  var handlers = user[action];
  if (handlers instanceof Function) {
    handler.call(user, req, res);
  } else {
    defaultHandler.call(user, req, res);
  }
});
exports.usersapi = router;
