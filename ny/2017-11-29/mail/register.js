var base = require("./base");
module.exports = function (req, res) {
	var name = req.body.name;  
	var pwd = req.body.pwd;
	base(function (con) {
		var sql = "select * from user where user = '" + name +"'";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log(result);
			if(result.length === 0){
				base(function (con1) {
					var sqlIn = "INSERT INTO user (user , password) values ('" + name + "', '" + pwd + "')";
					con1.query(sqlIn, function (error, results){
						if (error) throw error;
						console.log("use registed");
					});
				}, "mydb");
				res.redirect('/');
			} else {
				console.log("用户存在！");
				res.redirect('/register');
			}
		});
	}, "mydb");
}
