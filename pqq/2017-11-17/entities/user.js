//存注册的用户
let users = {};

function User(username, password) {
	this.username = username;
	this.email = username;
	this.password = password;
}
//注册
User.register = function(socket, username, password) {
	if(users[username]) { //如果用户列表已有这个用户名
		return false;
	}
	users[username] = {
		socket: socket,
		user: new User(username, password)
	};
	return true;
};
//登录
User.login = function(socket, username, password) {
	console.log('user manager login');
	if(!users[username]) { //不存在用户名
		return false;
	}
	let user = users[username].user;
	return user.password === password; //进行密码检查
}
//判断当前地址是否有用户拥有（给对方写信）
User.isAddress = function(address) { //address为对方的地址
	for(var k in users) {
		if(users[k].user.email === address) {
			return true;
		}
	}
	return false;
}

//依据地址获取用户的socket
User.getSocket = function(address) {
	for(var k in users) {
		if(users[k].user.email === address) {
			return users[k].socket;
		}
	}
	return null;
}

//根据socket获取用户
User.getUserBySocket = function(socket) {
	for(var k in users) {
		if(users[k].socket === socket) {
			return users[k].user;
		}
	}
	return null;
}

exports.User = User;