var debug = require('debug')('gq');
const Storage = require('./storage').Storage;
const filename = '../data/user.json';
const path = require('path');
const storage = new Storage(path.resolve(path.dirname(__filename), filename));

let sockets = [];
//数据的初始化
function User(username, password) {
	this.username = username;
	this.email = username;
	this.password = password;
}
//注册利用回调判断有没有已存在该用户
User.register = function (socket, username, password, callback) {
	storage.read(function (error, UsersInfo) {
		if (error) {
			callback(error);
			return;
		}
		if (UsersInfo[username]) {
			callback(true);
			return;
		}
		UsersInfo[username] = {
			user: new User(username, password)
		};
		storage.save(UsersInfo, function (error) {
			if (error) {
				callback(error);
			}
			callback(false);
		});
	});
};

//登录----当该用户名存在时才允许登录
User.login = function (socket, username, password, callback) {
	debug('user manager login');
	storage.read(function (error, UsersInfo) {
		if (error) {
			callback(error);
			return;
		}
		if (UsersInfo[username]) {
			debug('存在');
			let user = UsersInfo[username].user;
			if (user.username === username && user.password === password) {
				callback(false);
				sockets.push({
					socket: socket,
					nowUser: username
				});
				return;
			}
			else {
				callback(true);
			}
		}

	});
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address, callback) {
	debug('isAdress\n');
	storage.read(function (error, UserInfo) {
		if (error) {
			callback(error);
			return;
		}
		if (!UserInfo[address]) {
			callback(true);
			return;
		} else {
			callback(false);
			return;
		}
	});
};

/**
 * 根据地址获取用户socket
 * @param {*} address 
 */
User.getSocket = function (address) {
	for (var k in sockets) {
		if (sockets[k].nowUser === address) {
			return sockets[k].socket;
		}
	}
	return null;
};


/**
 * 根据socket获取用户
 * @param {*} address 
 */
User.getUserBySocket = function (socket, callback) {
	storage.read(function (error, UserInfo) {
		if (error) {
			callback(error);
			return;
		}
		for (var i in sockets) {
			if (sockets[i].socket === socket) {
				for (var k in UserInfo) {
					if (UserInfo[k].user.username === sockets[i].nowUser) {
						callback(false, UserInfo[k].user);
						return;
					}
				}
			}
		}
		callback(false, null);
		return;
	});
};

exports.User = User;