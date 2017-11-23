users = {
};

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.prototype.login = function (username, password) {
    return (this.username === username) && (this.password === password)
}

User.getBySocket = function (socket) {
    for (var k in users) {
        if (users[k].socket === socket) {
            return users[k];
        }
    }
    return null;
};

User.removeSocket = function (socket) {
    for (var k in users) {
        if (users[k].socket === socket) {
            users[k].socket = null;
            return true;
        }
    }
    return null;
};

User.getByEmail = function (email) {
    console.log("get by email");
    console.log(email);
    console.log(users);
    for (var k in users) {
        console.log(k, users[k].user.email);
        if (users[k].user.email === email) {
            return users[k];
        }
    }
    return null;
};

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

User.init = function (socket) {
    socket.on("logout", User.logout);
};

User.logout = function (socket) {
    for (var k in users) {
        if (users[k].socket === socket) {
            users[k].socket = null;
            break;
        }
    }
};

User.isLogin = function (socket, username, password) {
    for (var k in users) {
        if (users[k].socket === socket) {
            return true;
        }
    }
    return false;
};

User.login = function (socket, username, password) {
    for (var k in users) {
        if (users[k].user.login(username, password)) {
            if (users[k].socket !== socket) {
                try {
                    users[k].socket.close();
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


exports.User = User;