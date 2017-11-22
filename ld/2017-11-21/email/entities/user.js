const path = require("path");
const UserManager = require('./user').User;
const Storage = require("./storage").Storage;
const FILENAME = "../data/user.json";
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));

let users = {
};
let sockets = {
};

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket, username, password, cb) {
	sockets[username] = socket;
	storage.read((err, users) => {
		if(err) {
			console.log(err.stack);
			cb(err);
			return;
		}
		if (users[username]) {
		    //return false;
			cb(err);
		}
		if (!users[username]) {
			users[username] = [];
			users[username].push({
				username:username,
				password:password
			});
		}
		storage.save(users, (err) => {
			if(err) {
				console.log(err.stack);
				cb(err);
				return;
			}
			cb(false);
		});
		
	});
    
	
    //users[username] = {
        //socket: socket,
        //user: new User(username,
            //password)
    //};
    //return true;
};

User.login = function (socket, username, password, cb) {
    console.log("user manager login");
	storage.read((err, users) => {
		if (err) {
			console.log(err);
			cb(err);
			return;
		}
		let user = users[username].user;
    	//return user.password === password;
		return user === cb(false, users[username]);
	});
    //if (!users[username]) {
        //return false;
    //}
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address) {
    for (var k in users) {
        if (users[k].user.email === address) {
            return true;
        }
    }
    return false;
}

/**
 * 根据地址获取用户socket
 * @param {*} address 
 */
User.getSocket = function (address) {
    for (var k in users) {
        if (users[k].user.email === address) {
            return users[k].socket;
        }
    }
    return null;
}

/**
 * 根据socket获取用户
 * @param {*} address 
 */
User.getUserBySocket = function (socket, cb) {
	
	for (var k in users) {
        if (users[k].socket === socket) {
            return users[k].user
        }
    }
    return null;
	
	//let key = '';

    //for (var k in sockets) {
        //if (sockets[k].socket === socket) {
            //key = k;
			//break;
        //}
    //}
	//if (!key) {
		//cb(false, null);
	//}
	//storage.read((err, users) => {
		//if (err) {
			//cb(err);
			//return;
		//}
		//for (var k in users) {
		    //if (k === key) {
		        //cb(false, users[k]);
				//break;
		    //}
		//}
	//});
}

exports.User = User;
