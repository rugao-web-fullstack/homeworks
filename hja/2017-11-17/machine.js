var debug = require('debug')('ma');
let states = {
  USER_NOT_LOGIN: 'user-not-login'
};

function Machine() {

  this.state = states.USER_NOT_LOGIN;
  this.action = '';

}

Machine.prototype.process = function (socket, data) {
  let input = this.getCleanedString(data);
  debug(input);
  switch (this.state) {
  case states.USER_NOT_LOGIN:
  default:
    socket.emit(states.USER_NOT_LOGIN, this, socket, data);
  }
};

Machine.prototype.getCleanedString = function (data) {
  let input = String(data);
  input = input.replace(/\r\n/, '');
  return input;

};

exports.Machine = Machine;