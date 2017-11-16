var net = require("net");
const readline = require('readline');
 
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
 });
 
var client = new net.Socket();
client.connect(8080, 'localhost', function () {
 	console.log('connect to the tcp server!');
 	console.log("please input:");
 	console.log("0: stop ; 1: close ");
 
 	rl.question('please input: ', (answer) => {
 		if (answer == "0") {
 			client.write("0");
 		} else if (answer == "1") {
 			client.write("1");
 		}
 		console.log(answer);
  		rl.close();
 	});
 });
 client.on("data", function (data) {
 	console.log("close server");
 });