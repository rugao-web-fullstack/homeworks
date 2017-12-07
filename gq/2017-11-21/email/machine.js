let states = require('./states').states;

function Machine() {
  this.state = states.USER_NOT_LOGIN;
  this.action = '';
}
Machine.prototype.process = function (socket,
  data) {
  //let input = this.getCleanedString(data);
  switch (this.state) {
  case states.MAIL_WRITE:
    socket.emit(states.MAIL_WRITE,
      this, socket, data);
    break;
  case states.MAIL_READ:
    socket.emit(states.MAIL_READ,
      this, socket, data);
    break;
  case states.USER_LOGIN:
    socket.emit(states.USER_LOGIN,
      this, socket, data);
    break;
  case states.USER_NOT_LOGIN:
  default:
    socket.emit(states.USER_NOT_LOGIN,
      this, socket, data);
  }
};

Machine.prototype.getCleanedString = function (socket,
  data) {
  let input = String(data);
  input = input.replace(/(\n|\r)+$/, '');
  return input;
};

exports.Machine = Machine;