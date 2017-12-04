let users = {

};
function User(username, password) {
  this.username = username;
  this.email = username;
  this.password = password;
}
User.register = function (socket, username, password) {
  if (users[username]) {
    return false;
  }
  users[username] = {
    socket: socket,
    user: new User(username, password)
  };
  return true;
};
User.login = function (socket, username, password) {
  if (!users[username]) {
    return false;
  }
  let user = users[username].user;
  return user.password === password;
};

// 判断当前地址是不是用户拥有
User.isAddress = function (address) {
  for (var k in users) {
    if (users[k].user.email === address) {
      return true;
    }
  }
  return false;
};

// 根据地址获取用户 socket
User.getSocket = function (address) {
  for (var k in users) {
    if (users[k].user.email === address) {
      return users[k].socket;
    }
  }
  return null;
};

// 根据 socket 获取用户
User.getUserBySocket = function (socket) {
  for (var k in users) {
    if (users[k].socket === socket) {
      return users[k].user;
    }
  }
  return null;
};

module.exports.User = User;