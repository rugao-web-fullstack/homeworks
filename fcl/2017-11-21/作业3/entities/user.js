const Storage = require('./storage').Storage;
const FILENAME = '../data/user.json';
const path = require("path");
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));


let users = {};
let sockets = [];

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function(socket, username, password, cb) {
    console.log('register\n');
    storage.read(function(error, users) {
        if (error) {
            cb(error);
            return;
        }
        if (users[username]) {
            cb(true);
            return;
        }
        users[username] = new User(username, password);

        storage.save(users, function(error) {
            if (error) {
                cb(error);
            }
            cb(false);
        });
    });
};

User.login = function(socket, username, password, cb) {
    storage.read(function(error, users) {
        if (error) {
            cb(error);
            return;
        }
        if (!users[username]) {
            cb(true);
            return;
        }
        sockets.push({
            socket: socket,
            username: username
        });
        if (users[username].password === password) {
            cb(false);

            return;
        } else {
            cb(true);
        }
    })
};


User.isAddress = function(address, cb) {
    console.log('isAdress\n');
    storage.read(function(error, users) {
        if (error) {
            cb(error);
            return;
        }
        for (var k in users) {
            if (!users[address]) {
                cb(true);
                return;
            } else {
                cb(false);
                return;
            }
        }
    });
};


User.getSocket = function(address) {
    for (var k in sockets) {
        if (sockets[k].username === address) {
            return sockets[k].socket;
        }
    }
    return null;
};


User.getUserBySocket = function(socket, cb) {
    storage.read(function(error, users) {
        if (error) {
            cb(error);
            return;
        }
        for (key in sockets) {
            if (sockets[key].socket === socket) {
                for (k in users) {
                    if (users[k].username === sockets[key].username) {
                        cb(false, users[k]);
                        return;
                    }
                }
            }
        }
    })
};

exports.User = User;