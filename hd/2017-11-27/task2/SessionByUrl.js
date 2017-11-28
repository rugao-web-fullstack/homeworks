var uuid = require("uuid/v4");
var querystring = require("querystring");
var url = require("url");

var sessionArr = {};

function Session(req, res) {
    this.req = req;
    this.res = res;
    this.sid = "";
    this.init();
}

Session.prototype.init = function () {

    var querySid = querystring.parse(url.parse(this.req.url).query).sid;

    if (querySid) { //判断客户端的sid是否存在
        this.sid = querySid;
    } else {
        //如果不存在新建一个sid
        var sid = uuid();
        this.sid = sid;
        sessionArr[sid] = {}
    }
}

Session.prototype.getSession = function (keyName) {
    var user = sessionArr[this.sid];

    if (user && user[keyName]) {
        return user[keyName];
    } else {
        return false;
    }
}

Session.prototype.setSession = function (keyName, keyValue) {
    var user = sessionArr[this.sid];

    if (user) {
        user[keyName] = keyValue;
        return true;
    } else {
        return false;
    }

}

module.exports = Session;