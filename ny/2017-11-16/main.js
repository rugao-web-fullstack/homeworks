const User = require("./user").User;
const Message = require("./message").Message;
const EventEmitter = require('events');
var readline = require('readline');
const emitter = new EventEmitter();
const user = new User(emitter);
const message = new Message(emitter);
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("请输入姓名，密码和邮箱（以逗号隔开）:", function(mes){
    var result = mes.split(",");
    user.register(result[0], result[1], result[2]);
    var mes = result[0];
    rl.close();
    client.send(mes, 4333, 'localhost');
    client.on("message", (msg, rinfo) => {
        console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        console.log("message from server, received");
        console.log("message is " + msg);
        client.close();
    });
});