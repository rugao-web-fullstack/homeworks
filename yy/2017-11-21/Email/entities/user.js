const Storage = require("./storage").Storage;
const path = require("path");
const FILENAME = "../data/user.json";
// 使用__dirname变量获取当前模块文件所在目录的完整绝对路径
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));

let sockets = {

};

function User(username, password) {
	this.username = username;
	this.email = username;
	this.password = password;
}

User.register = function (socket, username, password, cb) {
	console.log("inside send");
	storage.read((error, users) => {
		if (error) {
			console.log(error.stack);
			cb(error);
			return;
		}
		// 如果user.json文件中还没有users
		if (!users) {
			console.log("新创建users");
			users = {};
		}
		// 已经存在该用户
		if (users[username]) {
			socket.write("用户名已存在！请不要重复注册！");
			cb(true);
			return;
		}

		let user = new User(username, password);
		users[username] = {
			user: user
		};

		storage.save(users, (error) => {
			if (error) {
				cb(error);
				return;
			}
			cb(false);
		});

	});
};

User.login = function (socket, username, password, cb) {
	sockets[username] = {
		s: socket
	};
	console.log("user manager login");
	storage.read((error, users) => {
		if (error) {
			cb(error);
			return;
		}
		if (!users[username]) {
			socket.write("抱歉，您输入的用户名不存在！");
			cb(true);
			return;
		}
		let user = users[username].user;
		return cb(false, user.password);
	});
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address
 */
User.isAddress = function (address, cb) {
	storage.read((error, users) => {
		if (error) {
			cb(error);
			return;
		}
		for (var k in users) {
			if (users[k].user.email === address) {
				cb(false);
				return;
			}
		}
		cb(true);
	});
};
/**
 * 根据socket获取用户
 * @param {*} address
 */
User.getUserBySocket = function (socket, cb) {
	let Soc;
	for (var k in sockets) {
		if (sockets[k].s === socket) {
			Soc = k;
		}
	}
	storage.read((error, users) => {
		if (error) {
			cb(error);
			return;
		}
		return cb(false, users[Soc].user.email);
	});
};

/**
 * 根据地址获取用户socket
 * @param {*} address
 */
User.getSocket = function (address, cb) {
	storage.read((error, users) => {
		if (error) {
			cb(error);
			return;
		}
		for (var k in users) {
			if (users[k].user.email === address) {
				return cb(false, sockets[k].s);
			}
		}
		cb(true);
	});
};




exports.User = User;
// module.exports.User = User;