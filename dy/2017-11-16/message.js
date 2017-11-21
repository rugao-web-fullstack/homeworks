function Message(ev, sockets) {
    this.ev = ev;
    this.sockets = sockets;
    console.log("MESSAGE");
    let self = this;
    this.ev.on('user-register', function (socket, user) {
        console.log("message: on user-register");
        self.onUserRegister(socket, user);
    });
}
Message.prototype.onUserRegister = function (socket, user) {
    for (var i = 0; i < this.sockets.length; i++) {
        let s = this.sockets[i];
        if (s != socket) {
            s.write("user <" + user.username + "> registed!");
            console.log("user <" + user.username + "> registed!");
        } else {
            s.write("You've registed successfully!");
        }
    }
};
exports.Message = Message;