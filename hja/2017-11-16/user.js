function User(event) {
    this.event = event;
    console.log('这里从main传入了一个event')
}

User.prototype.register = function (username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.event.emit('register', this);
};
User.m = '123';
exports.User = User;

