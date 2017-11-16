const User = require("./user").User;
const Message = require("./message").Message;
const EventEmitter = require('events');//引入事件模块
const emitter = new EventEmitter();//实例化事件触发器
const user = new User(emitter);
const message = new Message(emitter);

user.register("张三", "oo", "2418755716@qq.com");
