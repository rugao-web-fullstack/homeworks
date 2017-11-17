function User(event) {
    this.event = event;
    console.log("User: constructor");
}

User.prototype.register = function (username, password, email) {
    console.log("User: register");
    this.username = username;
    this.password = password;
    this.email = email;
};
exports.User = User;