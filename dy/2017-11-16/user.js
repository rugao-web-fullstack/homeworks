function User(ev) {
    this.ev = ev;
    console.log("USER");
}
User.prototype.register = function (username, password, email) {
    console.log("USER REGISTER");
    this.username = username;
    this.password = password;
    this.email = email;
};
exports.User = User;