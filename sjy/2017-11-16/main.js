const User = require("./user").User;
const Message = require("./message").Message;
const EventEmitter = require('events');
const emitter = new EventEmitter();
const user = new User(emitter);
const message = new Message(emitter);

user.register("王二", "oo", "wwww@qq.com");