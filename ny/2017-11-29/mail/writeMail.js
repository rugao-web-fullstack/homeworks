var base = require("./base");
var getCookie = require("./getCookie");
module.exports = function (req, res) {
	var sender = req.body.sender;  
	var title = req.body.title;  
	var receive = req.body.receive;
	var body = req.body.body;
	var cookieString = req.headers.cookie;
	var user = getCookie(cookieString, 'name'); 
	base(function (con) {
		var sql = "select * from mailbox where mailbox = '" + receive +"'";
		var sql1 = "select * from mailbox where mailbox = '" + sender +"'";
		con.query(sql, function (err, result) {
			if (err) throw err;
			if(result.length !== 0){
				base(function (con1) {
					con1.query(sql1, function (error, results){
						if (error) throw error;
						results.forEach(function (item){
							if(results.length !== 0 && item.user === user){
								base(function (con2) {
									var sqlIn = "INSERT INTO mail (sender , receiver, title, body) values ('" + sender + "', '" + receive + "', '" + title + "', '" + body + "')";
									con2.query(sqlIn, function (error, resu){
										if (error) throw error;
										console.log("email sended");
									});
								}, "mydb");
								res.redirect('/mail');
							} else {
								console.log("发送者邮箱不存在或与用户不匹配！");
								res.redirect('/writeMail');
							}
						});
					});
				}, "mydb");
			} else {
				console.log("接收者邮箱不存在！");
				res.redirect('/writeMail');
			}
		});
	}, "mydb");
}
