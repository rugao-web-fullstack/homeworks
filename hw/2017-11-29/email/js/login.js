var base = require('./base');
module.exports = function(req, res) {
	var user = req.body.user;
	var password = req.body.password;
	base(function (con) {
		var sql = "select * from user where user = '" + user +"'";
		con.query(sql, function(err, result) {
			if(err) throw err;
			if(result.length === 0) {
				console.log('对不起，该用户名不存在！');
				res.redirect('/');
			} else {
				result.forEach(function (item){
					if (item.password !== password){
						console.log("密码不正确！");
						res.redirect('/');
					} else {
						res.cookie('name', username);
						console.log("user "+username+" login in");
						res.redirect('./mail');
					}
				});
			}
		});
	}, 'mydb');
}
