function Login(client, dlArr, zcArr, clientList) {
	client.on("login", function () {
		client.write("登 录 ！ 请 输 入 用 户 名 与 密 码 ：\n");
		client.on("data", function dl(data) {
			let arr = [];
			let us = data.toString().split("\r\n")[0];
			arr = us.toString().split(" ");
			for (let i = 0; i < zcArr.length; i++) {
				if (arr[0] === zcArr[i][0] && arr[1] === zcArr[i][1]) {//用户名密码比较
					dlArr.push(arr[0]);
					dlArr.push(arr[1]);
					dlArr.push(client);
					zcArr[i][2] = client;
					client.write("登 录 成 功！\n");
					clientList.push(client);
					client.removeListener("data", dl);
					client.emit("menu");
					return;
				}
			}
			client.write("登 录 失 败 ！ 请 重 新 登 陆 ！\n");
			client.removeListener("data", dl);
			client.emit("main");

		});
	});
}
exports.Login = Login;
