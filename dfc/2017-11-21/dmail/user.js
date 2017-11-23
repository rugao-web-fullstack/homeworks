const EventEmitter = require('events');
const emitter = new EventEmitter();
const Message = require('./message').Message;
const message = new Message(emitter);
const fs = require('fs');
const filename = "./data/fileUsers.json";
const path = require('path');
const Storage = require('./storage').Storage;
const storage = new Storage(path.resolve(path.dirname(__filename), filename));

function User(event, userlist) {
	this.event = event;
	this.userlist = userlist;
	console.log("user: constructor");
}
User.prototype.register = function (username, password, socket) {
	console.log("user: register");
	storage.read((error, users) => {
		if (error) {
			console.error(error.stack);
			return;
		}
		users.push({
			'username': username,
			'password': password
		});
		console.log(this.userlist.length + '---------------')
		if(this.userlist.length === 0){
			for (let i = 0; i < users.length; i++) {
				let userid = users[i].username;
				this.userlist.push({
					userid: ''
				});
			}
			this.userlist[username] = socket;
		}else{
			console.log(this.userlist.length + '--*--------')
			console.log(username + '--*--------')
			console.log(socket + '--*--------')
			this.userlist.push({
				username: ''
			});
			this.userlist[username] = socket;
			console.log(this.userlist.length + '----*---------')
			console.log(this.userlist[username])
		}
		storage.save(users, (error) => {
			if (error) {
				console.error(error.stack);
				return;
			}
			emitter.emit("user-register", socket, true);
			console.log(username + "用户注册成功");
		});
	});
};
User.prototype.login = function (username, password, socket) {
	console.log("user: login");
	storage.read((error, users) => {
		if (error) {
			console.error(error.stack);
			return;
		}
		var user = findUser(username);
		if (user) {
			if (user.password === password) {
				if (this.userlist.length === 0) {
					console.log('用户表还是空的');
					console.log(this.userlist);
					for (let i = 0; i < users.length; i++) {
						let userid = users[i].username;
						this.userlist.push({
							userid: ''
						});
					}
					this.userlist[username] = socket;
				} else {
					console.log('用户表有东西了');
					console.log(this.userlist);
					this.userlist[username] = socket;
				}
				emitter.emit("user-login", socket, true);
			} else {
				emitter.emit("user-login", socket, false);
				login_flag = false;
			}
		} else {
			socket.write('该账号不存在，请重新输入\n');
		}
		function findUser(username) {
			for (let i = 0; i < users.length; i++) {
				if (username === users[i].username) {
					return users[i];
				}
			}
			return false;
		}
	});
	// });
};
exports.User = User;
