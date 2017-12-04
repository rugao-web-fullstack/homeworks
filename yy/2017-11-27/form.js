var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var path = require("path");
//create a server object:
http.createServer(function (req, res) {
	//require是read事件
	if (req.method === "POST") {
		var data = [];
		var length = 0;
		req.on("data", function (chunk) {
			// 接收数据
			length += chunk.length;
			data.push(chunk);
		});
		req.on("end", function () {
			// 拼接数据
			data = Buffer.concat(data, length);
			// 分析数据
			var formData = qs.parse(String(data));
			req.body = formData;
			res.write(String(data));
			res.end();
		});
	} else {
		var filename = path.resolve(__dirname, "form.html");
		var content = fs.readFileSync(filename);
		res.write(String(content)); //write a response to the client
		res.end(); //end the response
	}
}).listen(8080); //the server object listens on port 8080