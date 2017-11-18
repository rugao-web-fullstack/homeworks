const net = require("net");
const User = require("./user").User;
const Message = require("./message").Message;
const EventEmitter = require('events');
const server = net.createServer();
const emitter = new EventEmitter();
const user = new User(emitter);
const message = new Message(emitter);
let clientList = [];
server.on("connection", (client) => {
	let arr = [];
	client.name = client.remoteAddress + ":" + client.remotePort;
	clientList.push(client);
	client.write("please enter register information like username-password\n");
	client.on("data", (data) => {
		arr.push(data.toString().split("\r")[0]);
		user.register(data.toString().split("\r")[0].split("-")[0], data.toString().split("\r")[0].split("-")[1]);
		for(var i=0; i<clientList.length; i++) {      
      			if(client !== clientList[i]) {        
        			clientList[i].write("congratulate " + data.toString().split("\r")[0].split("-")[0] + " register!");      
      			}    
    		}  
	});
});
server.listen(8080);

