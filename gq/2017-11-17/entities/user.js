let users = { };

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket,
    username, password) {
    if (users[username]) {
        return false;
    }
    users[username] = {
        socket: socket,
        user: new User(username,
            password)
    };
    return true;
};

User.login = function (socket,
    username, password) {
    console.log("user manager login");
    if (!users[username]) {
        return false;
    }
    let user = users[username].user;
    return user.password === password;
};

User.isAddress = function (address) {
    for (var k in users) {
        if (users[k].user.email === address) {
            return true;
        }
    }
    return false;
}

User.getSocket = function (address) {
    for (var k in users) {
        if (users[k].user.email === address) {
            return users[k].socket
        }
    }
    return null;
}

User.getUserBySocket = function (socket) {
    for (var k in users) {
        if (users[k].socket === socket) {
            return users[k].user
        }
    }
    return null;
}

exports.User = User;