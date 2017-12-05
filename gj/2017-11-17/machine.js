var debug = require('debug')('log');

let states = {
  USER_NOT_LOGIN: 'user-not-login'
};

function Machine() {

  this.state = states.USER_NOT_LOGIN;
  this.action = '';

}

Machine.prototype.process = function (socket, data) {
  let input = this.getCleanedString(data);
  debug('log : ' + input);
  switch (this.state) {
  case states.USER_NOT_LOGIN:
  default:
    socket.emit(states.USER_NOT_LOGIN, this, socket, data);
  }
};

Machine.prototype.getCleanedString = function(data){
  let input = String(data); 
  debug('log'+'STRING转换');
  input = input.replace(/\r\n/, ''); 
  return input; 
};

exports.Machine = Machine;