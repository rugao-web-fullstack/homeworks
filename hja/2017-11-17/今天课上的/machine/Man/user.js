users = {};

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.prototype.login = function (username, password) {
    return (this.username === username) && (this.password === password);
};

User.register = function (socket, username, password) {
    if (users[username]) {
        return false;
    }
    users[username] = {
        socket: socket,
        user: new User(username, password)
    };
    // console.log(users);
    return true;
};

User.login = function (socket, username, password) {
    for (var k in users) {
        if (users[k].user.login(username, password)) {
            if (users[k].socket !== socket) {
                try {
                    users[k].socket.end();
                } catch (e) {
                    console.log(e);
                }
            }
            users[k].socket = socket;
            return true;
        }
    }
    return false;
};

User.getByEmail = function (email) {
    for (var k in users) {
        if (users[k].user.email === email) {
            return users[k];
        }
    }
    return null;
}

User.getBySocket = function (socket) {
    for (var k in users) {
        if (users[k].socket === socket) {
            return users[k];
        }
    }

    return null;
}
exports.User = User;