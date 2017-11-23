function Register(client, zcArr) {
	client.on("register", function () {
		client.write("注 册 ！ 请 输 入 用 户 名 与 密 码 ： \n");
		client.on("data", function zc(data) {
			let arr = [];
			let us = data.toString().split("\r\n")[0]
			arr = us.toString().split(" ");
			arr.push(client);
			zcArr.push(arr);
			client.write("注 册 完 成 ！ \n请 登 录 ！\n");
			client.removeListener("data", zc);
			client.emit("main");
		});
	});
}

exports.Register = Register;
