const User = require("./user").User;
const Message = require("./message").Message;
const EventEmitter = require('events');
const emitter = new EventEmitter();
const user = new User(emitter);
const message = new Message(emitter);

user.register("cd", "123456", "eastwood951220@gmail.com");