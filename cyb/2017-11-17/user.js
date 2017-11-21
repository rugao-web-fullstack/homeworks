function User(event) {
    this.event = event;
    console.log("user: constructor");
}

User.prototype.register = function (username, password, socket) {
    console.log("user: register");
    this.username = username;
    this.password = password;
    this.socket = socket;
};

exports.User = User;